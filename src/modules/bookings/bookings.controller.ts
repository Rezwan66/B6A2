import { Request, Response } from 'express';
import { bookingServices } from './bookings.service';

const addBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.addBooking(req.body);
    if (result === false) {
      return res.status(400).json({
        success: false,
        message: 'Sorry, the vehicle is unavailable!',
      });
    }

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  console.log('todo:getAllBookings');
};

const updateBooking = async (req: Request, res: Response) => {
  console.log('todo:updateBooking');
};

export const bookingControllers = { addBooking, getAllBookings, updateBooking };
