"use client"
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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


         <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center "
        >
        {/*   <p className="mb-4 text-lg text-foreground/80">Join thousands of satisfied clients and freelancers</p> */}
          <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-none  ">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Get Started <ChevronRight className="ml-2" />
            </span>
          </button>
        </motion.div>

        <MarqueeDemo />
      </div>
    </div>
  );
};

export default HomePage;