import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// eslint-disable-next-line consistent-return
const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ message: 'Authorization is required' });
  }

  try {
    const accessToken = authorization.split(' ')[1];
    const ret: any = jwt.verify(
      accessToken,
      process.env.JWT_SECRET ?? 'define',
    );

    req.user = {
      session_name: ret.session_name,
    };

    next();
  } catch (e: any) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default AuthMiddleware;
