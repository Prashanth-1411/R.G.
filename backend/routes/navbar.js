import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { getNavbar, getNavbarById, createNavbar, updateNavbar, deleteNavbar } from '../controllers/navbarController.js';
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

router.get('/', getNavbar);
router.get('/:id', getNavbarById);
router.post('/', authenticate, upload.single('logo'), createNavbar);
router.put('/:id', authenticate, upload.single('logo'), updateNavbar);
router.delete('/:id', authenticate, deleteNavbar);

export default router;
