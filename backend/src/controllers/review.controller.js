const reviewModel = require("../models/review.model");
const businessModel = require("../models/business.model");

// ➕ Create Review
async function createReview(req, res) {
  try {
    const { user, business, rating, comment } = req.body;

    // ❗ check if already reviewed
    const existingReview = await reviewModel.findOne({ user, business });

    if (existingReview) {
      return res.status(400).json({
        message: "You already reviewed this business",
      });
    }

    const review = await reviewModel.create({
      user,
      business,
      rating,
      comment,
    });

    // ⭐ Update Business Rating
    const reviews = await reviewModel.find({ business });

    const avgRating =
      reviews.reduce((acc, item) => acc + item.rating, 0) /
      reviews.length;

    await businessModel.findByIdAndUpdate(business, {
      rating: avgRating,
      reviewsCount: reviews.length,
    });

    res.status(201).json({
      message: "Review created successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// 📄 Get All Reviews
async function getAllReviews(req, res) {
  try {
    const reviews = await reviewModel
      .find()
      .populate("user", "username email")
      .populate("business", "name");

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// 🔍 Get Reviews by Business
async function getReviewsByBusiness(req, res) {
  try {
    const { businessId } = req.params;

    const reviews = await reviewModel
      .find({ business: businessId })
      .populate("user", "username");

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// 🔍 Get Single Review
async function getReviewById(req, res) {
  try {
    const review = await reviewModel
      .findById(req.params.id)
      .populate("user", "username")
      .populate("business", "name");

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ❌ Delete Review
async function deleteReview(req, res) {
  try {
    const review = await reviewModel.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // ⭐ Recalculate rating after delete
    const reviews = await reviewModel.find({ business: review.business });

    let avgRating = 0;

    if (reviews.length > 0) {
      avgRating =
        reviews.reduce((acc, item) => acc + item.rating, 0) /
        reviews.length;
    }

    await businessModel.findByIdAndUpdate(review.business, {
      rating: avgRating,
      reviewsCount: reviews.length,
    });

    res.status(200).json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createReview,
  getAllReviews,
  getReviewsByBusiness,
  getReviewById,
  deleteReview,
};