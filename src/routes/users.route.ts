import { Request, Response } from 'express';
import {
  before, GET, route,
} from 'awilix-express';
import { BaseRoute } from '../common/baseRoute';
import InfoUserMiddleware from '../middleware/infoUser.middleware';
import AuthMiddleware from '../middleware/auth.middleware';
import IsConnectedMiddleware from '../middleware/isConnected.middleware';
import UserService from '../services/user.service';

@route('/user')
export default class PostsRoute extends BaseRoute {
  private readonly userService: UserService;

  constructor({ userService }: { userService: UserService }) {
    super();
    this.userService = userService;
  }

  @route('/followers/:username')
  @before([AuthMiddleware, IsConnectedMiddleware, InfoUserMiddleware])
  @GET()
  async getFollowers(req: Request, res: Response) {
    try {
      const ret = await this.userService.getFollowers();

      this.ok(res, ret);
    } catch (err: any) {
      this.fail(res, err);
    }
  }

  @route('/following/:username')
  @before([AuthMiddleware, IsConnectedMiddleware, InfoUserMiddleware])
  @GET()
  async getFollowings(req: Request, res: Response) {
    try {
      const ret = await this.userService.getFollowing();

      this.ok(res, ret);
    } catch (err: any) {
      this.fail(res, err);
    }
  }

  @route('/mutual-friends/:username')
  @before([AuthMiddleware, IsConnectedMiddleware, InfoUserMiddleware])
  @GET()
  async getMutualFriends(req: Request, res: Response) {
    try {
      const ret = await this.userService.mutualFriends();

      this.ok(res, ret);
    } catch (err: any) {
      this.fail(res, err);
    }
  }
}
