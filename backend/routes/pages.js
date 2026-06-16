import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPages, getPageByName, createPage, updatePage, deletePage } from '../controllers/pagesController.js';
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

router.get('/', getPages);
router.get('/:page_name', getPageByName);
router.post('/', authenticate, upload.single('banner_image'), createPage);
router.put('/:id', authenticate, upload.single('banner_image'), updatePage);
router.delete('/:id', authenticate, deletePage);

export default router;
