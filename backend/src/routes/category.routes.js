import express from 'express';
import { seedCategories, getCategories } from '../controllers/business.controller.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/seed', seedCategories);

export default router;
