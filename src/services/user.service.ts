import { IgApiClient } from 'instagram-private-api';
import { ContainerInstance, InstagramInstanceProps } from '../interfaces/container.interface';

class PostsService {
  private instagram: IgApiClient;

  constructor(opts: ContainerInstance) {
    this.instagram = opts.scope.instance;
  }

  async getUserInfo(ig: InstagramInstanceProps, username: string) {
    const pk = await ig.user.getIdByUsername(username);
    const info: any = await ig.user.info(pk);

    try {
      info.id = pk;
    } catch (err) {
      console.log(err);
    }

    return info;
  }
}

export default PostsService;
