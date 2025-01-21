"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Users } from "lucide-react"; // Icons for freelancer and client
import { Button } from "@nextui-org/react";

const LandingPage = () => {
  const [isFreelancer, setIsFreelancer] = useState(true);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Switcher Section */}
      <div className="flex justify-center items-center py-10">
        <Button
          onClick={() => setIsFreelancer(true)}
          className={`mr-4 ${isFreelancer ? "bg-orange-500" : "bg-gray-700"}`}
        >
          <User className="mr-2" /> Freelancer
        </Button>
        <Button
          onClick={() => setIsFreelancer(false)}
          className={`ml-4 ${!isFreelancer ? "bg-orange-500" : "bg-gray-700"}`}
        >
          <Users className="mr-2" /> Client
        </Button>
      </div>

      {/* Main Content Section */}
      <div className="flex-grow flex flex-col items-center justify-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isFreelancer ? "Empower Your Freelance Journey" : "Find Exceptional Talent"}
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-center max-w-2xl mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {isFreelancer
            ? "Join a community of talented freelancers and showcase your skills to the world."
            : "Discover a pool of skilled freelancers ready to help you achieve your goals."}
        </motion.p>
        <Button className="bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-3 rounded-full text-lg font-bold hover:from-orange-600 hover:to-pink-600 transition-all duration-300">
          Get Started
        </Button>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 py-4 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;