import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { getSliders, getSliderById, createSlider, updateSlider, deleteSlider } from '../controllers/sliderController.js';
import { authenticate } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

const router = express.Router();

router.get('/', getSliders);
router.get('/:id', getSliderById);
router.post('/', authenticate, upload.single('image'), createSlider);
router.put('/:id', authenticate, upload.single('image'), updateSlider);
router.delete('/:id', authenticate, deleteSlider);

export default router;
