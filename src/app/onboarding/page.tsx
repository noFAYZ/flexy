"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardBody, Input, Button, Chip, Badge, Progress } from "@nextui-org/react";
import { EyeIcon, EyeOffIcon, CodeIcon, PaletteIcon, PenToolIcon, CameraIcon, BriefcaseIcon, BuildingIcon, ShoppingBagIcon, HeartPulseIcon, MusicIcon, TruckIcon, CoffeeIcon, BarChartIcon, GlobeIcon, VideoIcon, BookIcon, Users, Rocket, CheckCircle, Check, ArrowLeft, ArrowRight, User, Mail, Lock, Star, Building, Briefcase, Music, Code, Palette, PenTool, Camera } from 'lucide-react';
import Image from 'next/image';
import { HeroiconsBriefcaseSolid, IconParkTwotoneUserBusiness, MingcuteUser3Fill } from '@/components/icons/icons';
import Loader from '@/components/Loader2';
import { IconMicrophone2 } from '@tabler/icons-react';
import CreativeProgressBar from '@/components/progressbar';
import { useTheme } from 'next-themes';



const OnboardingPage = () => {
  const {theme} = useTheme();
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    skills: '',
    company: ''
  });
  const [currentInput, setCurrentInput] = useState(0);

  const totalSteps = 4; // Increased to include the verification step

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    moveToNextStep();
  };

  const handleCategorySelect = (selectedCategories) => {
    setCategories(selectedCategories);
    moveToNextStep();
  };

  const moveToNextStep = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (step === 2 && currentInput < inputs.length - 1) {
        const currentInputData = formData[inputs[currentInput].key];
        const error = validateInput(inputs[currentInput].key, currentInputData);
        if (error) {
          setIsLoading(false);
          return;
        }
        setCurrentInput(currentInput + 1);
      } else if (step < totalSteps - 1) {
        if (step === 1 && categories.length === 0) {
          setIsLoading(false);
          return;
        }
        setStep(prevStep => prevStep + 1);
        setCurrentInput(0);
      }
      setIsLoading(false);
    }, 1000);
  };

  const validateInput = (key, value) => {
    switch (key) {
      case 'fullName':
        return value.trim().length > 0 ? '' : 'Name is required';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address';
      case 'skills':
        return value.trim().length > 0 ? '' : 'Please enter at least one skill';
      case 'company':
        return value.trim().length > 0 ? '' : 'Company name is required';
      default:
        return '';
    }
  };

  const handleBack = () => {
    if (step > 0 || currentInput > 0) {
      setIsLoading(true);
      setTimeout(() => {
        if (step === 2 && currentInput > 0) {
          setCurrentInput(currentInput - 1);
        } else if (step > 0) {
          setStep(prevStep => prevStep - 1);
          setCurrentInput(0);
        }
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleFormSubmit = () => {
    console.log('Form submitted:', { userType, categories, ...formData });
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Handle form submission here
    }, 2000);
  };

  const inputs = [
    { key: 'fullName', label: 'What\'s your name?', icon: User, placeholder: 'John Doe' },
    { key: 'email', label: 'What\'s your email?', icon: Mail, placeholder: 'john@example.com' },
    ...(userType === 'freelancer' 
      ? [{ key: 'skills', label: 'What are your top skills?', icon: CodeIcon, placeholder: 'e.g. Web Development, Design' }]
      : [{ key: 'company', label: 'What\'s your company name?', icon: Briefcase, placeholder: 'Acme Inc.' }]
    ),
  ];

  const handleInputChange = (value) => {
    setFormData(prev => ({ ...prev, [inputs[currentInput].key]: value }));
  };

  const getCurrentStep = () => {
    if (step === 2) {
      return step + (currentInput / inputs.length);
    } else if (step === 3) {
      return totalSteps - 1;
    }
    return step;
  };

  return (
    <div className={`flex flex-col justify-center items-center min-h-screen p-4 ${theme !='dark' ? 'bg-card' : '' } ` }>
      <CreativeProgressBar currentStep={getCurrentStep()} totalSteps={totalSteps} />
      {isLoading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <Loader />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center items-center flex-grow relative w-full max-w-4xl"
        >
          {step === 0 && (
            <UserTypeSelection onSelect={handleUserTypeSelect} selectedType={userType} />
          )}
          {step === 1 && (
            <CategorySelection userType={userType} onSelect={handleCategorySelect} categories={categories} setCategories={setCategories} />
          )}
          {step === 2 && (
            <OnboardingForm 
              userType={userType} 
              formData={formData} 
              setFormData={setFormData} 
              currentInput={currentInput}
              inputs={inputs}
              handleInputChange={handleInputChange}
            />
          )}
          {step === 3 && (
            <VerificationStep 
              userType={userType}
              categories={categories}
              formData={formData}
            />
          )}
        </motion.div>
      )}
   
      <motion.div 
        className="flex justify-between mt-8 px-4 w-full max-w-4xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {!isLoading && ( <>
          {(step > 0 || currentInput > 0) && (
            <Button onClick={handleBack} className="bg-transparent ">
              <ArrowLeft className="mr-2" /> Back
            </Button>
          )}
          {step < totalSteps - 1 || (step === 2 && currentInput < inputs.length - 1) ? (
            <Button onClick={moveToNextStep} className="bg-gradient-to-br from-orange-500 to-pink-500 text-white ml-auto rounded-3xl">
              Next <ArrowRight className="ml-2" />
            </Button>
          ) : (
            <Button onClick={handleFormSubmit} className="bg-gradient-to-r from-orange-500 to-pink-500 text-white ml-auto rounded-3xl">
              Submit <CheckCircle className="ml-2" />
            </Button>
          )}
        </>)}
      </motion.div>
    </div>
  );
};

