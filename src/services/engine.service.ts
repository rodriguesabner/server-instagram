/* eslint-disable no-param-reassign */
import { GraphQLSubscriptions, SkywalkerSubscriptions, withFbnsAndRealtime } from 'instagram_mqtt';
import {
  IgApiClient,
  IgCheckpointError,
  IgLoginBadPasswordError,
  IgLoginRequiredError,
  IgResponseError,
} from 'instagram-private-api';
import Bluebird from 'bluebird';
import inquirer from 'inquirer';
import shortid from 'shortid';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { ContainerInstance } from '../interfaces/container.interface';
import CookiesProps from '../interfaces/cookies.interface';
import InstagramInstanceProps from '../interfaces/instagram.interface';

class EngineService {
  private cookiesUtil: CookiesProps;

  private sessions: any[];

  constructor(opts: ContainerInstance) {
    this.sessions = opts.sessions;
    this.cookiesUtil = opts.cookiesUtil;
  }

  public async login(username: string, password: string) {
    // @ts-ignore
    const instagram: InstagramInstanceProps = withFbnsAndRealtime(new IgApiClient());

    console.log('Not using proxy');
    console.log('Mobile/Residential proxy recommended');

    instagram.state.generateDevice(username);
    console.log(`Trying to log with ${username}`);

    const hasCookies = await this.cookiesUtil.loadCookies(instagram, username);

    instagram.request.end$.subscribe(async () => {
      const cookies = await instagram.state.serializeCookieJar();
      const state = {
        deviceString: instagram.state.deviceString,
        deviceId: instagram.state.deviceId,
        uuid: instagram.state.uuid,
        phoneId: instagram.state.phoneId,
        adid: instagram.state.adid,
        build: instagram.state.build,
      };

      this.cookiesUtil.saveCookies(username, cookies, state);

      await instagram.state.deserializeCookieJar(JSON.stringify(cookies));
      instagram.state.deviceString = state.deviceString;
      instagram.state.deviceId = state.deviceId;
      instagram.state.uuid = state.uuid;
      instagram.state.phoneId = state.phoneId;
      instagram.state.adid = state.adid;
      instagram.state.build = state.build;
    });

    await instagram.simulate.preLoginFlow();

    const user = {
      username,
      password,
    };
    const result: any = await this.tryToLogin(instagram, hasCookies, user, false);

    result.antiBanMode = false;
    result.showRealtimeNotifications = false;
    // @ts-ignore
    result.realtime = instagram.realtime;

    const onlineMode = (process.env.ONLINE_MODE != null && process.env.ONLINE_MODE === 'true');

    if (onlineMode) {
      await result.realtime.connect({
        graphQlSubs: [
          GraphQLSubscriptions.getAppPresenceSubscription(),

          GraphQLSubscriptions.getZeroProvisionSubscription(instagram.state.phoneId),
          GraphQLSubscriptions.getDirectStatusSubscription(),
          GraphQLSubscriptions.getDirectTypingSubscription(instagram.state.cookieUserId),
          GraphQLSubscriptions.getAsyncAdSubscription(instagram.state.cookieUserId),
        ],
        skywalkerSubs: [
          SkywalkerSubscriptions.directSub(instagram.state.cookieUserId),
          SkywalkerSubscriptions.liveSub(instagram.state.cookieUserId),
        ],
        irisData: await instagram.feed.directInbox().request(),
      });
    } else {
      console.log('Online Mode disabled');
    }

    this.sessions.push({
      session_name: username,
      instance: instagram,
    });

    return this.clone(result);
  }

