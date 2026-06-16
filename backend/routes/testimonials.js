import express from 'express';
import {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialsController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTestimonials);
router.get('/:id', getTestimonialById);
router.post('/', authenticate, createTestimonial);
router.put('/:id', authenticate, updateTestimonial);
router.delete('/:id', authenticate, deleteTestimonial);

export default router;
