import { Request, Response } from 'express';
import { authServices } from './auth.service';

const registerUser = async (req: Request, res: Response) => {
  //   console.log(req.body);
  if (req.body.password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be 6 or more letters',
    });
  }
  try {
    const result = await authServices.registerUser(req.body);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const authControllers = { registerUser };
