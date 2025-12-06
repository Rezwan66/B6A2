import { Response } from 'express';

const resMessage = (
  res: Response,
  code: number,
  success: boolean,
  message: string,
  data: Record<string, unknown>
) => {
  return res.status(code).json({
    success,
    message,
    data,
  });
};

export default resMessage;
