import express from 'express';
import { searchNearby, searchByCategory } from '../controllers/business.controller.js';

const router = express.Router();

router.get('/nearby', searchNearby);
router.get('/', searchByCategory);

export default router;
