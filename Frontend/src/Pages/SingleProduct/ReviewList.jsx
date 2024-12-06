import React from 'react';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ReviewsList = ({ displayedReviews, currentPage, setCurrentPage, totalPages }) => {
  return (
    <div>
      <div className="reviews-list flex flex-wrap justify-center gap-4 mt-8">
        {displayedReviews.length > 0 ? (
          displayedReviews.map((review, index) => (
            <div key={index} className="p-4 bg-gray-200 shadow-lg rounded-lg flex flex-col items-start w-80">
              <h3 className="text-lg font-bold">{review.name}</h3>
              <p className="text-gray-500">{review.email}</p>
              <p>{review.comment}</p>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < review.rating ? <AiFillStar className="text-yellow-400" /> : <AiOutlineStar />}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No reviews yet. Be the first to leave a review!</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        {/* Previous Button */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          className={`mx-2 px-4 py-2 rounded text-white font-semibold ${
            currentPage === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 hover:opacity-90'
          }`}
          disabled={currentPage === 0}
        >
          Previous
        </button>

        {/* Next Button */}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
          className={`mx-2 px-4 py-2 rounded text-white font-semibold ${
            currentPage === totalPages - 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 hover:opacity-90'
          }`}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReviewsList;
