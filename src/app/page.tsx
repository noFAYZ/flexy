"use client"
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { Input, Chip, Button, Card, CardBody } from "@nextui-org/react";
import { SearchIcon, Code, Paintbrush, PenTool, Megaphone, ChevronRight } from 'lucide-react';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import MarqueeDemo from '@/components/homepage/marquee-home';

const categories = [
  { name: "Web Development", icon: Code, color: "from-blue-400 to-blue-600" },
  { name: "Graphic Design", icon: Paintbrush, color: "from-purple-400 to-purple-600" },
  { name: "Content Writing", icon: PenTool, color: "from-green-400 to-green-600" },
  { name: "Digital Marketing", icon: Megaphone, color: "from-yellow-400 to-yellow-600" },
];

const rotatingTexts = [
  "Find freelancers or projects...",
  "Discover top web developers...",
  "Connect with creative designers...",
  "Hire expert content writers...",
  "Explore digital marketing pros..."
];
const popularSkills = ["React", "Python", "UI/UX", "SEO", "Node.js", "Illustration"];

const InteractiveSearch = ({ searchQuery, setSearchQuery }) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative w-full max-w-3xl">
      <Input
        value={searchQuery}
        onValueChange={setSearchQuery}
      
        radius="full"
        classNames={{
          input: "text-lg font-semibold pr-20",
          inputWrapper: "h-14 bg-muted/70 shadow-lg backdrop-blur-sm",
        }}
        placeholder={rotatingTexts[placeholderIndex]}
        startContent={<SearchIcon className="text-default-400" />}
      />
      <Button 
        size="lg" 
        className="absolute right-1 top-1 rounded-full bg-gradient-to-tr from-pink-500 to-yellow-500 text-white font-semibold"
      >
        Search
      </Button>
    </div>
  );
};

const InteractiveSearchs = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative w-full max-w-3xl border-1  rounded-full">
      <Input
        value={searchQuery}
        onValueChange={setSearchQuery}
        isClearable
        radius="full"
        classNames={{
          input: "text-lg font-semibold pr-20",
          inputWrapper: "h-14 bg-muted/30 shadow-lg backdrop-blur-sm",
        }}
    
        startContent={<SearchIcon className="text-default-400" />}
      />
      <Button 
        size="lg" 
        className="absolute right-1 top-1 rounded-full bg-gradient-to-tr from-pink-500 to-yellow-500 text-white font-semibold"
      >
        Search
      </Button>
    </div>
  );
};

const SkillChip = ({ skill, onClick }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Chip
      variant="shadow"
      className="cursor-pointer backdrop-blur-sm"
      onClick={onClick}
    >
      {skill}
    </Chip>
  </motion.div>
);

const CategoryCard = ({ category }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 10 }}
      whileTap={{ scale: 0.95 }}
      className="perspective"
    >
      <Card className="w-full h-full bg-background/95 backdrop-blur-md shadow-lg cursor-pointer overflow-hidden">
        <CardBody className="p-0">
          <div className={`h-2 bg-gradient-to-r ${category.color}`} />
          <div className="flex flex-col items-center justify-center p-6 h-36">
            <div className={`p-3 rounded-full mb-4 bg-gradient-to-br ${category.color}`}>
              <category.icon className="w-8 h-8 text-white" />
            </div>
            <span className="text-lg font-semibold text-center">{category.name}</span>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

const InteractiveBorderButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimationControls();

  const handleHoverStart = () => {
    setIsHovered(true);
    controls.start({
      pathLength: [0, 1],
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" }
    });
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    controls.start({
      pathLength: [1, 0],
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1, delay: 0.1 }}
      className="text-center z-10"
    >
      <motion.button
        className="relative inline-flex h-12 overflow-visible rounded-full focus:outline-none focus:ring-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
      >
        <motion.span
          className="absolute inset-[-2px] rounded-full"
          style={{ 
            background: 'conic-gradient(from 90deg at 50% 50%, #EC3A78 0%, #6E0303 50%, #DAA11D 100%)',
            opacity: 0.8
          }}
          
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.span
          className="absolute inset-[-2px] rounded-full"
          initial={{ opacity: 0 }}
          animate={controls}
        >
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M 50,2 A 48,48 0 1 1 49.99,2"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={controls}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EC3A78" />
                <stop offset="50%" stopColor="#6E0303" />
                <stop offset="100%" stopColor="#DAA11D" />
              </linearGradient>
            </defs>
          </svg>
        </motion.span>
        <motion.span
          className="relative inline-flex h-full items-center justify-center rounded-full bg-black px-6 py-1 text-sm font-medium text-white transition-colors z-10"
          animate={{
            backgroundColor:  "rgba(0,0,0,1)",
          }}
        >
          <motion.span
            initial={{ x: 0 }}
            animate={{ x: isHovered ? -3 : 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
               
            Get Started
          </motion.span>
          <motion.span
            initial={{ x: 0, opacity: 0.5 }}
            animate={{ x: isHovered ? 3 : 0, opacity: isHovered ? 1 : 0.5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ChevronRight className="ml-2" />
          </motion.span>
        </motion.span>
      </motion.button>
    </motion.div>
  );
};

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="relative overflow-hidden text-foreground">
      <div className="relative z-10 flex flex-col items-center justify-center  p-4 ">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-secondary">
          Unlock Global Talent
        </h1>
     <p className="text-lg md:text-xl lg:text-2xl font-lufga bg-clip-text text-transparent bg-gradient-to-r from-foreground to-gray-400">
            Connect with top-tier talent in our decentralized marketplace
          </p>
      </motion.div>
    

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-3xl mb-16 md:mb-16 mt-8 md:mt-12"
        >
          <InteractiveSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            <AnimatePresence>
              {popularSkills.map((skill) => (
                <SkillChip key={skill} skill={skill} onClick={() => setSearchQuery(skill)} />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>


       <InteractiveBorderButton />

        <MarqueeDemo />
      </div>
    </div>
  );
};

export default HomePage;