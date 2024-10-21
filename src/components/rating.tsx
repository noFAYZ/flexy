import React, { useState } from 'react';
import { Star } from 'lucide-react';

export const StarRating = ({ 
  initialRating = 0, 
  maxRating = 5, 
  size = 24, 
  color = "#e47419", 
  onRatingChange,
  isInteractive = true
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseMove = (event, index) => {
    if (!isInteractive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const halfWidth = rect.width / 2;
    const newRating = index + (x > halfWidth ? 1 : 0.5);
    setHoverRating(newRating);
  };

  const handleMouseLeave = () => {
    if (!isInteractive) return;
    setHoverRating(0);
  };

  const handleClick = () => {
    if (!isInteractive) return;
    setRating(hoverRating);
    if (onRatingChange) {
      onRatingChange(hoverRating);
    }
  };

  const renderStar = (index) => {
    const fillPercentage = Math.min(Math.max((isInteractive ? (hoverRating || rating) : rating) - index, 0), 1) * 100;
    return (
      <div
        key={index}
        className={`relative ${isInteractive ? 'cursor-pointer' : ''}`}
        onMouseMove={(e) => handleMouseMove(e, index)}
        onClick={handleClick}
      >
        <Star size={size} color={color} />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${fillPercentage}%` }}>
          <Star size={size} fill={color} color={color} />
        </div>
      </div>
    );
  };

  return (
    <div 
      className="flex items-center" 
      onMouseLeave={handleMouseLeave}
    >
      {[...Array(maxRating)].map((_, index) => renderStar(index))}
      <span className="ml-2 text-sm font-medium">
        {isInteractive ? (hoverRating || rating).toFixed(1) : rating.toFixed(1)}
      </span>
    </div>
  );
};