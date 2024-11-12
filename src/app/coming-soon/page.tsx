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
import { IconBrandTelegram } from "@tabler/icons-react";
import { Button, Card, Code } from "@nextui-org/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import {
  FileIconsTelegram,
  HugeiconsNewTwitterRectangle,
  SimpleIconsDiscord,
} from "@/components/icons/icons";
import LearnMoreSection from "./components/ComparisonSection";
import InnovativeCardComparison from "./components/ComparisonSection";
import AdditionalSections from "./components/ComparisonSection";
import { Rocket, Shield, Users, Globe, Zap } from "lucide-react";
import * as THREE from "three";

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

const StarField = ({ count = 5000 }) => {
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
      <ambientLight intensity={0.5} />
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

const FloatingSocialIcons = () => (
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
);

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

const ComingSoonPage = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const secondSectionY = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  useEffect(() => {
    const target = new Date("2024-11-30T23:59:59");

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
    "coming soon!",
    "revolutionizing freelancing!",
    "empowering creators!",
    "building the future!",
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
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={true}
            />
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

          {/*<SpaceshipEmailCapture />     */}
          <EnhancedEmailCapture />

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

        <motion.section className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative z-20">

          {/* Pricing and CTA Section*/}
          <AdditionalSections />



          {/*Technologies */}
          <motion.div
            className="mt-6 sm:mt-8 text-center z-20 pb-6 sm:pb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-orange-200 mb-2 text-sm sm:text-base">
              Powered by Cutting-Edge Technologies
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {[
                "Ceramic Network",
                "Account Abstraction",
                "Decentralized Identity",
              ].map((tech) => (
                <motion.span
                  key={tech}
                  className="text-xs sm:text-sm bg-orange-800 px-2 sm:px-3 py-1 rounded-full text-orange-100"
                  whileHover={{ scale: 1.1, backgroundColor: "#f97316" }}
                  transition={{ duration: 0.2 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.section>
      </div>
    </>
  );
};

export default ComingSoonPage;
