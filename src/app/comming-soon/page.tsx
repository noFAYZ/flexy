"use client"

import React, { useState, Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PointMaterial, Points, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import { NextUIProvider, Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import { useTheme } from "next-themes";
import NextLink from "next/link";
import { FlipWords } from '@/components/ui/flip-words';
import { ReactComponent as FlexyLogo } from "/public/images/logo/DeFlexy-dark.svg";
import { ReactComponent as DarkFlexyLogo } from "/public/images/logo/DeFlexy.svg";

import SpaceshipEmailCapture from './components/EmailForm';
import * as THREE from 'three';

// Load GLTF model
const SpaceshipModel = ({ position, rotation, isHovering, isLaunching }) => {
  const gltf = useGLTF('/spaceship.glb');
  const ref = useRef();
  useFrame(() => {
    if (isHovering) {
      ref.current.position.y += Math.sin(Date.now() * 0.002) * 0.02;
    }
    if (isLaunching) {
      ref.current.position.y += 0.05;
    }
  });

  return (
    <group ref={ref} position={[position.x, position.y, 0]} rotation={[0, 0, rotation]}>
      <primitive object={gltf.scene} scale={0.7} />
    </group>
  );
};

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

const ImmersiveBackground = () => (
  <div className="fixed inset-0">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <ambientLight intensity={0.5} />
      <StarField />
    </Canvas>
  </div>
);

const ComingSoonNavbar = () => {
  const { theme } = useTheme();
  return (
    <Navbar className="py-6 md:py-8 bg-transparent shadow-none">
      <NavbarContent className="w-full mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo on the left */}
        <NavbarBrand className="flex justify-center items-center">
          <NextLink href="/" passHref>
            <Link>
              {theme === "dark" ? (
                <DarkFlexyLogo width={140} height={100} /> // Smaller on mobile
              ) : (
                <FlexyLogo width={120} height={90} />
              )}
            </Link>
          </NextLink>
        </NavbarBrand>

        {/* Button on the right */}
        <NavbarContent
          className="flex justify-center items-center"
          justify="center"
        >
          <NavbarItem>
            <Button
              as={Link}
              href="#waitlist"
              className="bg-gradient-to-r from-pink-500 to-orange-500 text-white font-medium rounded-full hover:opacity-80 transition-opacity px-4 py-2 md:px-6 md:py-3 text-sm md:text-base"
            >
              Join Waitlist
            </Button>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>
    </Navbar>
  );
};

const SpaceScene = ({ animationState }) => {
  const { viewport } = useThree();
  let position, rotation, isHovering, isLaunching;

  switch (animationState) {
    case 'entering':
      position = { x: THREE.MathUtils.lerp(-viewport.width / 2, 0, 0.5), y: 0 };
      rotation = 5.33;
      isHovering = true;
      isLaunching = false;
      break;
    case 'hovering':
      position = { x: -4, y: 2 };
      rotation = -1;
      isHovering = true;
      isLaunching = false;
      break;
    case 'exiting':
      position = { x: 0, y: 0 };
      rotation = 0;
      isHovering = false;
      isLaunching = true;
      break;
    default:
      position = { x: -viewport.width / 2, y: 0 };
      rotation = 0;
      isHovering = false;
      isLaunching = false;
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <SpaceshipModel position={position} rotation={rotation} isHovering={isHovering} isLaunching={isLaunching} />
    </>
  );
};

const ComingSoonPage = () => {
  const [email, setEmail] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [animationState, setAnimationState] = useState('entering');

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
  
      <div className="relative h-screen w-full overflow-hidden">
        <ImmersiveBackground />
      
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
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl items-center px-5 text-center font-bold font-lufga z-10 text-orange-500 tracking-wider"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            We're <FlipWords words={words} className="text-white" />
          </motion.h1>

          <SpaceshipEmailCapture />

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