import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  getSections,
  getSection,
  createSection,
  updateSection,
  deleteSection,
  reorderSections,
} from '../controllers/sectionsController.js';

const router = Router();

router.get('/', getSections);
router.get('/:id', getSection);
router.post('/', authenticate, createSection);
router.put('/:id', authenticate, updateSection);
router.put('/reorder', authenticate, reorderSections);
router.delete('/:id', authenticate, deleteSection);

export default router;
