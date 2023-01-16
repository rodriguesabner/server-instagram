import { Request, Response, NextFunction } from 'express';
import { asValue } from 'awilix';
import { InstagramInstanceProps } from '../interfaces/container.interface';

// eslint-disable-next-line consistent-return
const IsConnectedMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const { container } = req;
  // @ts-ignore
  const { session_name } = req.user;

  const sessions = container.resolve('sessions');
  try {
    if (sessions && sessions[session_name]) {
      const { ig } = sessions[session_name];
      await ig.account.currentUser();

      Object.assign(req, { instance: ig });

      container.register({
        scope: asValue(req),
      });

      next();
      return;
    }

    res.status(404).json({
      response: null,
      status: 'Disconnected',
      message: 'A sessão do WhatsApp não está ativa.',
    });
  } catch (error) {
    res.status(404).json({
      response: null,
      status: 'Disconnected',
      message: 'A sessão do WhatsApp não está ativa.',
    });
  }
};

export default IsConnectedMiddleware;
