import React from 'react';
import { motion } from 'framer-motion';

const CreativeProgressBar = ({ currentStep, totalSteps }) => {
    const steps = Array.from({ length: totalSteps }, (_, i) => i);
  
    return (
      <div className="w-full max-w-md mx-auto mt-12 px-10">
        <div className="flex justify-between items-center">
          {steps.map((step) => (
            <motion.div
              key={step}
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: step * 0.1 }}
            >
              <motion.div
                className={`w-12 h-12 mb-2 rounded-full flex items-center justify-center ${
                  step <= currentStep
                    ? 'bg-gradient-to-br from-orange-500 to-pink-500'
                    : 'bg-muted'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {step < currentStep ? (
                  <motion.svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 6L9 17l-5-5"
                    />
                  </motion.svg>
                ) : step === currentStep ? (
                  <motion.div
                    className="w-3 h-3 bg-white rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                ) : (
                  <div className="w-3 h-3 bg-gray-400 rounded-full" />
                )}
              </motion.div>
              <motion.div
                className={`text-xs font-medium ${
                  step <= currentStep ? 'text-orange-800' : 'text-gray-400'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + step * 0.1 }}
              >
                {getStepName(step)}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };
  
  const getStepName = (step) => {
    switch(step) {
      case 0: return "Type";
      case 1: return "Category";
      case 2: return "Bio";
      default: return `Step ${step + 1}`;
    }
  };

export default CreativeProgressBar;