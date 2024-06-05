// src/StarRating.js
import React, { useState } from 'react';

const StarRating = ({ totalStars = 5 }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex justify-start">
      {[...Array(totalStars)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              className="hidden"
              onClick={() => setRating(ratingValue)}
            />
            <svg
              className={`h-8 w-8 cursor-pointer transition-colors duration-200 ${
                ratingValue <= (hover || rating) ? 'text-yellow-500' : 'text-gray-400'
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            >
              <path
                fillRule="evenodd"
                d="M10 15l-5.878 3.09 1.122-6.545L.49 7.91l6.568-.955L10 1.1l2.942 5.854 6.568.955-4.754 3.635 1.122 6.545z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
