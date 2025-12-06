import { Router } from 'express';
import { userControllers } from './users.controller';
import auth from '../../middleware/auth';
import Roles from '../../constants/roles';

const router = Router();

router.get('/', auth(Roles.admin), userControllers.getUser);

router.put(
  '/:userId',
  auth(Roles.admin, Roles.customer),
  userControllers.updateUser
);

router.delete('/:userId', auth(Roles.admin), userControllers.deleteUser);

export const userRoutes = router;
