import { Router } from 'express';
import { userControllers } from './users.controller';
import auth from '../../middleware/auth';

const router = Router();

router.get('/', auth(), userControllers.getUser);

router.put('/:userId', auth(), userControllers.updateUser);

router.delete('/:userId', auth(), userControllers.deleteUser);

export const userRoutes = router;
