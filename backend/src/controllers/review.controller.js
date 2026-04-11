import Review from '../models/Review.js';
import Business from '../models/Business.js';

export const createReview = async (req, res) => {
  try {
    const { businessId, rating, comment } = req.body;
    const review = await Review.create({
      user: req.user.id,
      business: businessId,
      rating,
      comment
    });

    // Update business average rating and review count
    const reviews = await Review.find({ business: businessId });
    const avgRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;
    
    await Business.findByIdAndUpdate(businessId, {
      rating: avgRating.toFixed(1),
      reviewsCount: reviews.length
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReviewsByBusiness = async (req, res) => {
  try {
    const reviews = await Review.find({ business: req.params.businessId }).populate('user', 'name avatar');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    
    if (review.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }
    
    const businessId = review.business;
    await review.deleteOne();
    
    const reviews = await Review.find({ business: businessId });
    const avgRating = reviews.length > 0 ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length) : 0;
    
    await Business.findByIdAndUpdate(businessId, {
      rating: avgRating.toFixed(1),
      reviewsCount: reviews.length
    });
    
    res.status(200).json({ message: 'Review removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
