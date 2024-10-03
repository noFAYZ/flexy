"use client"

import React, { useState, Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PointMaterial, Points, useGLTF } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { NextUIProvider, Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import { useTheme } from "next-themes";
import NextLink from "next/link";
import { FlipWords } from '@/components/ui/flip-words';
import { ReactComponent as FlexyLogo } from "/public/icons/logo.svg";
import { ReactComponent as DarkFlexyLogo } from "/public/icons/darklogo.svg";


function Planet() {
  const { scene } = useGLTF("/earth.glb");
  useFrame(() => {
    scene.rotation.y += 0.001;
  });
  return <primitive object={scene} scale={9.5} position={[0,-4, 0]} />;
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

const ComingSoonNavbar = () => {
  const { theme } = useTheme();
  return (
    <Navbar className="py-4 bg-transparent shadow-none bg-opacity-100 backdrop-blur-0">
      <NavbarContent className="flex justify-between items-center w-full max-w-7xl mx-auto px-6">
        <NavbarBrand>
          <NextLink href="/" passHref>
            <Link>
              {theme === "dark" ? (
                <DarkFlexyLogo width={90} height={45} />
              ) : (
                <FlexyLogo width={90} height={45} />
              )}
            </Link>
          </NextLink>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button 
              as={Link} 
              href="#waitlist"
              className="bg-gradient-to-r from-pink-500 to-orange-500 text-white font-medium rounded-full hover:opacity-80 transition-opacity"
            >
              Join Waitlist
            </Button>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>
    </Navbar>
  );
};

const ComingSoonPage = () => {
  const [email, setEmail] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);
  };

  const words = [
    "coming soon!",
    "crafting something amazing!",
    "almost ready!",
    "counting down the days!",
    "preparing for takeoff!",
    "building the future!",
  ];

  return (
    <NextUIProvider>
      <div className="relative h-screen w-full overflow-hidden">     
        <div className="absolute inset-0 bg-[#0D0D1B]">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>
        <ComingSoonNavbar />
        <Canvas className="absolute inset-0 z-10" camera={{ position: [0, 0, 15], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Planet />
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
          </Suspense>
        </Canvas>

        <div className="absolute inset-0 flex flex-col items-center justify-between pt-60">
          <motion.h1
            className="text-[2rem] items-center px-5 text-center md:text-[3.5rem] lg:text-[5rem] font-bold font-lufga z-10 text-orange-500 tracking-wider"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          > 
            We&apos;re <FlipWords words={words} className="text-white"/>
          </motion.h1>

          <motion.div 
            className="w-full max-w-md mx-auto p-6 bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-3xl shadow-lg border-2 border-orange-500 z-20"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  fullWidth
                  color="warning"
                  placeholder="Enter your email"
                  startContent={<EmailIcon />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-orange-100 placeholder-orange-300"
                  classNames={{
                    inputWrapper: "bg-gray-700 bg-opacity-50 border border-orange-400 rounded-full py-1",
                    input: "text-orange-100"
                  }}
                />
              </div>
              <Button 
                auto 
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Join the Adventure
              </Button>
              <Button
                auto
                size="lg"
                className="w-full bg-gray-700 bg-opacity-50 text-orange-300 font-bold rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-gray-600"
                onClick={() => setIsOpen(true)}
              >
                Discover More
              </Button>
            </form>

            <AnimatePresence>
              {showThankYou && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-4 p-4 bg-orange-600 bg-opacity-20 rounded-lg"
                >
                  <p className="text-center text-orange-300 font-semibold">
                    Welcome aboard! Get ready to reshape the future of work.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="mt-8 text-center z-20 pb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-orange-200 mb-2">Powered by Cutting-Edge Technologies</p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {['Ceramic Network', 'Base Network', 'Account Abstraction'].map((tech) => (
                <motion.span
                  key={tech}
                  className="text-xs bg-orange-800 px-3 py-1 rounded-full text-orange-100"
                  whileHover={{ scale: 1.1, backgroundColor: '#f97316' }}
                  transition={{ duration: 0.2 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        <Modal 
          isOpen={isOpen} 
          onOpenChange={setIsOpen}
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">About DecentralFreelance</ModalHeader>
                <ModalBody>
                  <p>
                    DecentralFreelance is revolutionizing the freelancing industry by leveraging blockchain technology and decentralized networks. Our platform offers:
                  </p>
                  <ul className="list-disc list-inside">
                    <li>Secure and transparent transactions</li>
                    <li>Lower fees compared to traditional platforms</li>
                    <li>True ownership of your work and data</li>
                    <li>Global accessibility and inclusivity</li>
                  </ul>
                  <p>
                    Built on Ceramic Network for decentralized data storage, Base Network for scalable transactions, and Account Abstraction for a seamless user experience, DecentralFreelance is set to transform how freelancers and clients interact in the digital age.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </NextUIProvider>
  );
};

const EmailIcon = (props) => (
  <svg
    {...props}
    fill="none"
    height="24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export default ComingSoonPage;