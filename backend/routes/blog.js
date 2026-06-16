import express from 'express';
import {
  getBlogPosts,
  getBlogPostBySlug,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from '../controllers/blogController.js';
import { authenticate } from '../middleware/auth.js';
import { upload } from '../config/upload.js';

const router = express.Router();

router.get('/', getBlogPosts);
router.get('/slug/:slug', getBlogPostBySlug);
router.get('/:id', getBlogPostById);
router.post('/', authenticate, upload.single('featured_image'), createBlogPost);
router.put('/:id', authenticate, upload.single('featured_image'), updateBlogPost);
router.delete('/:id', authenticate, deleteBlogPost);

export default router;
