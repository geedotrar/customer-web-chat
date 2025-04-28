import express from 'express';
import { createLead, getLeads } from '../controllers/leadController.js';
import authenticate from '../middleware/authMiddleware.js';
import { leadValidation } from '../middleware/leadValidation.js';

const router = express.Router();

router.post('/leads', authenticate,leadValidation, createLead);
router.get('/leads', authenticate, getLeads);

export default router;