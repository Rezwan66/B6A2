import express, { Request, Response } from 'express';
import createDB from './config/db';
import { authRoutes } from './modules/auth/auth.routes';
import logger from './middleware/routeLogger';
import { userRoutes } from './modules/users/users.routes';
import { vehicleRoutes } from './modules/vehicles/vehicles.routes';

const app = express();
app.use(express.json());

//@ initializing database
createDB();

app.get('/', logger, (req: Request, res: Response) => {
  res.send(`Vehicle Rental Server is running 🚗`);
});

//^ auth route
app.use('/api/v1/auth', logger, authRoutes);

//^ users route
app.use('/api/v1/users', logger, userRoutes);

//^ vehicles route
app.use('/api/v1/vehicles', logger, vehicleRoutes);

export default app;
