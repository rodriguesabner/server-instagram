import { Request, Response } from 'express';
import {
  before, DELETE, GET, POST, route,
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

  @route('/info/:username')
  @before([AuthMiddleware, IsConnectedMiddleware, InfoUserMiddleware])
  @GET()
  async getInfoUser(req: Request, res: Response) {
    try {
      const ret = await this.userService.userInfo();

      this.ok(res, ret);
    } catch (err: any) {
      this.fail(res, err);
    }
  }

  @route('/follow/post/:idPost')
  @before([AuthMiddleware, IsConnectedMiddleware])
  @POST()
  async followUserByPostId(req: Request, res: Response) {
    const { idPost } = req.params;

    try {
      const ret = await this.userService.followUserByPostId(idPost);

      this.ok(res, ret);
    } catch (err: any) {
      this.fail(res, err);
    }
  }

  @route('/follow/:username')
  @before([AuthMiddleware, IsConnectedMiddleware, InfoUserMiddleware])
  @POST()
  async follow(req: Request, res: Response) {
    try {
      const ret = await this.userService.follow();

      this.ok(res, ret);
    } catch (err: any) {
      this.fail(res, err);
    }
  }

  @route('/unfollow/:username')
  @before([AuthMiddleware, IsConnectedMiddleware, InfoUserMiddleware])
  @DELETE()
  async unfollow(req: Request, res: Response) {
    try {
      const ret = await this.userService.unfollow();

      this.ok(res, ret);
    } catch (err: any) {
      this.fail(res, err);
    }
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
