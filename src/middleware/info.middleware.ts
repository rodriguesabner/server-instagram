import { Request, Response, NextFunction } from 'express';
import { AwilixContainer } from 'awilix';
import { InstagramInstanceProps } from '../interfaces/container.interface';

// eslint-disable-next-line consistent-return
const InfoUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const { container }: AwilixContainer = req;
  const { username } = req.params;
  const { session_name } = req.user;

  const sessions = container.resolve('sessions');

  if (sessions.length <= 0 || sessions[session_name]) {
    return res.status(400).json({ error: 'Session not started' });
  }

  const ig = sessions.find((session: any) => session === session_name) as InstagramInstanceProps;
  const pk = await ig.user.getIdByUsername(username);
  const info = await ig.user.info(pk);

  // @ts-ignore
  req.targetUserInfo = info;
  next();
};

export default InfoUserMiddleware;
