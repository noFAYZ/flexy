"use client";

import React, { useState, Suspense, useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PointMaterial,
  Points,
  useGLTF,
} from "@react-three/drei";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { FlipWords } from "@/components/ui/flip-words";
import SpaceshipEmailCapture from "./components/EmailForm";
import { GithubIcon, TwitterIcon } from "@/components/icons";
import { IconBrandDiscord, IconBrandTelegram } from "@tabler/icons-react";
import { Button, Card, Code } from "@nextui-org/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import Image from "next/image";
import {
  FileIconsTelegram,
  HugeiconsNewTwitterRectangle,
  SimpleIconsDiscord,
} from "@/components/icons/icons";
import LearnMoreSection from "./components/ComparisonSection";
import InnovativeCardComparison from "./components/ComparisonSection";
import AdditionalSections from "./components/ComparisonSection";
import { Rocket, Shield, Users, Globe, Zap, Lock, Coins, Check,  Wallet, Share2, Award, TrendingUp, X, User, Brain, DollarSign, Sprout, Crown, LinkIcon } from 'lucide-react';
import * as THREE from "three";


import { ReactComponent as FlexyLogoIcon } from "/public/images/logo/DeFlexy.svg";
import  FlexyLogoIconDark  from "/public/images/logo/DeFlexy.png";

function Planet() {
  const { scene } = useGLTF("/earth.glb");
  useFrame(() => {
    scene.rotation.y += 0.001;
  });
  return <primitive object={scene} scale={9.5} position={[0, -5, 0]} />;
}

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

const StarField = ({ count = 1000 }) => {
  const points = useRef<THREE.Points>(null);
  const spherePoints = useMemo(() => generateSpherePoints(count, 1.5), [count]);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.x -= delta / 10;
      points.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={points}
        positions={spherePoints}
        stride={3}
        frustumCulled={false}
      >
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

const ImmersiveBackground = () => (
  <div className="fixed inset-0">
    <Canvas camera={{ position: [0, 0, 1] }}>
     
      <StarField />
    </Canvas>
  </div>
);

const CreativeTimer = ({ days, hours, minutes, seconds }) => {
  const timeUnits = [
    { label: "D", value: days, max: 365, color: "#F05831" },
    { label: "H", value: hours, max: 24, color: "#F05831" },
    { label: "M", value: minutes, max: 60, color: "#F05831" },
    { label: "S", value: seconds, max: 60, color: "#F05831" },
  ];

  return (
    <motion.div
      className="flex justify-center py-8 px-4 space-x-4 md:space-x-0 md:space-y-6 md:flex-col"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          className="relative w-22 h-22 md:w-28 md:h-28"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95, rotate: -5 }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <filter id={`glow-${index}`}>
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background circle */}
            <circle cx="50" cy="50" r="45" fill="rgba(255,255,255,0.1)" />

            {/* Animated progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={unit.color}
              strokeWidth="8"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: unit.value / unit.max }}
              transition={{ duration: 1, delay: index * 0.2 }}
              transform="rotate(-90 50 50)"
            />

            {/* Value text */}
            <motion.text
              x="50"
              y="45"
              fontSize="24"
              fontWeight="bold"
              fill={unit.color}
              textAnchor="middle"
              dominantBaseline="central"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
            >
              {unit.value}
            </motion.text>

            {/* Label text */}
            <motion.text
              x="50"
              y="65"
              fontSize="14"
              fill={unit.color}
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
            >
              {unit.label}
            </motion.text>
          </svg>
        </motion.div>
      ))}
    </motion.div>
  );
};

const SocialIcon = ({ Icon, href, color, bg }) => (
  <Button
    as={Link}
    target="_blank"
    rel="noopener noreferrer"
    href={href}
    className={`text-${color} hover:text-${color}-600 transition-colors duration-300 rounded-2xl max-w-md ${bg}`}
  >
    <Icon size={24} />
  </Button>
);

