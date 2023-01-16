/* eslint-disable no-param-reassign */
import fs from 'fs';
import { InstagramInstanceProps } from '../../interfaces/container.interface';

class CookiesUtils {
  public saveCookies(cookies: any, state: any) {
    const filename = process.env.IG_USERNAME ?? 'undefined';

    const cookiepath = `cookies/${(filename).toLowerCase()}.json`;
    if (!fs.existsSync('cookies/')) {
      fs.mkdirSync('cookies/');
    }

    if (!fs.existsSync('db/')) {
      fs.mkdirSync('db/');
    }

    if (!fs.existsSync(cookiepath)) {
      fs.closeSync(fs.openSync(cookiepath, 'w'));
    }

    cookies.state = state;
    cookies = JSON.stringify(cookies);
    fs.writeFileSync(cookiepath, cookies);
    return {
      cookies,
      state,
    };
  }

  public async loadCookies(
    ig: InstagramInstanceProps,
    username: string,
    silentMode = false,
  ) {
    const filename = username?.toLowerCase() ?? 'undefined';

    const cookiepath = `cookies/${(filename).toLowerCase()}.json`;

    if (fs.existsSync(cookiepath)) {
      let cookies: any = fs.readFileSync(cookiepath).toString();

      await ig.state.deserializeCookieJar(cookies);

      cookies = JSON.parse(cookies);
      ig.state.deviceString = cookies.state.deviceString;
      ig.state.deviceId = cookies.state.deviceId;
      ig.state.uuid = cookies.state.uuid;
      ig.state.phoneId = cookies.state.phoneId;
      ig.state.adid = cookies.state.adid;
      ig.state.build = cookies.state.build;
      console.log('Cookies loaded');
      return true;
    }

    if (!silentMode) console.log('No cookie file found in loadCookies function');
    return false;
  }

  public async removeCookie(ig: InstagramInstanceProps, cookie_name = null) {
    let filename;

    if (cookie_name != null) {
      // @ts-ignore
      filename = cookie_name.toLowerCase();
    } else {
      filename = (ig.loggedInUser.username).toLowerCase();
    }

    const cookiepath = `cookies/${filename}.json`;
    return fs.unlinkSync(cookiepath);
  }
}

export default CookiesUtils;
