import { motion } from 'framer-motion';
import React from 'react';

const Loader = ({ size = 'large' }) => {
  const sizeClasses = {
    small: 'h-8 w-8 border-2',
    medium: 'h-16 w-16 border-3',
    large: 'h-32 w-32 border-4',
  };

  return (
   
    <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-600"></div>
  </div>
 
  );
};

export default Loader;