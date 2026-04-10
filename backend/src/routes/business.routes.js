const express = require("express");
const router = express.Router();

const businessController = require("../controllers/business.controller");

// ➕ Create Business
router.post(
  "/",
  // protect, // enable if login required
  businessController.createBusiness
);

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