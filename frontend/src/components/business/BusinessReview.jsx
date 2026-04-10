import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import reviewService from "../../services/reviewServices";

const BusinessReview = ({ businessId, reviews = [], onReviewAdded }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [localReviews, setLocalReviews] = useState(reviews);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLocalReviews(reviews);
  }, [reviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!comment.trim()) {
      setError("Please write a review before submitting.");
      return;
    }

    if (!user) {
      setError("Sign in to leave a review.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        user: user.id || user._id,
        business: businessId,
        rating: Number(rating),
        comment: comment.trim(),
      };

      const response = await reviewService.create(payload);

      if (response.review) {
        setLocalReviews((prev) => [response.review, ...prev]);
        onReviewAdded?.(response.review);
        setComment("");
        setRating(5);
      } else {
        throw new Error(response.message || "Unable to submit review");
      }
    } catch (err) {
      setError(err.message || "Unable to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-white">
        Reviews
      </h2>

      {/* Add Review */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-[auto_1fr] items-center">
          <label className="text-sm text-gray-300">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 text-white p-2 rounded"
          >
            <option value="5">5 ⭐ Excellent</option>
            <option value="4">4 ⭐ Very Good</option>
            <option value="3">3 ⭐ Good</option>
            <option value="2">2 ⭐ Fair</option>
            <option value="1">1 ⭐ Poor</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-300">Review</label>
          <textarea
            placeholder="Share your experience..."
            className="w-full min-h-[120px] bg-gray-900 border border-gray-700 text-white p-3 rounded placeholder-gray-500"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      <div className="space-y-4">
        {localReviews.length > 0 ? (
          localReviews.map((review) => (
            <div
              key={review._id || review.id}
              className="bg-gray-900 border border-gray-700 p-4 rounded-xl"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h4 className="text-base font-semibold text-white">
                    {review.user?.name || "Guest reviewer"}
                  </h4>
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-500">
                    {new Date(review.createdAt || review.updatedAt || Date.now()).toLocaleDateString()}
                  </p>
                </div>

                <span className="rounded-full bg-yellow-500 px-3 py-1 text-sm font-semibold text-black">
                  ⭐ {review.rating}
                </span>
              </div>

              <p className="mt-3 text-gray-300 leading-6">{review.comment}</p>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-gray-700 bg-gray-950 p-5 text-center text-gray-400">
            No reviews yet. Be the first to share your experience.
          </div>
        )}
      </div>

    </div>
  );
};

export default BusinessReview;