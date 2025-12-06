import { Request, Response } from 'express';

const addBooking = async (req: Request, res: Response) => {
  console.log('todo:addBooking');
};

const getAllBookings = async (req: Request, res: Response) => {
  console.log('todo:getAllBookings');
};

const updateBooking = async (req: Request, res: Response) => {
  console.log('todo:updateBooking');
};

export const bookingControllers = { addBooking, getAllBookings, updateBooking };
