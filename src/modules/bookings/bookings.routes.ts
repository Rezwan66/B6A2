import { Router } from 'express';
import auth from '../../middleware/auth';
import { bookingControllers } from './bookings.controller';
import Roles from '../../constants/roles';

const router = Router();

router.post(
  '/',
  auth(Roles.admin, Roles.customer),
  bookingControllers.addBooking
);
router.get(
  '/',
  auth(Roles.admin, Roles.customer),
  bookingControllers.getAllBookings
);
router.put(
  '/',
  auth(Roles.admin, Roles.customer),
  bookingControllers.updateBooking
);

export const bookingRoutes = router;
