import express from 'express';
import { createReview, getReviewsByBusiness, deleteReview } from '../controllers/review.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createReview);

router.route('/:businessId')
  .get(getReviewsByBusiness);

router.route('/:id')
  .delete(protect, deleteReview);

export default router;
