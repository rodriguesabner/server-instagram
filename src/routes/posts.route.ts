import { Request, Response } from 'express';
import {
  before, GET, route,
} from 'awilix-express';
import { BaseRoute } from '../common/baseRoute';
import PostsService from '../services/posts.service';
import InfoUserMiddleware from '../middleware/infoUser.middleware';
import AuthMiddleware from '../middleware/auth.middleware';
import IsConnectedMiddleware from '../middleware/isConnected.middleware';

@route('/posts')
export default class PostsRoute extends BaseRoute {
  private readonly postsService: PostsService;

  constructor({ postsService }: { postsService: PostsService }) {
    super();
    this.postsService = postsService;
  }

  @route('/recent/:username')
  @before([AuthMiddleware, IsConnectedMiddleware, InfoUserMiddleware])
  @GET()
  async getRecentPosts(req: Request, res: Response) {
    try {
      const ret = await this.postsService.getRecentPosts();

      this.ok(res, ret);
    } catch (err: any) {
      this.fail(res, err);
    }
  }

  @route('/comments/:idPost')
  @before([AuthMiddleware, IsConnectedMiddleware])
  @GET()
  async getComments(req: Request, res: Response) {
    try {
      const { idPost } = req.params;
      const ret = await this.postsService.getCommentsPost(idPost);

      this.ok(res, ret);
    } catch (err: any) {
      this.fail(res, err);
    }
  }
}
