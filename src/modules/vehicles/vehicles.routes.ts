import { Router } from 'express';
import auth from '../../middleware/auth';
import { vehicleControllers } from './vehicles.controller';

const router = Router();

router.post('/', auth(), vehicleControllers.addVehicles);

router.get('/', vehicleControllers.getAllVehicles);

router.get('/:vehicleId', vehicleControllers.getSingleVehicle);

router.put('/:vehicleId', auth(), vehicleControllers.updateVehicle);

router.delete('/:vehicleId', auth(), vehicleControllers.deleteVehicle);

export const vehicleRoutes = router;
