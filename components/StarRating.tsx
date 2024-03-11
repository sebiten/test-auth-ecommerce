// StarRating.tsx

import React from 'react';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  // Asegurarse de que el rating esté en el rango de 0 a 5
  const normalizedRating = Math.max(0, Math.min(5, Math.round(rating)));


  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((index) => (
        <span
          key={index}
          className={`text-3xl ${
            index <= normalizedRating
              ? 'text-yellow-500' // Cambiar color para estrellas pintadas
              : 'text-gray-300'   // Cambiar color para estrellas no pintadas
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
