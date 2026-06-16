import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { getServices, getServiceById, createService, updateService, deleteService } from '../controllers/servicesController.js';
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

router.get('/', getServices);
router.get('/:id', getServiceById);
router.post('/', authenticate, upload.single('image'), createService);
router.put('/:id', authenticate, upload.single('image'), updateService);
router.delete('/:id', authenticate, deleteService);

export default router;
