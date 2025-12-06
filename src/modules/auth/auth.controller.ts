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

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.loginUser(req.body);
    if (result === null) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    } else if (result === false) {
      return res.status(401).json({
        success: false,
        message: 'Password does not match with your account',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const authControllers = { registerUser, loginUser };
