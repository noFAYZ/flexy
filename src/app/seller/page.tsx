"use client"



import React, { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, CardBody } from "@nextui-org/react";
import { ChevronRight, Search, Briefcase, Rocket, TrendingUp } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial, Points } from '@react-three/drei';

const STAGES = [
  { id: 'discover', icon: Search, title: 'Market Research' },
  { id: 'create', icon: Briefcase, title: 'Product Development' },
  { id: 'launch', icon: Rocket, title: 'Business Launch' },
  { id: 'grow', icon: TrendingUp, title: 'Scale Operations' },
];

const StarryBackground = () => (
  <div className="fixed inset-0 bg-[url('/starry-sky.jpg')] bg-cover bg-center" />
);

// Utility function to generate random points on a sphere
const generateSpherePoints = (count, radius) => {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    points[i3] = radius * Math.sin(phi) * Math.cos(theta);
    points[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    points[i3 + 2] = radius * Math.cos(phi);
  }
  return points;
};

const StarField = ({ count = 5000 }) => {
  const points = useRef();
  const spherePoints = useMemo(() => generateSpherePoints(count, 1.5), [count]);

  useFrame((state, delta) => {
    points.current.rotation.x -= delta / 10;
    points.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={points} positions={spherePoints} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="foreground"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const ImmersiveBackground = () => {
  return (
    <div className="  fixed inset-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ambientLight intensity={0.5} />
        <StarField />
     
      </Canvas>
    </div>
  );
};

const StageCard = ({ stage, isActive, onClick }) => (
  <Card 
    isPressable
    isHoverable
    className={`w-64 h-32 ${isActive ? 'border-primary' : 'border-transparent'}`}
    onPress={onClick}
  >
    <CardBody className="flex flex-col justify-center items-center p-4">
      <stage.icon size={24} className="mb-2 text-primary" />
      <h3 className="text-lg font-semibold text-center">{stage.title}</h3>
    </CardBody>
  </Card>
);

const StageContent = ({ stage }) => {
  const contents = {
    discover: {
      title: "Market Research",
      description: "Identify opportunities and understand your target audience to inform your business strategy.",
      action: "Start Research",
    },
    create: {
      title: "Product Development",
      description: "Transform your ideas into tangible products or services that meet market needs.",
      action: "Begin Development",
    },
    launch: {
      title: "Business Launch",
      description: "Introduce your offering to the market and establish your presence in the industry.",
      action: "Prepare for Launch",
    },
    grow: {
      title: "Scale Operations",
      description: "Expand your business reach and optimize processes for sustainable growth.",
      action: "Plan Expansion",
    },
  };

  const content = contents[stage];

  return (
    <motion.div
      key={stage}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto text-center"
    >
      <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
      <p className="text-lg mb-8">{content.description}</p>
      <Button
        color="primary"
        size="lg"
        endContent={<ChevronRight className="ml-2" />}
        className="font-semibold"
      >
        {content.action}
      </Button>
    </motion.div>
  );
};

const MinimalStellarMarketplace = () => {
  const [currentStage, setCurrentStage] = useState(0);

  return (
    <div className=" max-h-screen overflow-hidden text-foreground bg-transparent">
     <div className="absolute inset-0 bg-[#0D0D1B]">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>
      
      <div className="relative z-10  mx-auto px-4 py-12 min-h-[80vh] flex flex-col justify-between ">
        <motion.h1
          className="text-4xl md:text-6xl font-bold  text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Stellar Marketplace
        </motion.h1>

        <div className="flex justify-center mb-16 space-x-4">
          {STAGES.map((stage, index) => (
            <StageCard
              key={stage.id}
              stage={stage}
              isActive={currentStage === index}
              onClick={() => setCurrentStage(index)}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <StageContent stage={STAGES[currentStage].id} />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MinimalStellarMarketplace;