const EnhancedEmailCapture = () => {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/submitEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to submit email");
        }
        setIsSubmitted(true);
        setShowModal(true);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleButtonClick = () => {
    if (!showInput) {
      setShowInput(true);
    } else if (email.trim() !== "") {
      handleSubmit(new Event("submit"));
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isSubmitted && (
          <motion.form
            key="email-form"
            className="bg-gray-800 z-20 bg-opacity-70 backdrop-blur-md p-4 sm:p-6 rounded-3xl flex flex-col sm:flex-row gap-3 align-middle items-center transition-all duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onSubmit={handleSubmit}
          >
            <AnimatePresence>
              {showInput && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "100%", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full sm:w-96 md:w-96 lg:w-96 px-6 py-4 rounded-full bg-gray-800 text-white border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 text-xl"
                  required
                  disabled={isLoading}
                />
              )}
            </AnimatePresence>
            <button
              type="submit"
              onClick={showInput ? undefined : handleButtonClick}
              className="px-4 py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 text-lg w-full sm:w-auto disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading
                ? "Submitting..."
                : showInput
                ? "Join "
                : "Get Early Access"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-red-500 text-white p-4 rounded-md mt-4"
        >
          {error}
        </motion.div>
      )}

      <AnimatePresence>
        {isSubmitted && !showModal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-800 z-20 bg-opacity-70 backdrop-blur-md p-4 sm:p-6 rounded-3xl text-center"
          >
            <p className="text-white text-xl">
              Thank you for joining our waitlist!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-gray-900 bg-opacity-80 backdrop-blur-lg p-6 md:p-8 rounded-2xl shadow-lg max-w-md w-full">
              <h2 className="text-2xl md:text-3xl font-bold text-orange-500 mb-4">
                Welcome Aboard!
              </h2>
              <div className="flex flex-col space-y-4 py-10">
                <p className="text-lg mb-6">
                  Congrats! You're an Early bird. Stay tuned we've some gifts
                  for you ;)
                </p>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-orange-300 font-semibold mb-2">
                    Your Cosmic Coordinates:
                  </p>
                  <p className="text-white">{email}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-orange-300 font-semibold text-center">
                    Connect with fellow space travelers:
                  </p>
                  <div className="flex justify-center gap-2 space-x-6">
                    {/*             <SocialIcon Icon={HugeiconsNewTwitterRectangle} href="https://twitter.com/#" color="blue-400" bg={'bg-black'}/> */}
                    <SocialIcon
                      Icon={SimpleIconsDiscord}
                      href="https://discord.gg/YG3UJGgv"
                      color="white"
                      bg={"bg-blue-500"}
                    />
                    {/* <SocialIcon Icon={FileIconsTelegram} href="https://t.me/#" color="blue-300" bg={'bg-blue-600'} /> */}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 text-lg"
              >
                Return to Earth
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* const FloatingSocialIcons = () => (
  <motion.div
    className="fixed bottom-4 right-4 md:bottom-8 md:right-8 flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-4 z-40"
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 1, delay: 1 }}
  >
    {[
      {
        Icon: GithubIcon,
        href: "https://github.com/your-github",
        color: "bg-gray-800",
      },
      {
        Icon: TwitterIcon,
        href: "https://twitter.com/your-twitter",
        color: "bg-blue-400",
      },
      {
        Icon: IconBrandTelegram,
        href: "https://t.me/your-telegram",
        color: "bg-blue-500",
      },
    ].map(({ Icon, href, color }) => (
      <motion.a
        key={href}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`p-2 md:p-3 rounded-full ${color} text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}
        whileHover={{ scale: 1.2, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
      >
        <Icon className="w-4 h-4 md:w-6 md:h-6" />
      </motion.a>
    ))}
  </motion.div>
); */

const FeatureCard = ({ title, description, step }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-64 h-36 rounded-lg bg-gray-800 bg-opacity-70 backdrop-blur-md p-4 flex flex-col justify-center items-center cursor-pointer overflow-hidden"
      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 165, 0, 0.5)" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
        {step}
      </div>
      <motion.h2
        className="text-xl font-bold text-orange-500 mb-2 text-center"
        animate={{ y: isHovered ? -10 : 0 }}
      >
        {title}
      </motion.h2>
      <motion.p
        className="text-white text-center"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: isHovered ? 1 : 0.6 }}
      >
        {description}
      </motion.p>
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-orange-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const AnimatedPlanet = ({ scrollYProgress }) => {
  const mesh = useRef<THREE.Group>(null);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const yPos = useTransform(scrollYProgress, [0, 0.5], [0, -2]);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.scale.set(scale.get(), scale.get(), scale.get());
      mesh.current.position.y = yPos.get();
    }
  });

  return (
    <group ref={mesh}>
      <Planet />
    </group>
  );
};



/* 
const TechnologyStack = () => (
  <section className="py-24 relative z-20">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-4">
          Powered by Advanced Technology
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Built on cutting-edge blockchain and web3 infrastructure
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {[
          "Account Abstraction",
          "Smart Contracts",
          "IPFS Storage",
          "Ceramic Network",
          "Multi-Chain Support",
          "Zero Knowledge Proofs",
          "Decentralized Identity",
          "Layer 2 Scaling"
        ].map((tech, idx) => (
          <motion.div
            key={tech}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-4 
              border border-gray-700 hover:border-orange-500/50 
              transition-all duration-300 text-center"
          >
            <span className="text-white font-medium">{tech}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
); */

const CreativeCTAs = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="min-h-screen py-24 relative z-20">
      <div className="container bg-gray-800 bg-opacity-70 skew-y-[-5deg] backdrop-blur-lg rounded-[4rem] md:rounded-[10rem] pt-20 pb-40 mx-auto px-4 antialiased">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 "
        >
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-white  mb-4 skew-y-[5deg]">
            Choose Your Journey
          </h2>
          <p className="text-orange-500 max-w-2xl text-md md:text-xl mx-auto skew-y-[5deg]">
            Join the future of decentralized work
          </p>
        </motion.div>

        <div className="skew-y-[7deg] grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {[
            {
              type: "freelancer",
              title: "For Freelancers",
              subtitle: "Unleash your potential",
              icon: User,
              gradient: "from-orange-500 to-pink-500 ",
              benefits: [
                { icon: Wallet, text: "Zero platform fees for early adopters" },
                { icon: Shield, text: "Own your reputation with NFT credentials" },
                { icon: Zap, text: "Get paid instantly in any crypto" },
                { icon: Brain, text: "AI-powered project matching" }
              ],
              features: ["Global Opportunities", "Secure Payments", "Own Your Data"]
            },
            {
              type: "client",
              title: "For Clients",
              subtitle: "Find exceptional talent",
              icon: Users,
              gradient: "from-pink-500 to-orange-500",
              benefits: [
                { icon: Globe, text: "Access global talent pool" },
                { icon: Lock, text: "Secure escrow payments" },
                { icon: DollarSign, text: "Transparent pricing" },
                { icon: Award, text: "Quality guaranteed work" }
              ],
              features: ["Verified Talent", "Smart Contracts", "Easy Management"]
            }
          ].map((card) => (
            <motion.div
              key={card.type}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredCard(card.type)}
              onHoverEnd={() => setHoveredCard(null)}
              className={`
                relative group overflow-hidden
                bg-gray-800 border-medium border-transparent rounded-[3.5rem] p-8
                hover:border-medium hover:border-orange-500/50
                transition-all duration-100 antialiased 
              `}
            >
   


              {/* Content */}
              <div className="relative z-10 skew-y-[-2deg] antialiased">
                {/* Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`
                    w-16 h-16 rounded-2xl
                    bg-gradient-to-br ${card.gradient}
                    flex items-center justify-center
                    group-hover:scale-110 transition-transform duration-200
                  `}>
                    <card.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white antialiased">{card.title}</h3>
                    <p className="text-gray-300 antialiased">{card.subtitle}</p>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-4 mb-8 antialiased">
                  {card.benefits.map((benefit, idx) => (
                    <motion.div
                      key={benefit.text}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className={`
                        w-8 h-8 rounded-lg
                        bg-gradient-to-br ${card.gradient}
                        flex items-center justify-center
                      `}>
                        <benefit.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-300 antialiased text-sm md:text:lg">{benefit.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Features Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {card.features.map((feature) => (
                    <span
                      key={feature}
                      className={`
                        px-3 py-1 rounded-full text-sm
                        bg-gradient-to-r ${card.gradient}
                        text-white font-medium
                      `}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.01 }}
                  className={`
                    w-full py-4 rounded-3xl
                    bg-gradient-to-r ${card.gradient}
                    text-white font-bold text-lg
                    hover:shadow-lg hover:shadow-orange-500/20
                    transition-all duration-100
                    relative overflow-hidden 
                  `}
                >
                  <span className="relative z-10">
                    {card.type === "freelancer" ? "Start Earning" : "Start Hiring"}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 0.1 }}
                    transition={{ duration: 0.01 }}
                  />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};





const InteractiveShowcase = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    {
      id:0,
      title: "Secure Payments",
      description: "Experience peace of mind with our secure payment system that releases funds only when you're satisfied with the work.",
      icon: Shield,
      gradient: "from-orange-500 to-pink-500",
      demo: "/showcase/astro.png",
      width: 750,
      height:750
    },
    {
      id:1,
      title: "Verified Profiles",
      description: "Build trust with verified freelancer profiles showcasing skills and real feedback from past clients.",

      icon: Award,
      gradient: "from-pink-500 to-purple-500",
      demo: "/showcase/waiting.png",
      width: 750,
      height:750
    },
    {
      id:2,
      title: "AI Matching",
      description: "Find your perfect freelancer effortlessly with our intelligent project matching system tailored to your needs.",
      icon: Brain,
      gradient: "from-purple-500 to-orange-500",
      demo: "/showcase/leg.png",
      width: 700,
      height:700
    }
  ];

  return (
    <section className="py-24 relative z-20 ">
      <div className="container mx-auto py-10 shadow-lg bg-white opacity-95  rounded-[2rem] md:rounded-[9rem] skew-y-3">
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-5 -skew-y-3"
        >
          <h2 className="text-3xl md:text-7xl flex  items-center  sm:flex-row gap-4 justify-center font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-black  mb-4 -skew-y-3">
            Why <Image src={FlexyLogoIconDark} alt={'Logo'}  width={200} height={45} />?
           </h2>
        {/*   <p className="text-orange-500 max-w-2xl text-xl mx-auto -skew-y-3">
            Join the future of remote work
          </p> */}
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center -skew-y-3">
          {/* Feature List */}
          <div className="space-y-6">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                className={`
                  relative p-6 rounded-[2.5rem] cursor-pointer 
                  ${activeFeature === idx ? 'bg-gray-900 backdrop-blur-lg text-white' : 'hover:bg-gray-500/20'}
                  transition-all duration-100
                `}
                onClick={() => setActiveFeature(idx)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex w-full  items-center gap-4">
                  <div className="w-[20%]]">
                  <div className={`
                    w-16 h-16 rounded-3xl
                    bg-gradient-to-br ${feature.gradient}
                    flex items-center justify-center
                  `}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div></div>
                  <div>
                    <h3 
                      className={`
                       text-lg md:text-xl font-bold  mb-1 ${activeFeature === idx ? ' text-white' : 'text-black'}`}
                    
                    >{feature.title}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm">{feature.description}</p>
                  </div>
                </div>

       
              </motion.div>
            ))}
          </div>

          {/* Interactive Demo */}
          <div className="relative aspect-square rounded-[9rem] overflow-hidden">
    
            <div className="relative h-full">
              {features.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  className="absolute inset-0 flex items-center  justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeFeature === idx ? 1 : 0 }}
                  transition={{ duration: 0.1 }}>
                     <Image 
               className="anti-aliasing  "
                  src={(idx == 0 ? '/showcase/bg-3.png' : (idx == 1 ? '/showcase/bg-1.png' : '/showcase/bg-2.png'))}
                  alt={feature.title}
                 layout="fill"
                  objectFit="fit"
                />

               <Image 
               className="anti-aliasing  "
                  src={feature.demo}
                  alt={feature.title}
                 layout="fill"
                  objectFit="fit"
                />
                  
              
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const InteractiveShowcase2 = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    {
      id:0,
      title: "Decentralized Infrastructure",
      description: "Built on cutting-edge blockchain technologyies to remove centralization (Biased Decisions).",
      icon: Shield,
      gradient: "from-orange-500 to-pink-500",
      demo: "/showcase/walk.png",
      width: 750,
      height:750
    },
    {
      id:1,
      title: "Seamless Collaborations",
      description: "Build trust with verified freelancer profiles showcasing skills and real feedback from past clients.",

      icon: Award,
      gradient: "from-pink-500 to-purple-500",
      demo: "/showcase/game.png",
      width: 750,
      height:750
    },
    {
      id:2,
      title: "Social Community",
      description: "We believe in Community driven services. Connect and share your thoughts an find work",
      icon: Brain,
      gradient: "from-purple-500 to-orange-500",
      demo: "/showcase/social.png",
      width: 700,
      height:700
    }
  ];

  return (
    <section className="pb-24 relative z-20 ">
      <div className="container mx-auto py-10 shadow-lg bg-white backdrop-blur-md rounded-[2rem] md:rounded-[9rem] skew-y-3">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center -skew-y-3">

           {/* Interactive Demo */}
          <div className="relative aspect-square rounded md:rounded-[9rem] overflow-hidden">
    
            <div className="relative h-full">
              {features.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  className="absolute inset-0 flex items-center  justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeFeature === idx ? 1 : 0 }}
                  transition={{ duration: 0.1 }}>
                     <Image 
               className="anti-aliasing  "
                  src={(idx == 0 ? '/showcase/bg-4.png' : (idx == 1 ? '/showcase/bg-star.png' : '/showcase/bg-2.png'))}
                  alt={feature.title}
                 layout="fill"
                  objectFit="fit"
                />

               <Image 
               className="anti-aliasing  "
                  src={feature.demo}
                  alt={feature.title}
                 layout="fill"
                  objectFit="fit"
                />
                  
              
                </motion.div>
              ))}
            </div>
          </div>

          {/* Feature List */}
          <div className="space-y-6">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                className={`
                  relative p-6 rounded-[2.5rem] cursor-pointer
                     ${activeFeature === idx ? 'bg-gray-900 backdrop-blur-lg text-white' : 'hover:bg-gray-500/20'}
                  transition-all duration-100
                `}
                onClick={() => setActiveFeature(idx)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex w-full  items-center space-x-4">
                  <div className="w-[20%]]">
                  <div className={`
                    w-16 h-16 rounded-3xl
                    bg-gradient-to-br ${feature.gradient}
                    flex items-center justify-center
                  `}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div></div>
                  <div>
                    <h3 
                      className={`
                       text-lg font-bold  mb-1 ${activeFeature === idx ? ' text-white' : 'text-black'}`}
                    
                    >{feature.title}</h3>
                    <p className="text-gray-400 text-xs sm:text-md">{feature.description}</p>
                  </div>
                </div>

       
              </motion.div>
            ))}
          </div>

         
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black bg-opacity-95 backdrop-filter backdrop-blur-lg text-white py-12 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
          <FlexyLogoIcon width={160} height={75} />
           
            <p className="text-gray-400">
              Join our community and stay updated with the latest news and features.
            </p>
          </div>

          <div className="flex space-x-4 mb-6 md:mb-0">
            <SocialIcon Icon={GithubIcon} href="#" color="bg-gray-800" bg={'bg-gray-800'} />
            <SocialIcon Icon={TwitterIcon} href="https://x.com/_deFlexy" color="bg-black" bg={'bg-black'} />
            <SocialIcon Icon={IconBrandDiscord} href="https://discord.gg/eG8ZddQz" color="bg-blue-500" bg={'bg-blue-600'} />
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2">Subscribe for Updates</h3>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-r-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold hover:from-orange-600 hover:to-pink-600 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

   

        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} DeFlexy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const ComingSoonPage = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const target = new Date("2025-04-29T23:59:59");

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
      setHours(
        Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      setMinutes(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((difference % (1000 * 60)) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const words = [
    "Coming Soon!",
    "Revolutionizing Freelancing!",
    "Empowering Creators!",
    "Building the Future!",
  ];

  return (
    <>
      <div className="relative bg-black">
        <motion.div className="fixed inset-0 z-0" style={{ opacity }}>
          <ImmersiveBackground />
        </motion.div>

        <div className="sticky top-0 h-screen overflow-hidden ">
          <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
            <AnimatedPlanet scrollYProgress={scrollYProgress} />
       
          </Canvas>
        </div>

        {/* Main Section */}
        <div className="absolute h-screen top-0 inset-0 flex flex-col items-center justify-between pt-28 md:pt-28 px-4">

          {/* Glitch Title*/}
          <div className="z-20 text-center">
            <motion.h1
              className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl items-center px-2 sm:px-5 text-center font-bold font-lufga text-orange-500 tracking-wider"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="glitch-container mb-4 sm:mb-8">
                <h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-orange-500 text-center glitch-text"
                  data-text="We're"
                >
                  {" "}
                  We're{" "}
                </h1>
                <FlipWords words={words} className="text-white" />
              </div>
            </motion.h1>

            <div className="md:hidden mt-6">
              <CreativeTimer
                days={days}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
              />
            </div>
          </div>

          {/* Social Icons */}
          <div className="hidden md:block md:absolute md:left-6 md:top-1/2 md:transform md:-translate-y-1/2 z-30">
            <CreativeTimer
              days={days}
              hours={hours}
              minutes={minutes}
              seconds={seconds}
            />
          </div>
          <Suspense fallback={<div>Loading...</div>}>
          {/*<SpaceshipEmailCapture />     */}
            <EnhancedEmailCapture />
          </Suspense>
          {/* Initial Cards */}
          <div className="flex flex-wrap justify-center gap-6 mt-6 sm:mt-10 z-20 w-full">
            <div className="relative w-full  flex flex-col items-center justify-center p-4 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(100)].map((_, i) => (
                  <div
                    key={i}
                    className="star"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 5}s`,
                    }}
                  ></div>
                ))}
              </div>

              <ScrollArea className="w-full">
                <div className="relative z-10 hidden md:flex flex-col items-center justify-center p-8">
                  <div className="flex flex-wrap justify-center gap-8 mb-8">
                    <FeatureCard
                      title="Register"
                      description="Create your account and set up your professional profile"
                      step={1}
                    />

                    <FeatureCard
                      title="Discover"
                      description="Find projects or talent matching your skills and requirements"
                      step={2}
                    />

                    <FeatureCard
                      title="Collaborate"
                      description="Work on projects with secure communication and file sharing"
                      step={3}
                    />

                    <FeatureCard
                      title="Get Paid"
                      description="Receive payments securely through smart contracts"
                      step={4}
                    />
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
          
          {/* ScrollDown */}
          <div>
            <motion.div
              className=" pb-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <p className="text-gray-400 mb-2 text-lg uppercase tracking-widest font-bold">
                Scroll to Explore
              </p>
              <motion.div
                className="w-6 h-10 border-2 border-gray-400 rounded-full p-1"
                initial={{ y: 0 }}
                animate={{ y: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  className="w-1 h-2 bg-orange-500 rounded-full mx-auto"
                  initial={{ y: 0 }}
                  animate={{ y: [0, 16, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        <motion.section className="min-h-screen py-16 px-4 sm:px-0 relative z-20">
     

     

    
        <InteractiveShowcase />
        <InteractiveShowcase2 />


          {/* Creative CTAs */}
          <CreativeCTAs />

       

         

          {/* Additional Sections 
          <InteractiveTimeline />*/}
           <AdditionalSections />
           {/* Technology Stack
          <TechnologyStack /> */}
        </motion.section>
      </div>
      <Footer />
    </>
  );
};

export default ComingSoonPage;
