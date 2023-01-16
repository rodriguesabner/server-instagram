import { IgApiClient } from 'instagram-private-api';
import { ContainerInstance } from '../interfaces/container.interface';
import TargetUserInfoProps from '../interfaces/infoUser.interface';

class PostsService {
  private instagram: IgApiClient;

  private targetUserInfo: TargetUserInfoProps;

  constructor(opts: ContainerInstance) {
    this.targetUserInfo = opts.targetUserInfo;
    this.instagram = opts.scope.instance;
  }

  async getRecentPosts() {
    const feed = await this.instagram.feed.user(this.targetUserInfo.pk);
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
