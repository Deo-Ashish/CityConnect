import express from 'express';
import { getBusinesses, getBusinessById, createBusiness, updateBusiness, deleteBusiness, searchNearby, searchByCategory, seedCategories, getCategories } from '../controllers/business.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Categories map here relative to /api/ (i.e. /api/categories which we will mount) Wait, I will mount this on /api/business but for search let's mount on /api/search and /api/category
// I will just put the main business CRUD here.
router.route('/')
  .get(getBusinesses)
  .post(protect, authorize('business'), createBusiness);

router.route('/:id')
  .get(getBusinessById)
  .put(protect, authorize('business'), updateBusiness)
  .delete(protect, authorize('business'), deleteBusiness);

<<<<<<< HEAD
// 📄 Get All Businesses
router.get("/", businessController.getAllBusinesses);

// � Search Businesses
router.get("/search", businessController.searchBusinesses);

// �📍 Get Nearby Businesses (Geo search)
router.get("/search/nearby", businessController.getNearbyBusinesses);

// 🔍 Get Single Business by ID
router.get("/:id", businessController.getBusinessById);

// ✏️ Update Business
router.put(
  "/:id",
  // protect,
  businessController.updateBusiness
);

// ❌ Delete Business
router.delete(
  "/:id",
  // protect,
  businessController.deleteBusiness
);

module.exports = router;
=======
export default router;
>>>>>>> 9abce5f (code written again)
