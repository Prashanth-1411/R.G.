import { Router } from 'express';
import multer from 'multer';
import { authenticate } from '../middleware/auth.js';
import { uploadMedia, getMedia, deleteMedia } from '../controllers/mediaController.js';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', authenticate, upload.single('file'), uploadMedia);
router.get('/', getMedia);
router.delete('/:id', authenticate, deleteMedia);

export default router;