  private async tryToLogin(
    ig: InstagramInstanceProps,
    hasCookies: boolean,
    user: { username: string; password: string },
    silentMode = false,
  ) {
    if (!user.username || !user.password) {
      throw new Error('IG_USERNAME or IG_PASSWORD not set');
    }

    const result = await Bluebird.try(async () => {
      if (!hasCookies) {
        if (!silentMode) console.log('User not logged in, login in');
        const loggedInUser = await ig.account.login(user.username, user.password);

        if (!silentMode) {
          console.log('Logged');
          console.log(loggedInUser);
        }
      }

      try {
        // @ts-ignore
        ig.loggedInUser = await ig.account.currentUser();

        if (!silentMode) console.log('Logged in');
      } catch (e) {
        console.log(e);
        console.log('Login failed from cookie | Removing incorrect cookie | Trying to regenerate...');

        // @ts-ignore
        ig.loggedInUser = {};
        ig.loggedInUser.username = user.username;
        ig.loggedInUser.inputLogin = user.username;
        ig.loggedInUser.inputPassword = user.password;
        ig.loggedInUser.inputProxy = process.env.IG_PROXY;
        ig.loggedInUser.verificationMode = process.env.IG_VERIFICATION;
        return this.regenerateSession(ig, user);
      }

      ig.loggedInUser.inputLogin = '';
      ig.loggedInUser.inputPassword = '';
      ig.loggedInUser.inputProxy = '';
      ig.loggedInUser.verificationMode = '';

      // Open DB
      const adapter = new FileSync(`./db/${user.username}.json`);

      // @ts-ignore
      const db = low(adapter);
      db.defaults({
        likes: [], comments: [], mediaUploaded: [], follows: [], lastFollowers: [],
      }).write();
      ig.shortid = shortid();
      ig.db = db;

      return this.clone(ig);
    }).catch(IgCheckpointError, async () => {
      const verificationMode = process.env.IG_VERIFICATION ?? null;

      if (verificationMode != null) {
        if (verificationMode === '2') {
          // Email quick fix, now Mode 2 is solved by automode
          await ig.challenge.auto(true);
        } else if (verificationMode === '1') {
          // sms
          await ig.challenge.selectVerifyMethod('1');
        } else if (verificationMode === '0') {
          // otp
          await ig.challenge.selectVerifyMethod('0');
        } else {
          // Sms it was me
          await ig.challenge.auto(true);
        }
      }

      console.log(ig.state.checkpoint);
      console.log('Recommended to not open the app during verification / do not answer "it was me" on the phone');
      let code = await inquirer.prompt([
        {
          type: 'input',
          name: 'code',
          message: 'Enter code',
        },
      ]);

      code = code.code;

      const sendCode = await ig.challenge.sendSecurityCode(code);
      console.log(sendCode);

      console.log('Done! Restart me to start your new session! (Sometimes you need to delete the cookie again after adding the code)');
      process.exit();

      // eslint-disable-next-line consistent-return
    }).catch(IgLoginRequiredError, () => {
      if (hasCookies) {
        console.log('Invalid cookies');
      } else {
        console.log('Incorrect password');
        return 'incorrectPassword';
      }
    }).catch(IgLoginBadPasswordError, () => {
      console.log('Incorrect password');
      return 'incorrectPassword';
    })
      .catch(IgResponseError, () => {
        console.log('IgResponseError:Bad request // Is your phone number verified? // Did you recieved a Verify message on instagram?');
        console.log('Press "r" key to retry after verify "It was me" or any other key to Exit');

        process.stdin.setRawMode(true);
        process.stdin.resume();

        // eslint-disable-next-line consistent-return
        process.stdin.on('data', (buff) => {
          if (buff.toString() === 'r') {
            console.log('retry');
            return this.tryToLogin(ig, hasCookies, user, silentMode);
          }
          console.log('exit');
          process.exit();
        });
      });
    return result;
  }

  private clone(obj: any) {
    if (obj == null || typeof obj !== 'object') return obj;
    const copy = new obj.constructor();

    // eslint-disable-next-line no-restricted-syntax
    for (const attr in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  }

  logEvent(name: string) {
    return (data: any) => console.log(name, data);
  }

  private async regenerateSession(
    ig: InstagramInstanceProps,
    user: { username: string; password: string },
    log = true,
  ) {
    try {
      await this.cookiesUtil.removeCookie(ig);
    } catch (e) {
      if (log) {
        console.log('No cookie found, not needed to remove.');
      }
    }
    if (log) {
      console.log('Regenerating session');
    }
    return this.login(user.username, user.password);
  }
}

export default EngineService;
