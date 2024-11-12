import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const AddReview = () => {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]); // State to store all submitted reviews

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = () => {
    if (rating === 0 || comment === "") {
      alert("Please provide a rating and comment.");
      return;
    }

    // Add new review to the reviews array
    const newReview = {
      rating: rating,
      comment: comment,
    };

    setReviews([...reviews, newReview]);
    setRating(0); // Reset rating
    setComment(""); // Reset comment
    setShowModal(false); // Close modal after submission
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      {/* Add Review Button */}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        onClick={() => setShowModal(true)}
      >
        Add Review
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Add Your Review</h2>

            {/* Star Rating */}
            <div className="flex mb-4">
              {[...Array(5)].map((star, index) => (
                <span
                  key={index}
                  onClick={() => handleStarClick(index)}
                  className="cursor-pointer"
                >
                  {index < rating ? (
                    <AiFillStar className="text-yellow-500 text-2xl" />
                  ) : (
                    <AiOutlineStar className="text-gray-400 text-2xl" />
                  )}
                </span>
              ))}
            </div>

            {/* Comment Input */}
            <textarea
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              placeholder="Add your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                className="bg-gray-400 text-white py-2 px-4 rounded mr-2 hover:bg-gray-500"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display Submitted Reviews */}
      <div className="mt-8 w-full max-w-lg">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white p-4 rounded shadow-lg mb-4">
            {/* Display rating as stars */}
            <div className="flex mb-2">
              {[...Array(5)].map((star, starIndex) => (
                <span key={starIndex}>
                  {starIndex < review.rating ? (
                    <AiFillStar className="text-yellow-500 text-xl" />
                  ) : (
                    <AiOutlineStar className="text-gray-400 text-xl" />
                  )}
                </span>
              ))}
            </div>
            {/* Display Comment */}
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddReview;
