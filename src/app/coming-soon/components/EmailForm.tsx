import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { GithubIcon, TwitterIcon } from '@/components/icons';
import { IconBrandTelegram } from '@tabler/icons-react';

const SpaceshipEmailCapture = () => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setShowModal(true);
      setShowForm(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEmail('');
  };

  const SocialIcon = ({ Icon, href, color }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`text-${color} hover:text-${color}-600 transition-colors duration-300`}>
      <Icon size={24} />
    </a>
  );

  return (
    <div className="relative w-full py-40 z-10 flex items-center justify-center">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AnimatePresence>
          {!showForm ? (
            <motion.div
              key="join-waitlist-button"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
            >
              <Button
                auto
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105"
                onClick={() => setShowForm(true)}
              >
                Get Early Access
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="email-form"
              className="bg-gray-800 bg-opacity-70 backdrop-blur-md p-6 rounded-3xl flex flex-col gap-4 items-center transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onSubmit={handleSubmit}
            >
              <h2 className="text-2xl font-bold text-orange-300 mb-2">Get Early Access</h2>
              <Input
                fullWidth
                color="warning"
                placeholder="cosmic.traveler@galaxy.universe"
                value={email}
                onChange={handleEmailChange}
                className="text-orange-100 placeholder-orange-300"
                classNames={{
                  inputWrapper: "bg-gray-700 bg-opacity-50 border border-orange-400 rounded-full py-1 transition-all duration-300 min-w-[300px]",
                  input: "text-orange-100",
                }}
              />
              <Button
                auto
                type="submit"
                size="lg"
                className={`w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold rounded-full 
                transition-all duration-300 transform hover:scale-105 ${!isValid && 'opacity-50 cursor-not-allowed'}`}
                disabled={!isValid}
              >
                Blast Off!
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      <Modal 
        isOpen={showModal} 
        onClose={closeModal}
        classNames={{
          base: "bg-gradient-to-br from-gray-900 to-black text-white",
          header: "border-b border-orange-500/20",
          body: "py-6",
          footer: "border-t border-orange-500/20"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
            
             
             
              <ModalBody>   <span className="text-3xl font-bold text-orange-500">🚀 Mission Accomplished!</span>
                <div className="space-y-4">
                  <p className="text-lg">You've successfully joined our cosmic crew! Prepare for an out-of-this-world experience.</p>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-orange-300 font-semibold mb-2">Your Cosmic Coordinates:</p>
                    <p className="text-white">{email}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-orange-300 font-semibold">Connect with fellow space travelers:</p>
                    <div className="flex justify-center space-x-6">
                      <SocialIcon Icon={TwitterIcon} href="https://twitter.com/cosmicwaitlist" color="blue-400" />
                      <SocialIcon Icon={GithubIcon} href="https://github.com/cosmicwaitlist" color="gray-400" />
                      <SocialIcon Icon={IconBrandTelegram} href="https://t.me/cosmicwaitlist" color="blue-300" />
                    </div>
                  </div>
                </div> 
                
                <Button color="warning" variant="solid" onPress={onClose}>
                  Return to Earth
                </Button>
              </ModalBody>
          
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SpaceshipEmailCapture;