import express from 'express';
import {
  getLocations,
  getLocationBySlug,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
} from '../controllers/locationsController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getLocations);
router.get('/slug/:slug', getLocationBySlug);
router.get('/:id', getLocationById);
router.post('/', authenticate, createLocation);
router.put('/:id', authenticate, updateLocation);
router.delete('/:id', authenticate, deleteLocation);

export default router;
