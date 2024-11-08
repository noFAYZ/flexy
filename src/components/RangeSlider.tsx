import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const RangeSlider = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  formatLabel = (value) => `$${value}`,
  onChange,
  className = "",
}) => {
  const [values, setValues] = useState(value);
  const [isDragging, setIsDragging] = useState(null);
  const [activeThumb, setActiveThumb] = useState(null);
  const [hoverTrack, setHoverTrack] = useState(false);
  const rangeRef = useRef(null);

  useEffect(() => {
    setValues(value);
  }, [value]);

  const getPercent = useCallback(
    (value) => ((value - min) / (max - min)) * 100,
    [min, max]
  );

  const handleMouseDown = (index) => (e) => {
    e.preventDefault();
    setIsDragging(index);
    setActiveThumb(index);
  };

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
    setTimeout(() => setActiveThumb(null), 1000);
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging === null || !rangeRef.current) return;

      const rect = rangeRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = Math.max(0, Math.min(1, x / rect.width));
      const rawValue = min + (max - min) * percent;
      const newValue = Math.round(rawValue / step) * step;

      const newValues = [...values];
      newValues[isDragging] = newValue;
      
      const sortedValues = newValues[0] <= newValues[1] ? newValues : [newValues[1], newValues[0]];
      
      if (JSON.stringify(sortedValues) !== JSON.stringify(values)) {
        setValues(sortedValues);
        onChange?.(sortedValues);
      }
    },
    [isDragging, min, max, step, values, onChange]
  );

  useEffect(() => {
    if (isDragging !== null) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const leftThumbPercent = getPercent(values[0]);
  const rightThumbPercent = getPercent(values[1]);

  return (
    <div className={`relative select-none ${className}`}>
      {/* Floating Value Display */}
      <div className="relative h-10 mb-4">
        <motion.div 
          className="absolute left-0 w-full flex justify-between"
          animate={{ 
            x: 0,
            transition: { type: "spring", stiffness: 300, damping: 30 }
          }}
        >
          {[0, 1].map((index) => (
            <motion.div
              key={index}
              className="relative"
              initial={false}
              animate={{ 
                x: `${getPercent(values[index]) - (index === 0 ? 0 : 100)}%`,
                scale: activeThumb === index ? 1.1 : 1,
                transition: { type: "spring", stiffness: 300, damping: 30 }
              }}
            >
              <motion.div
                className={`px-3 py-1 rounded-full text-sm font-medium
                  ${index === 0 
                    ? 'bg-gradient-to-r from-pink-500 to-pink-600' 
                    : 'bg-gradient-to-r from-orange-500 to-orange-600'}
                  ${activeThumb === index ? 'text-white shadow-lg' : 'text-white shadow'}
                  transition-all duration-200`}
                initial={false}
                animate={{
                  y: activeThumb === index ? -5 : 0,
                }}
              >
                {formatLabel(values[index])}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Range Track */}
      <div 
        ref={rangeRef}
        className="relative h-8 flex items-center"
        onMouseEnter={() => setHoverTrack(true)}
        onMouseLeave={() => setHoverTrack(false)}
      >
        {/* Background Track */}
        <div className="absolute w-full h-2 bg-default-100 rounded-full overflow-hidden">
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              background: 'linear-gradient(45deg, transparent 25%, currentColor 25%, currentColor 50%, transparent 50%, transparent 75%, currentColor 75%)',
              backgroundSize: '8px 8px'
            }}
            animate={{
              x: [0, 8],
              transition: {
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          />
        </div>

        {/* Active Range */}
        <motion.div
          className="absolute h-2 rounded-full overflow-hidden bg-gradient-to-r from-pink-500 to-orange-600"
          style={{
            left: `${leftThumbPercent}%`,
            width: `${rightThumbPercent - leftThumbPercent}%`
          }}
          layout
        >
          {/* Shimmering Effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            }}
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Value Steps */}
        <div className="absolute inset-0 flex justify-between px-1">
          {[...Array(5)].map((_, i) => (
            <motion.div 
              key={i}
              className="w-0.5 rounded-full bg-default-200"
              initial={{ height: '25%' }}
              animate={{ 
                height: hoverTrack ? '50%' : '25%',
                opacity: hoverTrack ? 0.5 : 0.3
              }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>

        {/* Thumbs */}
        {[0, 1].map((index) => {
          const isActive = activeThumb === index;
          const thumbColor = index === 0 ? 'pink-500' : 'orange-600';
          
          return (
            <motion.div
              key={index}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
              style={{ left: `${getPercent(values[index])}%` }}
              initial={false}
            >
              {/* Pulsing Ring */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className={`absolute -inset-4 rounded-full bg-${thumbColor}/20`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                )}
              </AnimatePresence>

              {/* Thumb Handle */}
              <motion.button
                className={`relative w-4 h-4 rounded-full outline-none cursor-grab active:cursor-grabbing
                  ${index === 0 ? 'bg-pink-500' : 'bg-orange-600'}`}
                animate={{ 
                  scale: isActive ? 1.2 : 1,
                  boxShadow: isActive 
                    ? `0 0 20px ${index === 0 ? 'rgb(236 72 153 / 0.3)' : 'rgb(234 88 12 / 0.3)'}` 
                    : '0 2px 4px rgba(0,0,0,0.1)'
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                onMouseDown={handleMouseDown(index)}
              >
                <motion.div
                  className="absolute inset-1 rounded-full bg-white opacity-0"
                  animate={{ opacity: isActive ? 0.4 : 0 }}
                />
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* Range Labels */}
      <div className="flex justify-between mt-2">
        <motion.span 
          className="text-xs text-default-400"
          animate={{ 
            opacity: hoverTrack ? 1 : 0.7,
            y: hoverTrack ? 0 : 2
          }}
        >
          {formatLabel(min)}
        </motion.span>
        <motion.span 
          className="text-xs text-default-400"
          animate={{ 
            opacity: hoverTrack ? 1 : 0.7,
            y: hoverTrack ? 0 : 2
          }}
        >
          {formatLabel(max)}
        </motion.span>
      </div>
    </div>
  );
};