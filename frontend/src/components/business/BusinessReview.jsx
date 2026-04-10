import { useState } from "react";

const BusinessReview = ({ reviews = [] }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      rating,
      comment,
    };

    console.log(data);
  };

  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold">
        Reviews
      </h2>

      {/* Add Review */}
      <form
        onSubmit={handleSubmit}
        className="space-y-3"
      >
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="5">5 ⭐</option>
          <option value="4">4 ⭐</option>
          <option value="3">3 ⭐</option>
          <option value="2">2 ⭐</option>
          <option value="1">1 ⭐</option>
        </select>

        <textarea
          placeholder="Write review..."
          className="w-full border p-2 rounded"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Submit Review
        </button>
      </form>

      {/* Review List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="border p-3 rounded-lg"
          >
            <div className="flex justify-between">
              <h4 className="font-medium">
                {review.user?.name || "User"}
              </h4>

              <span>⭐ {review.rating}</span>
            </div>

            <p className="text-gray-600 mt-1">
              {review.comment}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default BusinessReview;