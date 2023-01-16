/* eslint-disable no-loop-func, no-await-in-loop */
import { IgApiClient } from 'instagram-private-api';
import { ContainerInstance } from '../interfaces/container.interface';
import TargetUserInfoProps from '../interfaces/infoUser.interface';
import { executeSleep } from '../common/utils';

class PostsService {
  private instagram: IgApiClient;

  private targetUserInfo: TargetUserInfoProps;

  constructor(opts: ContainerInstance) {
    this.instagram = opts.scope.instance;
    this.targetUserInfo = opts.targetUserInfo;
  }

  async userInfo() {
    return this.targetUserInfo;
  }

  async follow() {
    const userId = this.targetUserInfo.pk;

    const response = await this.instagram.friendship.create(userId);
    return response;
  }

  async unfollow() {
    const userId = this.targetUserInfo.pk;

    const response = await this.instagram.friendship.destroy(userId);
    return response;
  }

  async getFollowers() {
    const accountFollowers = this.instagram.feed.accountFollowers(this.targetUserInfo.pk);

    let counter = 0;
    let sleep_after = 10000;
    let iterations = 0;

    const users: any[] = [];
    const user_info = this.targetUserInfo;

    do {
      try {
        const usersFollowersList = await accountFollowers.items();

        const percentTask = (counter / user_info.follower_count) * 100;
        const logOutput = `${percentTask}% ${counter}/${user_info.follower_count}`;

        process.stdout.write('\r\x1b[K');
        process.stdout.write(logOutput);

        Object.keys(usersFollowersList).map((index: any) => {
          const user = usersFollowersList[index];
          users.push(user);

          counter += 1;
          sleep_after -= 1;

          return user;
        });

        if (sleep_after <= 0) {
          const {
            sleep_after: clone_sleep_after,
            iterations: clone_iterations,
          } = await executeSleep(sleep_after, iterations);

          sleep_after = clone_sleep_after;
          iterations = clone_iterations;
        }
      } catch (e) {
        console.log(e);
      }
    // @ts-ignore
    } while (accountFollowers.moreAvailable);

    return users;
  }

  async getFollowing(): Promise<any> {
    const accountFollowing = this.instagram.feed.accountFollowing(this.targetUserInfo.pk);

    let counter = 0;
    let sleep_after = 10000;
    let iterations = 0;

    const user_info = this.targetUserInfo;
    const users: any[] = [];

    do {
      try {
        const usersFollowingList = await accountFollowing.items();

        const percentTask = (counter / user_info.following_count) * 100;
        const logOutput = `${percentTask}% ${counter}/${user_info.following_count}`;

        process.stdout.write('\r\x1b[K');
        process.stdout.write(logOutput);

        Object.keys(usersFollowingList).map((index: any) => {
          const value = usersFollowingList[index];
          users.push(value);

          counter += 1;
          sleep_after -= 1;

          return value;
        });

        if (sleep_after <= 0) {
          const {
            sleep_after: clone_sleep_after,
            iterations: clone_iterations,
          } = await executeSleep(sleep_after, iterations);

          sleep_after = clone_sleep_after;
          iterations = clone_iterations;
        }
      } catch (e) {
        console.log(e);
      }
      // @ts-ignore
    } while (accountFollowing.moreAvailable);

    return users;
  }

  async mutualFriends(): Promise<any> {
    const followers = await this.getFollowers();
    const followings = await this.getFollowing();

    const mutualFriends: any[] = [];
    followers
      .filter((follower) => followings
        .some((following: TargetUserInfoProps) => follower.pk === following.pk))
      .forEach((follower) => mutualFriends.push(follower));

    return mutualFriends;
  }
}

export default PostsService;
