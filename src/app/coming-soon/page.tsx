"use client"

import React, { useState, Suspense, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PointMaterial, Points, useGLTF } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';
import { FlipWords } from '@/components/ui/flip-words';
import SpaceshipEmailCapture from './components/EmailForm';
import { GithubIcon, TwitterIcon } from '@/components/icons';
import { IconBrandTelegram } from '@tabler/icons-react';
import { Card } from '@nextui-org/react';



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

const CreativeTimer = ({ days, hours, minutes, seconds }) => {
  const timeUnits = [
    { label: 'D', value: days },
    { label: 'H', value: hours },
    { label: 'M', value: minutes },
    { label: 'S', value: seconds },
  ];

  return (
    <motion.div 
      className="flex justify-center space-x-2 md:space-x-0 md:space-y-4 md:flex-col"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          className="relative w-16 h-16 md:w-20 md:h-20"
          whileHover={{ scale: 1.1 }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#ff6b6b"
              strokeWidth="8"
              strokeDasharray={`${(unit.value / (index === 0 ? 365 : index === 1 ? 24 : 60)) * 283} 283`}
              transform="rotate(-90 50 50)"
            />
            <text x="50" y="50" fontSize="24" fill="#ff6b6b" textAnchor="middle" dominantBaseline="central">
              {unit.value}
            </text>
            <text x="50" y="75" fontSize="14" fill="#ff6b6b" textAnchor="middle">{unit.label}</text>
          </svg>
        </motion.div>
      ))}
    </motion.div>
  );
};

const EnhancedEmailCapture = () => {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      <motion.form
        key="email-form"
        className="bg-gray-800 bg-opacity-70 backdrop-blur-md p-4 sm:p-6 rounded-3xl flex flex-col sm:flex-row gap-3 align-middle items-center transition-all duration-300"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full sm:w-64 md:w-80 px-6 py-3 rounded-full bg-gray-800 text-white border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
        />
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 text-lg"
        >
          Join the Mission
        </button>
      </motion.form>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-gray-900 bg-opacity-80 backdrop-blur-lg p-6 md:p-8 rounded-2xl shadow-lg max-w-md w-full">
              <h2 className="text-2xl md:text-3xl font-bold text-orange-500 mb-4">Welcome Aboard!</h2>
          
              <p className="text-white mb-6">Congrats! You're an Early bird. Stay tuned we've some gifts for you ;)</p>
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
      { Icon: GithubIcon, href: "https://github.com/your-github", color: "bg-gray-800" },
      { Icon: TwitterIcon, href: "https://twitter.com/your-twitter", color: "bg-blue-400" },
      { Icon: IconBrandTelegram, href: "https://t.me/your-telegram", color: "bg-blue-500" },
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

const ComingSoonPage = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const target = new Date('2024-11-30T23:59:59');

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
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

      <div className="absolute inset-0 flex flex-col items-center justify-between py-28 md:py-28 px-4">
        <div className="z-20 text-center">
          <motion.h1
            className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl items-center px-2 sm:px-5 text-center font-bold font-lufga text-orange-500 tracking-wider"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          > 
            <div className="glitch-container mb-4 sm:mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-orange-500 text-center glitch-text" data-text="We're"> We're </h1>
              <FlipWords words={words} className="text-white"/>
            </div>
          </motion.h1>
          
          <div className="md:hidden mt-6">
            <CreativeTimer days={days} hours={hours} minutes={minutes} seconds={seconds} />
          </div>
        </div>

        <div className="hidden md:block md:absolute md:left-6 md:top-1/2 md:transform md:-translate-y-1/2 z-30">
          <CreativeTimer days={days} hours={hours} minutes={minutes} seconds={seconds} />
        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-6 sm:mt-10 z-20 w-full">
     {/*      <EnhancedEmailCapture /> */}



      <Card className="bg-gray-800 bg-opacity-70 backdrop-blur-md p-4 sm:p-6 rounded-3xl flex flex-col  gap-3 align-middle items-center transition-all duration-300">
        <h2 className="text-lg sm:text-xl font-bold text-orange-500 mb-2">Join the Community</h2>
        <p className="text-white mb-4">Get notified when we launch</p>

      </Card>

      <Card className="bg-gray-800 bg-opacity-70 backdrop-blur-md p-4 sm:p-6 rounded-3xl flex flex-col  gap-3 align-middle items-center transition-all duration-300">
        <h2 className="text-lg sm:text-xl font-bold text-orange-500 mb-2">Join the Community</h2>

        <p className="text-white mb-4">Get notified when we launch</p>
        
      </Card>
      
      <Card className="bg-gray-800 bg-opacity-70 backdrop-blur-md p-4 sm:p-6 rounded-3xl flex flex-col  gap-3 align-middle items-center transition-all duration-300">
        <h2 className="text-lg sm:text-xl font-bold text-orange-500 mb-2">Join the Community</h2>
        <p className="text-white mb-4">Get notified when we launch</p>
      </Card>
      


        </div>

        <motion.div
          className="mt-6 sm:mt-8 text-center z-20 pb-6 sm:pb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-orange-200 mb-2 text-sm sm:text-base">Powered by Cutting-Edge Technologies</p>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {['Ceramic Network', 'Account Abstraction', 'Decentralized Identity'].map((tech) => (
              <motion.span
                key={tech}
                className="text-xs sm:text-sm bg-orange-800 px-2 sm:px-3 py-1 rounded-full text-orange-100"
                whileHover={{ scale: 1.1, backgroundColor: '#f97316' }}
                transition={{ duration: 0.2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>


    </div>
  );
};

export default ComingSoonPage;