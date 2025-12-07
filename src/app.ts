import express, { Request, Response } from 'express';
import createDB from './config/db';
import { authRoutes } from './modules/auth/auth.routes';
import logger from './middleware/routeLogger';
import { userRoutes } from './modules/users/users.routes';
import { vehicleRoutes } from './modules/vehicles/vehicles.routes';
import { bookingRoutes } from './modules/bookings/bookings.routes';
import autoReturnBookings from './config/autoUpdateDB';

const app = express();
app.use(express.json());

//@ initializing database
createDB();

//& auto-update expired bookings
autoReturnBookings();

app.get('/', logger, (req: Request, res: Response) => {
  res.send(`Vehicle Rental Server is running 🚗`);
});

//^ auth route
app.use('/api/v1/auth', logger, authRoutes);

//^ users route
app.use('/api/v1/users', logger, userRoutes);

//^ vehicles route
app.use('/api/v1/vehicles', logger, vehicleRoutes);

//^ bookings route
app.use('/api/v1/bookings', logger, bookingRoutes);

//! NOT Found route
app.use(logger, (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Resource does not exist!',
    path: req.path,
  });
});

export default app;
