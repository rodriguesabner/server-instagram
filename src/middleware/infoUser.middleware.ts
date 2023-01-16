import { Request, Response, NextFunction } from 'express';
import { InstagramInstanceProps } from '../interfaces/container.interface';

// eslint-disable-next-line consistent-return
const InfoUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { container } = req;
  const { username } = req.params;

  const scope = container.resolve('scope');

  const ig = scope.instance as InstagramInstanceProps;
  const pk = await ig.user.getIdByUsername(username);
  const info = await ig.user.info(pk);

  req.targetUserInfo = info;
  next();
};

export default InfoUserMiddleware;
