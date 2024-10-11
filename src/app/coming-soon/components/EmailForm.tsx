import { useRef, Suspense, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Sparkles } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/react';

import { GithubIcon, TwitterIcon } from '@/components/icons';
import { IconBrandTelegram } from '@tabler/icons-react';

const SpaceshipEmailCapture = ({ onubmit }) => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [animationState, setAnimationState] = useState('entering');
  const [showForm, setShowForm] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail));
  };

  const handleSubmit = (e) => {

    if (isValid) {
      setAnimationState('exiting'); // Trigger spaceship takeoff
      setShowThankYou(true);
      onSubmit(email);
      setTimeout(() => {
        setShowForm(false);
        setShowThankYou(false);
        setAnimationState('entering'); // Reset the form
        setEmail('');
      }, 3000); // Delay for the takeoff animation
    }
  };

  return (
    <div className="relative w-full h-screen z-10 flex items-center justify-center">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AnimatePresence>
          {!showForm && !showThankYou ? (
            <motion.div
              key="hop-in-button"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
            >
              <Button
                auto
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105"
                onClick={() => {
                  setAnimationState('hovering');
                  setShowForm(true);
                }}
              >
                Join the waitlist
              </Button>
            </motion.div>
          ) : showThankYou ? (
            <motion.div
              key="thank-you-message"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
            >
              Thank you for subscribing!
            </motion.div>
          ) : (
            <motion.form
              key="email-form"
              className="bg-gray-800 bg-opacity-70 backdrop-blur-md p-6 rounded-3xl flex gap-2 align-middle items-center transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onSubmit={handleSubmit}
            >
              <Input
                fullWidth
                color="warning"
                placeholder="cosmic.traveler@galaxy.universe"
                value={email}
                onChange={handleEmailChange}
                className="text-orange-100 placeholder-orange-300"
                classNames={{
                  inputWrapper: `bg-gray-700 bg-opacity-50 border border-orange-400 rounded-full py-1 transition-all duration-300
                    min-w-[200px] sm:min-w-[300px] md:min-w-[400px] lg:min-w-[500px]`, // Adjusts based on screen size
                  input: "text-orange-100",
                }}
              />
              <Button
                auto
                type="submit"
                size="md"
                className={`w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold rounded-full 
                transition-all duration-300 transform hover:scale-105`}
                disabled={!isValid}
              >
                Join
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
      <div className="absolute bottom-8 flex justify-center space-x-4 w-full">
        <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer">
          <GithubIcon className="text-2xl text-white hover:text-orange-500 transition-colors" />
        </a>
        <a href="https://twitter.com/your-twitter" target="_blank" rel="noopener noreferrer">
          <TwitterIcon className="text-2xl text-white hover:text-orange-500 transition-colors" />
        </a>
        <a href="https://t.me/your-telegram" target="_blank" rel="noopener noreferrer">
          <IconBrandTelegram className="text-2xl text-white hover:text-orange-500 transition-colors" />
        </a>
      </div>
    </div>
  );
};

export default SpaceshipEmailCapture;