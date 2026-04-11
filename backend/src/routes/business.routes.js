import express from 'express';
import { 
  getBusinesses, getBusinessById, createBusiness, updateBusiness, 
  deleteBusiness, searchNearby, searchByCategory, seedCategories, 
  getCategories, getMyBusinesses, getBusinessAISummary 
} from '../controllers/business.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();


// 📄 Get All Businesses
router.route('/').get(getBusinesses).post(protect, createBusiness);

// 📍 Get Nearby Businesses (Geo search)
router.get("/search/nearby", searchNearby);
router.get("/search", searchByCategory);

// 👤 My Businesses (authenticated)
router.get("/my", protect, getMyBusinesses);

// 🔍 Get Single Business by ID
router.route('/:id')
  .get(getBusinessById)
  .put(protect, updateBusiness)
  .delete(protect, deleteBusiness);

// 🤖 AI Summary
router.get('/:id/ai-summary', getBusinessAISummary);

export default router;
