import { Request, Response } from 'express';
import {
  before, GET, route,
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
  async getInfoUser(req: Request, res: Response) {
    try {
      const ret = await this.inboxService.getInbox();

      this.ok(res, ret);
    } catch (err: any) {
      this.fail(res, err);
    }
  }
}
