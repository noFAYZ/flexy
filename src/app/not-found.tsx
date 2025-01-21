'use client';

import { Button } from "@nextui-org/react";
import { Home, SearchX } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[80vh] flex flex-col items-center justify-center p-4"
    >
      <div className="text-center space-y-8 max-w-md">
        {/* 404 Text */}
        <h1 
          className="text-8xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent -skew-y-4"
        >
          404
        </h1>

        {/* Icon */}
        <div

          className="inline-block p-4 rounded-full bg-default-100"
        >
          <SearchX size={50} className="text-default-500" />
        </div>

        {/* Message */}
        <div className="space-y-4 pb-4">
          <h2 className="text-2xl font-bold">Page Not Found</h2>
          <p className="text-default-500">
            Oops! The page you're looking for seems to have wandered off into the digital void.
          </p>
        </div>

        {/* Action Button */}
        <Link href="/" className="pt-4">
          <Button
            size="lg"
            variant="shadow"
            startContent={<Home size={20} />}
            className="bg-gradient-to-r from-pink-500 to-orange-500 text-white font-medium"
          >
            Back to Home
          </Button>
        </Link>

        {/* Optional: Additional Links */}
        <div className="text-sm text-default-500">
          <p>You might want to check out:</p>
          <div className="flex gap-4 justify-center mt-2">
            {['Dashboard', 'Profile', 'Settings'].map((link) => (
              <Link 
                key={link} 
                href={`/${link.toLowerCase()}`}
                className="text-primary hover:underline"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 