// ... (UserTypeSelection, CategorySelection, and OnboardingForm components remain the same)

const VerificationStep = ({ userType, categories, formData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto"
    >
      <h2 className="text-3xl font-bold  text-center mb-6">Verify Your Information</h2>
      <Card className="bg-muted  p-6 rounded-3xl">
        <CardBody>
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p className="text-lg mb-4">
              You are registering as a 
              <span className="font-semibold mx-2 bg-gradient-to-br px-2 py-1 rounded-lg from-orange-500 to-pink-500 capitalize text-white">{userType}</span> 
              with expertise in:
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category, index) => (
                <Chip 
                  key={index}
                  className="bg-gradient-to-br from-orange-500 to-pink-500 text-white"
                >
                  {category}
                </Chip>
              ))}
            </div>
          </motion.div>

          <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
          {Object.entries(formData).map(([key, value], index) => (
            <motion.div 
              key={key} 
              className="mb-3 bg-card/90 shadow-sm p-3 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            >
              <span className="font-semibold capitalize text-orange-500">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
              <span className="font-semibold">{value}</span>
            </motion.div>
          ))}
        </CardBody>
      </Card>
      <motion.p 
        className=" text-center mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Please review your information carefully. If everything is correct, click "Submit" to complete your registration.
      </motion.p>
    </motion.div>
  );
};

  
  const UserTypeSelection = ({ onSelect, selectedType }) => {
    const [hoveredType, setHoveredType] = useState(null);
  
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center   w-full p-4 "
      >
       
          
        <h2 className="text-4xl font-bold  text-center mb-8">I am a...</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 w-full max-w-4xl">
          <UserTypeCard
            title="Freelancer"
            icon={<MingcuteUser3Fill width={60} height={60} />}
            hoverIcon={<Rocket size={60} />}
            onClick={() => onSelect('freelancer')}
            isSelected={selectedType === 'freelancer'}
            onHover={() => setHoveredType('freelancer')}
            examples={[<Code key="1" />, <Palette key="2" />, <PenTool key="3" />, <Camera key="4" />]}
          />
          <UserTypeCard
            title="Client"
            icon={<IconParkTwotoneUserBusiness width={60} height={60} />}
            hoverIcon={<HeroiconsBriefcaseSolid height={60} width={60} />}
            onClick={() => onSelect('client')}
            isSelected={selectedType === 'client'}
            onHover={() => setHoveredType('client')}
            examples={[<Users key="1" />, <HeroiconsBriefcaseSolid  key="2" />, <Music key="3" />, <Code key="4" />]}
          />
        </div>
        <AnimatePresence>
          {hoveredType && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-12 text-center "
            >
              <p className="text-xl mb-4">
                {hoveredType === 'freelancer' 
                  ? "Showcase your skills and find exciting projects" 
                  : "Find talented professionals for your projects"}
              </p>
              <p className="text-sm opacity-70">
                {hoveredType === 'freelancer'
                  ? "As a freelancer, you'll have access to a wide range of projects and clients."
                  : "As a client, you'll be able to post projects and connect with skilled freelancers."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };
  
  const UserTypeCard = ({ title, icon, hoverIcon, onClick, isSelected, onHover, examples }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    const handleHoverStart = () => {
      setIsHovered(true);
      onHover();
    };
  
    const handleHoverEnd = () => {
      setIsHovered(false);
    };
  
    return (
      <motion.div
        className="relative cursor-pointer "
        onClick={onClick}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Card className={`w-64 h-80 bg-gradient-to-tr from-orange-500 to-pink-500 hover:from-orange-500 hover:to-pink-600 shadow-lg transition-all duration-300 rounded-[2.5rem] ${isSelected ? 'ring-4 ring-white' : ''}`}>
          <CardBody className="flex flex-col items-center justify-center p-6">
            <motion.div
              className="text-white mb-6"
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {isHovered ? hoverIcon : icon}
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
            <motion.div 
              className="flex justify-center items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {examples.map((example, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="text-white opacity-70"
                >
                  {example}
                </motion.div>
              ))}
            </motion.div>
          </CardBody>
        </Card>
        <AnimatePresence>
          {isSelected && (
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-blue-600 px-4 py-1 rounded-full shadow-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              Selected
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };
  
  const CategorySelection = ({ userType, onSelect, categories, setCategories }) => {
    const categoryList = userType === 'freelancer'
      ? [
          { name: 'Development', icon: <CodeIcon />, color: 'from-blue-500 to-indigo-500' },
          { name: 'Design', icon: <PaletteIcon />, color: 'from-pink-500 to-purple-500' },
          { name: 'Writing', icon: <PenToolIcon />, color: 'from-yellow-500 to-orange-500' },
          { name: 'Photography', icon: <CameraIcon />, color: 'from-green-500 to-teal-500' },
          { name: 'Music', icon: <MusicIcon />, color: 'from-red-500 to-pink-500' },
          { name: 'Video Production', icon: <VideoIcon />, color: 'from-purple-500 to-indigo-500' },
          { name: 'Voice Acting', icon: <IconMicrophone2 />, color: 'from-yellow-400 to-orange-400' },
          { name: 'Translation', icon: <GlobeIcon />, color: 'from-blue-400 to-green-400' },
        ]
      : [
          { name: 'Technology', icon: <CodeIcon />, color: 'from-blue-500 to-indigo-500' },
          { name: 'Marketing', icon: <ShoppingBagIcon />, color: 'from-pink-500 to-purple-500' },
          { name: 'Business', icon: <HeroiconsBriefcaseSolid />, color: 'from-yellow-500 to-orange-500' },
          { name: 'Healthcare', icon: <HeartPulseIcon />, color: 'from-green-500 to-teal-500' },
          { name: 'Education', icon: <BookIcon />, color: 'from-blue-400 to-cyan-400' },
          { name: 'Logistics', icon: <TruckIcon />, color: 'from-orange-400 to-red-400' },
          { name: 'Hospitality', icon: <CoffeeIcon />, color: 'from-yellow-400 to-orange-400' },
          { name: 'Finance', icon: <BarChartIcon />, color: 'from-green-400 to-teal-400' },
        ];
        const {theme} = useTheme();
    const toggleCategory = (categoryName) => {
      setCategories(prev => {
        if (prev.includes(categoryName)) {
          return prev.filter(cat => cat !== categoryName);
        } else if (prev.length < 2) {
          return [...prev, categoryName];
        } else {
          return prev;
        }
      });
    };
  
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center rounded-[3.5rem] p-10"
      >
        <h2 className="text-3xl font-bold text-foreground text-center mb-6">Choose Your Categories</h2>
        <p className="text-foreground text-center mb-6">Select up to 2 categories that interest you</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
          {categoryList.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.name}
              icon={category.icon}
              onClick={() => toggleCategory(category.name)}
              bgColor={category.color}
              isSelected={categories.includes(category.name)}
              isDisabled={categories.length >= 2 && !categories.includes(category.name)}
            />
          ))}
        </div>
        {categories.length === 2 && (
          <p className="text-orange-500 mt-4">You've selected the maximum of 2 categories.</p>
        )}
      </motion.div>
    );
  };
  
  const CategoryCard = ({ title, icon, onClick, bgColor, isSelected, isDisabled }) => (
    
    <motion.div
      whileHover={{ scale: isDisabled ? 1 : 1.05 }}
      whileTap={{ scale: isDisabled ? 1 : 0.95 }}
      className={`cursor-pointer ${isDisabled ? 'opacity-50' : ''}`}
      onClick={isDisabled ? null : onClick}
    >
      <Badge content={<Check size={14}/>} className={`hidden ${isSelected ? "w-6 h-6 flex bg-white text-black" : ""}`}>
        <Card className={`w-28 h-36 bg-gradient-to-br from-orange-500 to-pink-500 transition-all duration-300 rounded-2xl overflow-hidden ${isSelected? 'ring-2 ring-white' : ''}
       
        `}>
          <CardBody className="flex flex-col items-center justify-center text-white p-2">
            <div className="text-3xl mb-2">{icon}</div>
            <h3 className="text-sm font-semibold text-center">{title}</h3>
          </CardBody>
        </Card>
      </Badge>
    </motion.div>
  );
  


  const OnboardingForm = ({ userType, formData, setFormData, currentInput, inputs, handleInputChange }) => {
    const [error, setError] = useState('');
  
    const validateInput = (key, value) => {
      switch (key) {
        case 'fullName':
          return value.trim().length > 0 ? '' : 'Name is required';
        case 'email':
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address';
        case 'skills':
          return value.trim().length > 0 ? '' : 'Please enter at least one skill';
        case 'company':
          return value.trim().length > 0 ? '' : 'Company name is required';
        default:
          return '';
      }
    };
  
    const handleChange = (e) => {
      const { value } = e.target;
      handleInputChange(value);
      setError(validateInput(inputs[currentInput].key, value));
    };
  
    const renderIcon = (Icon) => <Icon size={24} className="text-gray-400" />;
  
    return (
      <div className="w-full max-w-md mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center">{inputs[currentInput].label}</h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentInput}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Input
              value={formData[inputs[currentInput].key]}
              onChange={handleChange}
              placeholder={inputs[currentInput].placeholder}
              startContent={renderIcon(inputs[currentInput].icon)}
              size='lg'
              className="mb-4 "
              classNames={{
                input: '',
                inputWrapper: 'bg-gray-200 shadow backdrop-blur-2xl',
             
              }}
              isInvalid={!!error}
              errorMessage={error}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };
export default OnboardingPage;