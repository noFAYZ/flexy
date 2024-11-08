"use client";

import React, { useState, useCallback } from 'react';
import { 
  Card,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Chip,
  Switch,
  Tabs,
  Tab,
  RadioGroup,
  Radio,
  Progress,
  Tooltip,
  Avatar,
  Checkbox
} from '@nextui-org/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase,
  Globe,
  Tag,
  Calendar,
  Users,
  Plus,
  Sparkles,
  Clock,
  Wallet,
  Shield,
  Target,
  Award,
  GitBranch,
  Code,
  FileCheck,
  Rocket,
  MessageSquare,
  Lock,
  Gem,
  Languages,
  Timer,
  CheckCircle,
  XCircle,
  AlertCircle,
  Hourglass,
  GraduationCap,
  FileText
} from 'lucide-react';
import { RangeSlider } from '@/components/RangeSlider';


const JobPostingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 1: Project Type
    projectType: 'fixed',
    paymentType: 'crypto',
    preferredCrypto: 'eth',
    budget: [1000, 5000],
    
    // Step 2: Project Details
    title: '',
    description: '',
    category: '',
    subcategory: '',
    files: [],
    skills: [],
    visibility: 'public',
    
    // Step 3: Requirements
    experienceLevel: 'intermediate',
    duration: [1, 6],
    availability: 'fulltime',
    timezone: [],
    languages: [],
    screeningQuestions: [],
    verification: {
      kycRequired: false,
      reputationScore: 0,
      minimumReviews: 0,
      completedProjects: 0
    },
    
    // Step 4: Payment & Terms
    milestones: [],
    paymentSchedule: 'milestone',
    contractType: 'standard',
    confidentiality: 'standard',
    
    isWorldwide: true
  });

  const handleUpdateFormData = useCallback((updates) => {
    setFormData(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  // Define all static data
  const categories = [
    {
      value: "blockchain",
      label: "Blockchain Development",
      subcategories: ["Smart Contracts", "DeFi", "NFT", "Web3"]
    },
    {
      value: "development",
      label: "Software Development",
      subcategories: ["Frontend", "Backend", "Mobile", "Full Stack"]
    },
    {
      value: "design",
      label: "Design",
      subcategories: ["UI/UX", "Graphic Design", "Brand Design", "3D"]
    },
    {
      value: "marketing",
      label: "Marketing",
      subcategories: ["Content", "SEO", "Social Media", "Analytics"]
    }
  ];

  const experienceLevels = [
    {
      value: 'entry',
      label: 'Entry Level',
      icon: GraduationCap,
      description: 'New to the field, learning fundamentals'
    },
    {
      value: 'intermediate',
      label: 'Intermediate',
      icon: Briefcase,
      description: '2-5 years of experience'
    },
    {
      value: 'expert',
      label: 'Expert',
      icon: Award,
      description: '5+ years, deep domain knowledge'
    }
  ];

  const availabilityOptions = [
    {
      value: 'fulltime',
      label: 'Full Time',
      hours: '40+ hrs/week',
      icon: Clock
    },
    {
      value: 'parttime',
      label: 'Part Time',
      hours: '20-30 hrs/week',
      icon: Hourglass
    },
    {
      value: 'flexible',
      label: 'Flexible',
      hours: 'As needed',
      icon: Calendar
    }
  ];

  const renderCurrentStep = () => {
    switch(currentStep) {
      case 0:
        return (
          <ProjectTypeStep 
            formData={formData} 
            onUpdate={handleUpdateFormData} 
          />
        );
      case 1:
        return (
          <ProjectDetailsStep
            formData={formData}
            onUpdate={handleUpdateFormData}
            categories={categories}
          />
        );
      case 2:
        return (
          <RequirementsStep
            formData={formData}
            onUpdate={handleUpdateFormData}
            experienceLevels={experienceLevels}
            availabilityOptions={availabilityOptions}
          />
        );
      case 3:
        return (
          <ReviewStep
            formData={formData}
            categories={categories}
            experienceLevels={experienceLevels}
            availabilityOptions={availabilityOptions}
          />
        );
      default:
        return null;
    }
  };

  const steps = ['Project Type', 'Details', 'Requirements', 'Review'];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Handle form submission
      console.log('Submit form:', formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Progress Header */}
      <div className="mb-8 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-orange-600 bg-clip-text text-transparent">
            Create Your Project
          </h1>
          <Chip
            variant="flat"
            className="bg-orange-100 text-orange-600"
          >
            Draft
          </Chip>
        </div>
        <Progress 
          value={(currentStep + 1) * 25} 
          className="h-2"
          classNames={{
            indicator: "bg-gradient-to-r from-pink-500 to-orange-600"
          }}
        />
        <div className="flex justify-between text-sm text-default-500">
          {steps.map((step, index) => (
            <span 
              key={step}
              className={currentStep >= index ? 'text-pink-500' : ''}
            >
              {step}
            </span>
          ))}
        </div>
      </div>

      {/* Current Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          {renderCurrentStep()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-8 flex justify-end gap-4">
        {currentStep > 0 && (
          <Button
            variant="flat"
            onClick={handleBack}
          >
            Back
          </Button>
        )}
        <Button
          className="bg-gradient-to-r from-pink-500 to-orange-600 text-white"
          endContent={currentStep === steps.length - 1 ? <Rocket className="w-4 h-4" /> : null}
          onClick={handleNext}
        >
          {currentStep === steps.length - 1 ? 'Post Project' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};

const ProjectTypeStep = ({ formData, onUpdate }) => {
    const projectTypes = [
      {
        value: 'fixed',
        title: 'Fixed Project',
        description: 'One-time project with a set scope and timeline',
        icon: Target,
        features: ['Clear deliverables', 'Set timeline', 'Fixed budget']
      },
      {
        value: 'ongoing',
        title: 'Ongoing Collaboration',
        description: 'Long-term work with flexible scope',
        icon: GitBranch,
        features: ['Flexible scope', 'Hourly/monthly rate', 'Continuous work']
      },
      {
        value: 'contest',
        title: 'Design Contest',
        description: 'Multiple submissions, one winner',
        icon: Award,
        features: ['Multiple submissions', 'Fixed prize', 'Time-limited']
      }
    ];
  
    return (
      <>
        {/* Project Type Selection */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Choose Project Type</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {projectTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => onUpdate({ projectType: type.value })}
                className={`p-6 rounded-xl border-2 text-left transition-all ${
                  formData.projectType === type.value
                    ? 'border-orange-500 bg-primary/5'
                    : 'border-default-200 hover:border-orange-500'
                }`}
              >
                <type.icon className={`w-8 h-8 mb-3 ${
                  formData.projectType === type.value
                    ? 'text-orange-500'
                    : 'text-default-500'
                }`} />
                <h3 className="font-semibold mb-2">{type.title}</h3>
                <p className="text-sm text-default-500 mb-4">{type.description}</p>
                <div className="space-y-2">
                  {type.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-xs text-default-500">
                      <CheckCircle className="w-3 h-3 mr-2 text-orange-500" />
                      {feature}
                    </div>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </Card>
  
        {/* Budget Range */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-orange-500" />
            Budget Range
          </h3>
          <div className="space-y-6">
          <RangeSlider
            min={100}
            max={10000}
            step={100}
            value={formData.budget}
            onChange={(value) => {
              if (Array.isArray(value) && value.length === 2) {
                onUpdate({ budget: value });
              }
            }}
            />
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-lg bg-default-50">
                <div className="text-sm text-default-600 mb-1">Estimated Cost</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-default-500">Project Budget</span>
                    <span>${formData.budget[1]}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-default-500">Service Fee (5%)</span>
                    <span>${Math.round(formData.budget[1] * 0.05)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-default-500">Gas Fee (est.)</span>
                    <span>~$30</span>
                  </div>
                  <div className="border-t border-default-200 mt-2 pt-2 flex justify-between font-medium">
                    <span>Total</span>
                    <span>${Math.round(formData.budget[1] * 1.05 + 30)}</span>
                  </div>
                </div>
              </div>
  
              <div className="p-4 rounded-lg bg-primary/10">
                <div className="text-sm text-orange-600 mb-1">Payment Protection</div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-xs text-default-600">
                    <Shield className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    Funds held in secure smart contract escrow
                  </div>
                  <div className="flex items-start gap-2 text-xs text-default-600">
                    <Lock className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    Released only upon work completion
                  </div>
                  <div className="flex items-start gap-2 text-xs text-default-600">
                    <FileCheck className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    Automated milestone payments
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
  
        {/* Payment Setup */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Gem className="w-5 h-5 text-orange-500" />
            Payment Method
          </h3>
          
          <Tabs 
            selectedKey={formData.paymentType}
            onSelectionChange={(key) => onUpdate({ paymentType: key.toString() })} // Ensure key is string
            >
            <Tab
              key="crypto"
              title={
                <div className="flex items-center gap-2">
                  <Gem className="w-4 h-4" />
                  Cryptocurrency
                </div>
              }
            >
              <div className="p-4">
                <RadioGroup
                  value={formData.preferredCrypto}
                  onValueChange={(value) => onUpdate({ preferredCrypto: value })}
                >
                  <Radio value="eth" className="mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-sm">Ξ</span>
                      </div>
                      <span>Ethereum (ETH)</span>
                    </div>
                  </Radio>
                  <Radio value="usdc" className="mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-sm">$</span>
                      </div>
                      <span>USDC</span>
                    </div>
                  </Radio>
                  <Radio value="usdt">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-sm">$</span>
                      </div>
                      <span>USDT</span>
                    </div>
                  </Radio>
                </RadioGroup>
                <div className="mt-4 p-3 rounded-lg bg-default-50 text-xs text-default-500">
                  Payments will be held in a secure smart contract escrow and released based on completed milestones
                </div>
              </div>
            </Tab>
            <Tab
              key="fiat"
              title={
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4" />
                  Fiat Currency
                </div>
              }
            >
              <div className="p-4">
                <RadioGroup
                  value={formData.preferredFiat}
                  onValueChange={(value) => onUpdate({ preferredFiat: value })}
                >
                  <Radio value="usd" className="mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-sm">$</span>
                      </div>
                      <span>USD</span>
                    </div>
                  </Radio>
                  <Radio value="eur">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-sm">€</span>
                      </div>
                      <span>EUR</span>
                    </div>
                  </Radio>
                </RadioGroup>
                <div className="mt-4 p-3 rounded-lg bg-default-50 text-xs text-default-500">
                  Fiat payments are processed through our secure payment provider and held in traditional escrow
                </div>
              </div>
            </Tab>
          </Tabs>
        </Card>
      </>
    );
  };

  const ProjectDetailsStep = ({ formData, onUpdate, categories }) => {
    const [currentSkill, setCurrentSkill] = useState('');
  
    const handleAddSkill = (e) => {
      e.preventDefault();
      if (currentSkill && !formData.skills.includes(currentSkill)) {
        onUpdate({ skills: [...formData.skills, currentSkill] });
        setCurrentSkill('');
      }
    };
  
    const handleRemoveSkill = (skillToRemove) => {
      onUpdate({ 
        skills: formData.skills.filter(skill => skill !== skillToRemove) 
      });
    };
  
    return (
      <>
        {/* Basic Info */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-pink-500" />
            Project Details
          </h2>
  
          <div className="space-y-6">
            <Input
              label="Project Title"
              placeholder="e.g., NFT Marketplace Development"
              value={formData.title}
              onChange={(e) => onUpdate({ title: e.target.value })}
              variant="bordered"
              classNames={{
                input: "bg-transparent",
                inputWrapper: "bg-default-100/50 hover:bg-default-200/50 transition-colors"
              }}
            />
  
            <Textarea
              label="Project Description"
              placeholder="Describe your project requirements, goals, and expectations..."
              value={formData.description}
              onChange={(e) => onUpdate({ description: e.target.value })}
              minRows={4}
              variant="bordered"
              classNames={{
                input: "bg-transparent",
                inputWrapper: "bg-default-100/50 hover:bg-default-200/50 transition-colors"
              }}
            />
  
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Category"
                placeholder="Select project category"
                value={formData.category}
                onChange={(e) => onUpdate({ 
                  category: e.target.value,
                  subcategory: ''
                })}
                variant="bordered"
                classNames={{
                  trigger: "bg-default-100/50 hover:bg-default-200/50 transition-colors"
                }}
              >
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </Select>
  
              <Select
                label="Subcategory"
                placeholder="Select subcategory"
                value={formData.subcategory}
                onChange={(e) => onUpdate({ subcategory: e.target.value })}
                isDisabled={!formData.category}
                variant="bordered"
                classNames={{
                  trigger: "bg-default-100/50 hover:bg-default-200/50 transition-colors"
                }}
              >
                {formData.category && categories
                  .find(cat => cat.value === formData.category)
                  ?.subcategories.map((sub) => (
                    <SelectItem key={sub} value={sub}>
                      {sub}
                    </SelectItem>
                  ))}
              </Select>
            </div>
          </div>
        </Card>
  
        {/* Skills */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Code className="w-5 h-5 text-pink-500" />
            Required Skills
          </h3>
  
          <div className="space-y-4">
            <form onSubmit={handleAddSkill} className="flex gap-2">
              <Input
                placeholder="Add a required skill..."
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                variant="bordered"
                classNames={{
                  input: "bg-transparent",
                  inputWrapper: "bg-default-100/50 hover:bg-default-200/50 transition-colors"
                }}
              />
              <Button
                isIconOnly
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-orange-600 text-white"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </form>
  
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {formData.skills.map((skill) => (
                  <motion.div
                    key={skill}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <Chip
                      onClose={() => handleRemoveSkill(skill)}
                      variant="flat"
                      className="bg-default-100"
                    >
                      {skill}
                    </Chip>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </Card>
  
        {/* Project Visibility */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-pink-500" />
            Project Visibility
          </h3>
  
          <RadioGroup
            value={formData.visibility}
            onValueChange={(value) => onUpdate({ visibility: value })}
            className="gap-4"
          >
            <Radio value="public" className="p-4 border rounded-lg w-full">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Public Project</span>
                <span className="text-xs text-default-500">
                  Visible to all freelancers, receive multiple proposals
                </span>
              </div>
            </Radio>
            <Radio value="private" className="p-4 border rounded-lg w-full">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Private Project</span>
                <span className="text-xs text-default-500">
                  Invite specific freelancers only
                </span>
              </div>
            </Radio>
          </RadioGroup>
        </Card>
      </>
    );
  };

  const RequirementsStep = ({ formData, onUpdate, experienceLevels, availabilityOptions }) => {
    const [question, setQuestion] = useState('');
  
    const handleAddQuestion = (e) => {
      e.preventDefault();
      if (question.trim()) {
        onUpdate({
          screeningQuestions: [...formData.screeningQuestions, question]
        });
        setQuestion('');
      }
    };
  
    const handleRemoveQuestion = (indexToRemove) => {
      onUpdate({
        screeningQuestions: formData.screeningQuestions.filter((_, i) => i !== indexToRemove)
      });
    };
  
    return (
      <>
        {/* Experience Level */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-pink-500" />
            Experience Level
          </h2>
  
          <div className="grid md:grid-cols-3 gap-4">
            {experienceLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => onUpdate({ experienceLevel: level.value })}
                className={`p-6 rounded-xl border-2 text-left transition-all ${
                  formData.experienceLevel === level.value
                    ? 'border-pink-500 bg-pink-50/50'
                    : 'border-default-200 hover:border-orange-500'
                }`}
              >
                <level.icon className={`w-8 h-8 mb-3 ${
                  formData.experienceLevel === level.value
                    ? 'text-pink-500'
                    : 'text-default-500'
                }`} />
                <h3 className="font-semibold mb-2">{level.label}</h3>
                <p className="text-sm text-default-500">{level.description}</p>
              </button>
            ))}
          </div>
        </Card>
  
        {/* Availability */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-pink-500" />
            Required Availability
          </h3>
  
          <div className="grid md:grid-cols-3 gap-4">
            {availabilityOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onUpdate({ availability: option.value })}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  formData.availability === option.value
                    ? 'border-pink-500 bg-pink-50/50'
                    : 'border-default-200 hover:border-orange-500'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <option.icon className={`w-5 h-5 ${
                    formData.availability === option.value
                      ? 'text-pink-500'
                      : 'text-default-500'
                  }`} />
                  <span className="font-medium">{option.label}</span>
                </div>
                <p className="text-sm text-default-500">{option.hours}</p>
              </button>
            ))}
          </div>
        </Card>
  
        {/* Verification Requirements */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-pink-500" />
            Verification Requirements
          </h3>
  
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-lg bg-default-100/50">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-default-500" />
                <div>
                  <p className="text-sm font-medium">KYC Verification</p>
                  <p className="text-xs text-default-500">
                    Require freelancers to be KYC verified
                  </p>
                </div>
              </div>
              <Switch
                isSelected={formData.verification.kycRequired}
                onValueChange={(value) => 
                  onUpdate({ 
                    verification: { 
                      ...formData.verification, 
                      kycRequired: value 
                    } 
                  })
                }
                classNames={{
                  wrapper: "group-data-[selected=true]:bg-gradient-to-r from-pink-500 to-orange-600"
                }}
              />
            </div>
  
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">
                  Minimum Reputation Score
                </label>
                <RangeSlider
                  min={0}
                  max={100}
                  value={[formData.verification.reputationScore]}
                  onChange={(value) => {
                    if (Array.isArray(value) && value.length === 1) {
                      onUpdate({ 
                        verification: { 
                          ...formData.verification, 
                          reputationScore: value[0] 
                        } 
                      });
                    }
                  }}
                  formatLabel={(value) => `${value}%`}
                />
              </div>
  
              <div>
                <label className="text-sm font-medium">
                  Minimum Completed Projects
                </label>
                <Select
                  value={formData.verification.completedProjects.toString()}
                  onChange={(e) => 
                    onUpdate({ 
                      verification: { 
                        ...formData.verification, 
                        completedProjects: parseInt(e.target.value) 
                      } 
                    })
                  }
                  variant="bordered"
                  classNames={{
                    trigger: "bg-default-100/50 hover:bg-default-200/50 transition-colors"
                  }}
                >
                  {[0, 1, 2, 5, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 0 ? 'projects' : 'or more projects'}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </Card>
  
        {/* Screening Questions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-pink-500" />
            Screening Questions
          </h3>
  
          <div className="space-y-4">
            <form onSubmit={handleAddQuestion} className="flex gap-2">
              <Input
                placeholder="Add a screening question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                variant="bordered"
                classNames={{
                  input: "bg-transparent",
                  inputWrapper: "bg-default-100/50 hover:bg-default-200/50 transition-colors"
                }}
              />
              <Button
                isIconOnly
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-orange-600 text-white"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </form>
  
            <div className="space-y-2">
              <AnimatePresence>
                {formData.screeningQuestions.map((q, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-default-50"
                  >
                    <span className="text-sm">{q}</span>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onClick={() => handleRemoveQuestion(index)}
                    >
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </Card>
      </>
    );
  };

  const ReviewStep = ({ formData, categories, experienceLevels, availabilityOptions }) => {
    const getCategory = () => {
      const category = categories.find(c => c.value === formData.category);
      return category ? `${category.label} - ${formData.subcategory}` : '';
    };
  
    const getExperienceLevel = () => {
      const level = experienceLevels.find(l => l.value === formData.experienceLevel);
      return level ? level.label : '';
    };
  
    const getAvailability = () => {
      const option = availabilityOptions.find(o => o.value === formData.availability);
      return option ? `${option.label} (${option.hours})` : '';
    };
  
    const ReviewSection = ({ title, icon: Icon, children }) => (
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b">
          <Icon className="w-5 h-5 text-pink-500" />
          <h3 className="font-medium">{title}</h3>
        </div>
        {children}
      </div>
    );
  
    const ReviewItem = ({ label, value, className = "" }) => (
      <div className="flex justify-between items-start py-2">
        <span className="text-sm text-default-500">{label}</span>
        <span className={`text-sm text-right ${className}`}>{value}</span>
      </div>
    );
  
    return (
      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-pink-500" />
            Review Project Details
          </h2>
  
          <div className="grid md:grid-cols-2 gap-8">
            {/* Basic Information */}
            <ReviewSection title="Project Information" icon={FileCheck}>
              <div className="space-y-3">
                <ReviewItem 
                  label="Project Type"
                  value={formData.projectType.charAt(0).toUpperCase() + formData.projectType.slice(1)}
                />
                <ReviewItem 
                  label="Title"
                  value={formData.title}
                  className="font-medium text-default-900"
                />
                <ReviewItem 
                  label="Category"
                  value={getCategory()}
                />
                <ReviewItem 
                  label="Visibility"
                  value={formData.visibility === 'public' ? 'Public Project' : 'Private Project'}
                />
              </div>
            </ReviewSection>
  
            {/* Budget & Payment */}
            <ReviewSection title="Budget & Payment" icon={Wallet}>
              <div className="space-y-3">
                <ReviewItem 
                  label="Budget Range"
                  value={`$${formData.budget[0]} - $${formData.budget[1]}`}
                  className="font-medium text-success-600"
                />
                <ReviewItem 
                  label="Payment Method"
                  value={
                    formData.paymentType === 'crypto' 
                      ? `Cryptocurrency (${formData.preferredCrypto.toUpperCase()})` 
                      : `Fiat (${formData.preferredFiat.toUpperCase()})`
                  }
                />
                <ReviewItem 
                  label="Service Fee"
                  value={`$${Math.round(formData.budget[1] * 0.05)}`}
                  className="text-default-400"
                />
              </div>
            </ReviewSection>
  
            {/* Requirements */}
            <ReviewSection title="Project Requirements" icon={Target}>
              <div className="space-y-3">
                <ReviewItem 
                  label="Experience Level"
                  value={getExperienceLevel()}
                />
                <ReviewItem 
                  label="Availability"
                  value={getAvailability()}
                />
                <div className="py-2">
                  <span className="text-sm text-default-500 block mb-2">Required Skills</span>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
                      <Chip 
                        key={skill}
                        size="sm"
                        variant="flat"
                        className="bg-pink-100 text-pink-600"
                      >
                        {skill}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>
            </ReviewSection>
  
            {/* Verification Requirements */}
            <ReviewSection title="Verification Requirements" icon={Shield}>
              <div className="space-y-3">
                <ReviewItem 
                  label="KYC Required"
                  value={formData.verification.kycRequired ? (
                    <span className="text-success-500 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Required
                    </span>
                  ) : (
                    <span className="text-default-400">Not Required</span>
                  )}
                />
                <ReviewItem 
                  label="Minimum Reputation"
                  value={`${formData.verification.reputationScore}%`}
                />
                <ReviewItem 
                  label="Completed Projects"
                  value={`${formData.verification.completedProjects} minimum`}
                />
              </div>
            </ReviewSection>
          </div>
  
          {/* Project Description */}
          <div className="mt-8">
            <ReviewSection title="Project Description" icon={FileText}>
              <div className="mt-2 p-4 rounded-lg bg-default-50">
                <p className="text-sm whitespace-pre-wrap">
                  {formData.description || "No description provided"}
                </p>
              </div>
            </ReviewSection>
          </div>
  
          {/* Screening Questions */}
          {formData.screeningQuestions.length > 0 && (
            <div className="mt-8">
              <ReviewSection title="Screening Questions" icon={MessageSquare}>
                <div className="space-y-2">
                  {formData.screeningQuestions.map((question, index) => (
                    <div 
                      key={index}
                      className="p-3 rounded-lg bg-default-50 text-sm"
                    >
                      {question}
                    </div>
                  ))}
                </div>
              </ReviewSection>
            </div>
          )}
        </Card>
  
        {/* Terms and Conditions */}
        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Shield className="w-5 h-5 text-pink-500" />
              Terms and Conditions
            </h3>
            
            <div className="space-y-3">
              <Checkbox defaultSelected isRequired>
                <span className="text-sm">
                  I agree to the platform's terms of service and project posting guidelines
                </span>
              </Checkbox>
              
              <Checkbox defaultSelected isRequired>
                <span className="text-sm">
                  I understand that all payments will be handled through smart contract escrow
                </span>
              </Checkbox>
              
              <Checkbox defaultSelected isRequired>
                <span className="text-sm">
                  I confirm that I have the authority to post this project
                </span>
              </Checkbox>
            </div>
          </div>
        </Card>
  
        {/* Estimated Timeline */}
        <Card className="p-6 bg-gradient-to-r from-pink-500/10 to-orange-600/10">
          <div className="flex items-start gap-4">
            <Rocket className="w-6 h-6 text-pink-500 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">Ready to Launch</h3>
              <p className="text-sm text-default-600">
                Your project will be reviewed and posted within 24 hours. You'll be notified when freelancers start submitting proposals.
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  };

export default JobPostingPage;