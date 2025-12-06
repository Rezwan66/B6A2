import { Request, Response } from 'express';
import { vehicleServices } from './vehicles.service';

const addVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.addVehicles(req.body);
    res.status(201).json({
      success: true,
      message: 'Vehicle created successfully',
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getAllVehicles();
    // if(result.rows.length===0){
    //   return res.status(200).json({
    //   success: true,
    //   message: 'Vehicles retrieved successfully',
    //   data: result.rows,
    // });
    // }
    res.status(200).json({
      success: true,
      message: `${
        result.rows.length
          ? 'Vehicles retrieved successfully'
          : 'No vehicles found'
      }`,
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getSingleVehicle = async (req: Request, res: Response) => {
  const { vehicleId: id } = req.params;
  // console.log(typeof id);
  try {
    const result = await vehicleServices.getSingleVehicle(id!);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Vehicle not found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Vehicle retrieved successfully',
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

const updateVehicle = async (req: Request, res: Response) => {
  try {
    const { vehicleId: id } = req.params;
    const result = await vehicleServices.updateVehicle(req.body, id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Vehicle not found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Vehicle updated successfully',
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

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const { vehicleId: id } = req.params;
    const result = await vehicleServices.deleteVehicle(id as string);

    if ('blocked' in result && result.blocked) {
      res.status(400).json({
        success: false,
        message: 'Cannot delete vehicle with active bookings',
      });
    } else if ('rowCount' in result && result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: 'Vehicle not found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Vehicle deleted successfully',
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const vehicleControllers = {
  addVehicles,
  getAllVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
