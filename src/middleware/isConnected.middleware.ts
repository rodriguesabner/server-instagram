import { Request, Response, NextFunction } from 'express';
import { asValue } from 'awilix';

// eslint-disable-next-line consistent-return
const IsConnectedMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { container } = req;
  const { session_name } = req.user;

  const sessions = container.resolve('sessions');
  const currentSession = sessions.find((session: any) => session.session_name === session_name);

  try {
    if (currentSession != null) {
      const ig = currentSession.instance;
      await ig.account.currentUser();

      Object.assign(req, { instance: ig });

      container.register({
        scope: asValue(req),
        targetUserInfo: asValue(null),
      });

      next();
      return;
    }

    res.status(404).json({
      response: null,
      status: 'Disconnected',
      message: 'A sessão do Instagram não está ativa.',
    });
  } catch (error) {
    res.status(404).json({
      response: null,
      status: 'Disconnected',
      message: 'A sessão do Instagram não está ativa.',
    });
  }
};

export default IsConnectedMiddleware;
