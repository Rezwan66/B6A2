import { Router } from 'express';
import auth from '../../middleware/auth';
import { bookingControllers } from './bookings.controller';

const router = Router();

router.post('/', auth(), bookingControllers.addBooking);
router.get('/', auth(), bookingControllers.getAllBookings);
router.put('/', auth(), bookingControllers.updateBooking);

export const bookingRoutes = router;
