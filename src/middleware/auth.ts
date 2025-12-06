import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const auth = (...roles: ('admin' | 'customer')[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log('went through auth middleware');
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized Action!',
        });
      }

      const decoded = jwt.verify(
        token,
        config.jwt_secret as string
      ) as JwtPayload;
      // console.log({ decoded });
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: 'Forbidden Action!',
        });
      }

      next();
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message,
        data: err,
      });
    }
  };
};

export default auth;
