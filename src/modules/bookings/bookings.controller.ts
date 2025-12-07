import { Request, Response } from 'express';
import { bookingServices } from './bookings.service';
import { JwtPayload } from 'jsonwebtoken';
import Roles from '../../constants/roles';
import Status from '../../constants/bookingStatus';

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
  try {
    const result = await bookingServices.getAllBookings(req.user as JwtPayload);

    res.status(200).json({
      success: true,
      message: `${
        (req.user as JwtPayload).role === Roles.admin
          ? 'Bookings retrieved successfully'
          : 'Your bookings retrieved successfully'
      }`,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  const { bookingId: id } = req.params;
  const { role } = req.user as JwtPayload;
  if (
    (role === Roles.customer && req.body.status !== Status.cancelled) ||
    (role === Roles.admin && req.body.status !== Status.returned)
  ) {
    return res.status(403).json({
      success: false,
      message: `Invalid input. If you are a ${role}, provide exactly ${
        role === Roles.admin ? '{status: "returned"}' : '{status: "cancelled"}'
      } in the body.`,
    });
  }
  try {
    const result = await bookingServices.updateBooking(
      req.body,
      id!,
      req.user as JwtPayload
    );
    if (result.blocked) {
      return res.status(403).json({
        success: false,
        message: `Forbidden task: you cannot modify a booking by another customer!`,
      });
    }
    if (result === false) {
      return res.status(403).json({
        success: false,
        message: `Forbidden task: cannot cancel booking after start date!`,
      });
    }
    res.status(200).json({
      success: true,
      message: `${
        role === Roles.customer
          ? 'Booking cancelled successfully'
          : 'Booking marked as returned. Vehicle is now available'
      }`,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const bookingControllers = { addBooking, getAllBookings, updateBooking };
