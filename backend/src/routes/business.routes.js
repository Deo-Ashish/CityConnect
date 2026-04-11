import express from 'express';
import { getBusinesses, getBusinessById, createBusiness, updateBusiness, deleteBusiness, searchNearby, searchByCategory, seedCategories, getCategories } from '../controllers/business.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();


// 📄 Get All Businesses
router.route('/').get(getBusinesses).post(protect, authorize('business', 'admin'), createBusiness);

// 📍 Get Nearby Businesses (Geo search)
router.get("/search/nearby", searchNearby);
router.get("/search", searchByCategory); // using the category search logic

// 🔍 Get Single Business by ID
router.route('/:id')
  .get(getBusinessById)
  .put(protect, authorize('business', 'admin'), updateBusiness)
  .delete(protect, authorize('business', 'admin'), deleteBusiness);

export default router;
