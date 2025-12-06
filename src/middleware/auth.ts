import { NextFunction, Request, Response } from 'express';

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('went through auth middleware');
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
