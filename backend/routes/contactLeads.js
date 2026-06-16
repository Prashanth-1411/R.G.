import express from 'express';
import { getContactLeads, updateContactLead, deleteContactLead } from '../controllers/contactLeadsController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, getContactLeads);
router.put('/:id', authenticate, updateContactLead);
router.delete('/:id', authenticate, deleteContactLead);

export default router;
