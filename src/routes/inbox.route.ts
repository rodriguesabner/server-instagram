import { Request, Response } from 'express';
import {
  before, GET, POST, route,
} from 'awilix-express';
import { BaseRoute } from '../common/baseRoute';
import AuthMiddleware from '../middleware/auth.middleware';
import IsConnectedMiddleware from '../middleware/isConnected.middleware';
import InboxService from '../services/inbox.service';

@route('/inbox')
export default class InboxRoute extends BaseRoute {
  private readonly inboxService: InboxService;

  constructor({ inboxService }: { inboxService: InboxService }) {
    super();
    this.inboxService = inboxService;
  }

  @route('/')
  @before([AuthMiddleware, IsConnectedMiddleware])
  @GET()
  async getInbox(req: Request, res: Response) {
    try {
      const ret = await this.inboxService.getInbox();

      this.ok(res, ret);
    } catch (err: any) {
      this.fail(res, err);
    }
  }

  @route('/pending')
  @before([AuthMiddleware, IsConnectedMiddleware])
  @GET()
  async getPendingInbox(req: Request, res: Response) {
    try {
      const ret = await this.inboxService.getPendingInbox();

      this.ok(res, ret);
    } catch (err: any) {
      this.fail(res, err);
    }
  }

  @route('/send/:userId')
  @before([AuthMiddleware, IsConnectedMiddleware])
  @POST()
  async sendMessage(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { threadId, message } = req.body;

      if (!message) {
        throw new Error('Message is required');
      }

      const ret = await this.inboxService.sendMessage({ userId, threadId, message });

      this.ok(res, ret);
    } catch (err: any) {
      this.fail(res, err);
    }
  }
}
