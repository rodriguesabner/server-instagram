import { Request, Response } from 'express';
import {
  before, GET, POST, route,
} from 'awilix-express';
import path from 'path';
import { BaseRoute } from '../common/baseRoute';
import PostsService from '../services/posts.service';
import InfoUserMiddleware from '../middleware/infoUser.middleware';
import AuthMiddleware from '../middleware/auth.middleware';
import IsConnectedMiddleware from '../middleware/isConnected.middleware';
import UploadMiddleware from '../middleware/upload.middleware';

@route('/posts')
export default class PostsRoute extends BaseRoute {
  private readonly postsService: PostsService;

  constructor({ postsService }: { postsService: PostsService }) {
    super();
    this.postsService = postsService;
  }

  @route('/byId/:idPost')
  @before([AuthMiddleware, IsConnectedMiddleware])
  @GET()
  async findPostById(req: Request, res: Response) {
    try {
      const { idPost } = req.params;
      const ret = await this.postsService.findPostById(idPost);

      this.ok(res, ret);
    } catch (err: any) {
      this.fail(res, err);
    }
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
      const ret = await this.postsService.getComments(idPost);

      this.ok(res, ret);
    } catch (err: any) {
      this.fail(res, err);
    }
  }

  @route('/comment/:idPost')
  @before([AuthMiddleware, IsConnectedMiddleware])
  @POST()
  async comment(req: Request, res: Response) {
    try {
      const { idPost } = req.params;
      const { comment } = req.body;

      const ret = await this.postsService.commentPost(idPost, comment);

      this.ok(res, ret);
    } catch (err: any) {
      this.fail(res, err);
    }
  }

  @route('/like/:idPost')
  @before([AuthMiddleware, IsConnectedMiddleware])
  @POST()
  async like(req: Request, res: Response) {
    try {
      const { idPost } = req.params;
      const ret = await this.postsService.likePost(idPost);

      this.ok(res, ret);
    } catch (err: any) {
      this.fail(res, err);
    }
  }

  @route('/unlike/:idPost')
  @before([AuthMiddleware, IsConnectedMiddleware])
  @POST()
  async unlike(req: Request, res: Response) {
    try {
      const { idPost } = req.params;
      const ret = await this.postsService.unlikePost(idPost);

      this.ok(res, ret);
    } catch (err: any) {
      this.fail(res, err);
    }
  }

  @route('/upload/image')
  @before([AuthMiddleware, IsConnectedMiddleware, UploadMiddleware.single('file')])
  @POST()
  async uploadPostImage(req: Request, res: Response) {
    try {
      const { description } = req.body;
      const { file } = req;

      if (!file) {
        throw new Error('No file uploaded');
      }

      const filename = path.resolve(file.destination, file.filename);
      const ret = await this.postsService.uploadPostImage(description, filename);
      this.ok(res, ret);
    } catch (err: any) {
      this.fail(res, err);
    }
  }

  @route('/upload/image/story')
  @before([AuthMiddleware, IsConnectedMiddleware, UploadMiddleware.single('file')])
  @POST()
  async uploadStoryImage(req: Request, res: Response) {
    try {
      const { file } = req;

      if (!file) {
        throw new Error('No file uploaded');
      }

      const filename = path.resolve(file.destination, file.filename);
      const ret = await this.postsService.uploadStoryImage(filename);

      this.ok(res, ret);
    } catch (err: any) {
      this.fail(res, err);
    }
  }
}
