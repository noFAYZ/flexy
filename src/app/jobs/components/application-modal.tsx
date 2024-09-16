import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, Checkbox, Card, CardBody, Radio, RadioGroup } from "@nextui-org/react";
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Briefcase, Calendar, Link, DollarSign, FileText, Clock, Target, Package, ChevronUp, ChevronDown } from 'lucide-react';


const CustomNumberInput = ({ label, icon, value, onChange, min = 0, max = Infinity, step = 1, ...props }) => {
    const increment = () => {
      onChange(Math.min(max, Number(value) + step));
    };
  
    const decrement = () => {
      onChange(Math.max(min, Number(value) - step));
    };
  
    return (
      <div className="relative w-full">
        <Input
          {...props}
          label={label}
          labelPlacement="outside"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type="number"
          min={min}
          max={max}
          step={step}
          className="w-full pr-16"
          startContent={
            <span className="text-orange-600 text-small">{icon}</span>
          }
          endContent={
            <div className="flex flex-col">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={increment}
                className="h-1/2 text-orange-600 hover:bg-orange-100"
              >
                <ChevronUp size={16} />
              </Button>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={decrement}
                className="h-1/2 text-orange-600 hover:bg-orange-100"
              >
                <ChevronDown size={16} />
              </Button>
            </div>
          }
        />
      </div>
    );
  };


  const ApplicationModal = ({ isOpen, onClose, job, onSubmit }) => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      experience: '',
      coverLetter: '',
      portfolioLink: '',
      paymentType: 'hourly',
      rate: '',
      estimatedHours: '',
      milestones: [{ description: '', amount: '' }],
      projectPrice: '',
      availableFrom: '',
      agreedToTerms: false
    });
  
    const updateFormData = (key, value) => {
      setFormData(prev => ({ ...prev, [key]: value }));
    };
  
    const isStepComplete = (stepIndex) => {
      switch (stepIndex) {
        case 0:
          return formData.name && formData.email && formData.phone;
        case 1:
          return formData.experience && formData.coverLetter;
        case 2:
          return formData.portfolioLink && formData.paymentType && 
                 ((formData.paymentType === 'hourly' && formData.rate && formData.estimatedHours) ||
                  (formData.paymentType === 'milestone' && formData.milestones.length > 0 && formData.milestones.every(m => m.description && m.amount)) ||
                  (formData.paymentType === 'project' && formData.projectPrice));
        case 3:
          return formData.availableFrom && formData.agreedToTerms;
        default:
          return false;
      }
    };
  
    const handleSubmit = () => {
      if (isStepComplete(3)) {
        onSubmit(formData);
        onClose();
      }
    };
  
    const steps = ["Personal Info", "Experience", "Proposal", "Review"];
  
    const StepIndicator = ({ currentStep, totalSteps }) => (
      <div className="flex justify-between items-center mb-8 relative">
        <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-200" />
        <motion.div 
          className="absolute top-6 left-0 h-0.5 bg-gradient-to-r from-pink-600 to-orange-500"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        {Array.from({ length: totalSteps }, (_, i) => (
          <div 
            key={i} 
            className="flex flex-col items-center cursor-pointer relative z-10"
            onClick={() => i <= currentStep && setStep(i)}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${i <= currentStep ? 'bg-gradient-to-r from-pink-600 to-orange-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {i + 1}
            </div>
            <div className={`text-xs mt-2 font-medium transition-all duration-200 ${i <= currentStep ? 'text-orange-600' : 'text-gray-400'}`}>
              {steps[i]}
            </div>
          </div>
        ))}
      </div>
    );
  
    const CustomInput = ({ label, icon, ...props }) => (
      <div className="relative w-full">
        <Input
          {...props}
          label={label}
          labelPlacement="outside"
          className="w-full"
          startContent={
            <span className="text-orange-600 text-small">{icon}</span>
          }
        />
      </div>
    );
  
    const slideAnimation = {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
      transition: { type: "spring", stiffness: 300, damping: 30 }
    };
  
    return (
      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        size="4xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-orange-500">
                  Apply for {job.title}
                </h2>
                <p className="text-sm text-gray-500">{job.client.name} • {job.location}</p>
              </ModalHeader>
              <ModalBody>
                <StepIndicator currentStep={step} totalSteps={steps.length} />
                <Card>
                  <CardBody>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        {...slideAnimation}
                        className="space-y-6"
                      >
                        {step === 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <CustomInput
                              label="Full Name"
                              placeholder="Enter your full name"
                              value={formData.name}
                              onChange={(e) => updateFormData('name', e.target.value)}
                              icon={<User className="text-orange-500" />}
                            />
                            <CustomInput
                              label="Email"
                              placeholder="Enter your email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => updateFormData('email', e.target.value)}
                              icon={<Mail className="text-orange-500" />}
                            />
                            <CustomInput
                              label="Phone"
                              placeholder="Enter your phone number"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => updateFormData('phone', e.target.value)}
                              icon={<Phone className="text-orange-500" />}
                            />
                          </div>
                        )}
                        {step === 1 && (
                          <div className="space-y-6">
                            <Textarea
                              label="Professional Experience"
                              placeholder="Describe your relevant experience..."
                              value={formData.experience}
                              onChange={(e) => updateFormData('experience', e.target.value)}
                              minRows={3}
                              startContent={<Briefcase className="text-orange-500 mt-2" />}
                            />
                            <Textarea
                              label="Cover Letter"
                              placeholder="Write a brief cover letter..."
                              value={formData.coverLetter}
                              onChange={(e) => updateFormData('coverLetter', e.target.value)}
                              minRows={4}
                              startContent={<FileText className="text-orange-500 mt-2" />}
                            />
                          </div>
                        )}
                        {step === 2 && (
                          <div className="space-y-6">
                            <CustomInput
                              label="Portfolio Link"
                              placeholder="Enter your portfolio URL"
                              value={formData.portfolioLink}
                              onChange={(e) => updateFormData('portfolioLink', e.target.value)}
                              icon={<Link className="text-orange-500" />}
                            />
                            <RadioGroup
                              label="Payment Type"
                              value={formData.paymentType}
                              onValueChange={(value) => updateFormData('paymentType', value)}
                              orientation="horizontal"
                            >
                              <Radio value="hourly">Hourly Rate</Radio>
                              <Radio value="milestone">Milestone-based</Radio>
                              <Radio value="project">Project-based</Radio>
                            </RadioGroup>
                            {formData.paymentType === 'hourly' && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <CustomNumberInput
                                  label="Hourly Rate ($)"
                                  placeholder="Enter your hourly rate"
                                  value={formData.rate}
                                  onChange={(value) => updateFormData('rate', value)}
                                  icon={<DollarSign className="text-orange-500" />}
                                  min={1}
                                  step={0.5}
                                />
                                <CustomNumberInput
                                  label="Estimated Hours"
                                  placeholder="Enter estimated hours"
                                  value={formData.estimatedHours}
                                  onChange={(value) => updateFormData('estimatedHours', value)}
                                  icon={<Clock className="text-orange-500" />}
                                  min={1}
                                />
                              </div>
                            )}
                            {formData.paymentType === 'milestone' && (
                              <div className="space-y-4">
                                {formData.milestones.map((milestone, index) => (
                                  <div key={index} className="flex space-x-2">
                                    <Input
                                      placeholder="Milestone description"
                                      value={milestone.description}
                                      onChange={(e) => {
                                        const newMilestones = [...formData.milestones];
                                        newMilestones[index].description = e.target.value;
                                        updateFormData('milestones', newMilestones);
                                      }}
                                      className="flex-grow"
                                    />
                                    <CustomNumberInput
                                      placeholder="Amount"
                                      value={milestone.amount}
                                      onChange={(value) => {
                                        const newMilestones = [...formData.milestones];
                                        newMilestones[index].amount = value;
                                        updateFormData('milestones', newMilestones);
                                      }}
                                      icon={<DollarSign className="text-orange-500" />}
                                      min={1}
                                      className="w-1/3"
                                    />
                                  </div>
                                ))}
                                <Button 
                                  color="primary"
                                  onPress={() => updateFormData('milestones', [...formData.milestones, { description: '', amount: '' }])}
                                >
                                  Add Milestone
                                </Button>
                              </div>
                            )}
                            {formData.paymentType === 'project' && (
                              <CustomNumberInput
                                label="Project Price ($)"
                                placeholder="Enter total project price"
                                value={formData.projectPrice}
                                onChange={(value) => updateFormData('projectPrice', value)}
                                icon={<Package className="text-orange-500" />}
                                min={1}
                              />
                            )}
                          </div>
                        )}
                        {step === 3 && (
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-orange-600">Application Summary</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <p><strong>Name:</strong> {formData.name}</p>
                              <p><strong>Email:</strong> {formData.email}</p>
                              <p><strong>Phone:</strong> {formData.phone}</p>
                              <p><strong>Payment Type:</strong> {formData.paymentType}</p>
                              {formData.paymentType === 'hourly' && (
                                <>
                                  <p><strong>Hourly Rate:</strong> ${formData.rate}</p>
                                  <p><strong>Estimated Hours:</strong> {formData.estimatedHours}</p>
                                </>
                              )}
                              {formData.paymentType === 'project' && (
                                <p><strong>Project Price:</strong> ${formData.projectPrice}</p>
                              )}
                            </div>
                            <p><strong>Experience:</strong> {formData.experience.substring(0, 100)}...</p>
                            <CustomInput
                              label="Available From"
                              type="date"
                              value={formData.availableFrom}
                              onChange={(e) => updateFormData('availableFrom', e.target.value)}
                              icon={<Calendar className="text-orange-500" />}
                            />
                            <Checkbox
                              isSelected={formData.agreedToTerms}
                              onValueChange={(value) => updateFormData('agreedToTerms', value)}
                              color="warning"
                            >
                              I agree to the terms and conditions
                            </Checkbox>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </CardBody>
                </Card>
              </ModalBody>
            <ModalFooter className='flex justify-center gap-4'>
            
              <Button
                color="primary"
                variant="flat"
                onPress={() => step > 0 ? setStep(step - 1) : null}
                disabled={step === 0}
              >
                Previous
              </Button>
              <Button
                color="primary"
                onPress={() => step < 3 ? setStep(step + 1) : handleSubmit()}
                disabled={!isStepComplete(step)}
              >
                {step < 3 ? "Next" : "Submit Application"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ApplicationModal;