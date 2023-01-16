import { IgApiClient } from 'instagram-private-api';
import { ContainerInstance } from '../interfaces/container.interface';
import CookiesProps from '../interfaces/cookies.interface';

class PostsService {
  private instagram: IgApiClient;

  private cookiesUtil: CookiesProps;

  constructor(opts: ContainerInstance) {
    this.instagram = opts.scope.ig;
    this.cookiesUtil = opts.cookiesUtil;
  }

  private sanitizePhone(phone: string): Array<string> {
    return phone.split(',');
  }

  async getUserRecentPosts(targetUserInfo: any) {
    const feed = await this.instagram.feed.user(targetUserInfo.pk);
    const list = await feed.items();

    // To keep getting content, maybe on a future function:
    /* do {
        moreList = await feed.items();
        Array.prototype.push.apply(list,moreList);
        console.log(list[list.length-1]);
        console.log(list.length);

    } while(feed.moreAvailable == true); */

    return list;
  }
}

export default PostsService;
