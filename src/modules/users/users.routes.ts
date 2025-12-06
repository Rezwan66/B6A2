import { Router } from 'express';
import { userControllers } from './users.controller';
import auth from '../../middleware/auth';
import Roles from '../../constants/roles';

const router = Router();

router.get('/', auth(Roles.admin), userControllers.getUser);

router.put('/:userId', auth(), userControllers.updateUser);

router.delete('/:userId', auth(), userControllers.deleteUser);

export const userRoutes = router;
