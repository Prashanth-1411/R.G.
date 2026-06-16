import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { getActivityLogs } from '../controllers/activityLogController.js';

const router = Router();

router.get('/', authenticate, getActivityLogs);

export default router;
