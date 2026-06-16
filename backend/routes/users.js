import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/usersController.js';

const router = Router();

router.get('/', authenticate, getUsers);
router.post('/', authenticate, createUser);
router.put('/:id', authenticate, updateUser);
router.delete('/:id', authenticate, deleteUser);

export default router;
