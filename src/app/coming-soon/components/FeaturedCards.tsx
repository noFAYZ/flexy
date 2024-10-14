import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Glassmorphism Background
const GlassBackground = ({ gradientColors }) => (
  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white opacity-10 backdrop-blur-lg" />
);

// Custom Neon Gradient Border
const NeonBorder = ({ gradientColors }) => (
  <div
    style={{
      borderImage: `linear-gradient(45deg, ${gradientColors[0]}, ${gradientColors[1]}) 1`,
    }}
    className="absolute inset-0 border-2 border-transparent rounded-3xl"
  />
);

// Revamped FeatureCard Component
const FeatureCard = ({ title, description, icon, gradientColors }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-72 h-80 rounded-3xl overflow-hidden cursor-pointer shadow-lg transition-transform duration-300 transform-gpu"
      style={{
        background: `linear-gradient(135deg, ${gradientColors[0]} 10%, ${gradientColors[1]} 90%)`,
      }}
      whileHover={{ scale: 1.1, rotate: 2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Neon Gradient Border */}
      <NeonBorder gradientColors={gradientColors} />

      {/* Glass Effect */}
      <GlassBackground gradientColors={gradientColors} />

      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white z-10">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.5 : 1 }}
          transition={{ duration: 0.3 }}
          className="text-6xl mb-2 neon-glow"
        >
          {icon}
        </motion.div>
        <motion.h3
          className="text-2xl font-extrabold mb-2 text-center uppercase tracking-wider"
          initial={{ y: 0 }}
          animate={{ y: isHovered ? -10 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-center text-sm px-4 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
};

// Cards Container
const FeatureCards = () => {
  return (
    <div className="relative flex flex-wrap justify-center gap-8 mt-12 z-20">
      <FeatureCard
        title="Decentralized Trust"
        description="Experience unparalleled data integrity and true ownership in the freelancing ecosystem, powered by Ceramic Network."
        icon="🛡️"
        gradientColors={['#FF6B57', '#FFB82A']}
      />
      <FeatureCard
        title="Seamless Transactions"
        description="Enjoy frictionless payments between freelancers and clients with our cutting-edge Account Abstraction technology."
        icon="⚡"
        gradientColors={['#4895EF', '#6DD5ED']}
      />
      <FeatureCard
        title="Global Opportunities"
        description="Connect with talent and clients worldwide, breaking down geographical barriers in the decentralized freelance market."
        icon="🌍"
        gradientColors={['#4CD964', '#24C2B6']}
      />
    </div>
  );
};

export default FeatureCards;
