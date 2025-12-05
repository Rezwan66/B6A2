import { NextFunction, Request, Response } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
  const date = new Date().toLocaleString();

  const dateColor = '\x1b[34m'; // Blue
  const methodColor = '\x1b[31m'; // Red
  const routeColor = '\x1b[33m'; // Yellow
  const resetColor = '\x1b[0m'; // Reset color to default

  console.log(
    `[${dateColor}${date}${resetColor}] ${methodColor}${req.method}${resetColor} ${routeColor}${req.originalUrl}${resetColor}`
  );
  next();
};

export default logger;
