import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
// Note: uses Prisma-based controller at controllers/settingsController.js
// Old controller at controllers/siteSettingsController.js can be removed after migration

const router = Router();

router.get('/', getSettings);
router.put('/', authenticate, updateSettings);

export default router;
