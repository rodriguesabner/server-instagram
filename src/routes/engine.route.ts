import { Request, Response } from 'express';
import { POST, route } from 'awilix-express';
import jwt from 'jsonwebtoken';
import { BaseRoute } from '../common/baseRoute';
import EngineService from '../services/engine.service';

@route('/:SESSION_NAME')
export default class MessageRoute extends BaseRoute {
  private readonly engineService: EngineService;

  constructor({ engineService }: { engineService: EngineService }) {
    super();
    this.engineService = engineService;
  }

  @route('/session/start')
  @POST()
  async start(req: Request, res: Response) {
    const { SESSION_NAME } = req.params;
    const { password } = req.body;

    try {
      await this.engineService.login(SESSION_NAME, password);

      const token = jwt.sign({
        session_name: SESSION_NAME,
      }, process.env.JWT_SECRET ?? 'define', {
        expiresIn: '4h',
      });

      this.ok(res, {
        token,
        connected: true,
      });
    } catch (err: any) {
      this.fail(res, err);
    }
  }
}
