const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt automatically
  }
);


// 🔥 Prevent duplicate reviews (one user → one business)
reviewSchema.index({ user: 1, business: 1 }, { unique: true });

const reviewModel = mongoose.model("Review", reviewSchema);

module.exports = reviewModel;