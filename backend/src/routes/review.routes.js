const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/review.controller");

// ---------------------- ROUTES ---------------------- //

// ➕ Create Review
router.post("/", reviewController.createReview);

// 📄 Get All Reviews
router.get("/", reviewController.getAllReviews);

// 🔍 Get Reviews by Business ID
router.get("/business/:businessId", reviewController.getReviewsByBusiness);

// 🔍 Get Single Review
router.get("/:id", reviewController.getReviewById);

// ❌ Delete Review
router.delete("/:id", reviewController.deleteReview);

module.exports = router;