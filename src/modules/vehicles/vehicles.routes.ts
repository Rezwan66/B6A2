import { Router } from 'express';
import auth from '../../middleware/auth';
import { vehicleControllers } from './vehicles.controller';
import Roles from '../../constants/roles';

const router = Router();

router.post('/', auth(Roles.admin), vehicleControllers.addVehicles);

router.get('/', vehicleControllers.getAllVehicles);

router.get('/:vehicleId', vehicleControllers.getSingleVehicle);

router.put('/:vehicleId', auth(Roles.admin), vehicleControllers.updateVehicle);

router.delete(
  '/:vehicleId',
  auth(Roles.admin),
  vehicleControllers.deleteVehicle
);

export const vehicleRoutes = router;
