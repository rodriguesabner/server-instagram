import { Request, Response, NextFunction } from 'express';
import { asValue } from 'awilix';
import { InstagramInstanceProps } from '../interfaces/instagram.interface';

// eslint-disable-next-line consistent-return
const InfoUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { container } = req;
  const { username } = req.params;

  const scope = container.resolve('scope');

  const ig = scope.instance as InstagramInstanceProps;
  const pk = await ig.user.getIdByUsername(username);
  const info = await ig.user.info(pk);

  container.register({
    targetUserInfo: asValue(info),
  });

  next();
};

export default InfoUserMiddleware;
