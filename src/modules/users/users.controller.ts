import { Request, Response } from 'express';
import { userServices } from './users.service';
import Roles from '../../constants/roles';
import { JwtPayload } from 'jsonwebtoken';

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser();

    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { userId: id } = req.params;
  const loggedInUser = req.user as JwtPayload;
  // console.log({ loggedInUser }, { id });
  if (loggedInUser.role === Roles.customer && loggedInUser.id !== Number(id)) {
    return res.status(403).json({
      success: false,
      message: 'Forbidden: customers can update only their own profile!',
    });
  }
  if (
    loggedInUser.role === Roles.customer &&
    req.body.role !== loggedInUser.role
  ) {
    return res.status(403).json({
      success: false,
      message: 'Forbidden: customers cannot make themselves into admin!',
    });
  }
  try {
    const result = await userServices.updateUser(req.body, id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId: id } = req.params;
    const result = await userServices.deleteUser(id as string);

    if ('blocked' in result && result.blocked) {
      res.status(400).json({
        success: false,
        message: 'Cannot delete user with active bookings',
      });
    } else if ('rowCount' in result && result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const userControllers = { getUser, updateUser, deleteUser };
