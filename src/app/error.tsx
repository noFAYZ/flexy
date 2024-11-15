'use client';

import { Button } from "@nextui-org/react";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[60vh] flex flex-col items-center justify-center p-4"
    >
      <div className="text-center space-y-6 max-w-md">
        {/* Error Icon with Pulse Effect */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [1, 0.8, 1] 
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="inline-block p-4 rounded-3xl bg-danger/10"
        >
          <AlertCircle size={40} className="text-danger" />
        </motion.div>

        {/* Error Message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
            Oops! Something went wrong
          </h2>
          <p className="text-default-500 text-sm">
            {error.message || "An unexpected error occurred. Please try again."}
          </p>
        </div>

        {/* Action Button */}
        <Button
          variant="shadow"
          color="primary"
          startContent={<RefreshCcw size={18} />}
          onClick={() => reset()}
          className="bg-gradient-to-r from-pink-500 to-orange-500 text-white font-medium rounded-2xl"
        >
          Try Again
        </Button>
      </div>
    </motion.div>
  );
} 