import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, Briefcase, Calendar, Link, DollarSign, FileText, Clock, Target, Package, ChevronUp, ChevronDown, Star, MapPin } from 'lucide-react';
import { Input, Textarea, Checkbox, Radio, RadioGroup, Button, Chip, Progress, CardHeader } from "@nextui-org/react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@radix-ui/react-scroll-area';



const JobDetailsDrawer = ({ isOpen, onClose, job, onApply }) => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    portfolioLink: '',
    linkedinProfile: '',
    yearsOfExperience: 0,
    relevantSkills: [],
    proposedRate: '',
    availableFrom: '',
    estimatedHours: '',
    coverLetter: '',
    understandingOfProject: '',
    relevantWorkExamples: '',
    questions: '',
    agreedToTerms: false
  });

  const updateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onApply(formData);
    onClose();
  };

  const drawerAnimation = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { x: '100%', opacity: 0, transition: { ease: 'easeInOut' } }
  };

  const contentAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };



  const formAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };

  const steps = ["Personal Info", "Experience", "Proposal", "Review"];

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div className="space-y-4" variants={contentAnimation}>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
              startContent={<User className="text-default-400" />}
            />
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              startContent={<Mail className="text-default-400" />}
            />
            <Input
              label="Phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => updateFormData('phone', e.target.value)}
              startContent={<Phone className="text-default-400" />}
            />
          </motion.div>
        );
        case 1:
            return (
              <motion.div className="space-y-4" variants={formAnimation}>
                <Input
                  label="Portfolio Link"
                  placeholder="Your portfolio URL"
                  value={formData.portfolioLink}
                  onChange={(e) => updateFormData('portfolioLink', e.target.value)}
                  startContent={<Link className="text-default-400" />}
                />
                <Input
                  label="LinkedIn Profile"
                  placeholder="Your LinkedIn profile URL"
                  value={formData.linkedinProfile}
                  onChange={(e) => updateFormData('linkedinProfile', e.target.value)}
                  startContent={<Link className="text-default-400" />}
                />
                <div>
                  <Label>Years of Experience</Label>
                  <Slider
                    defaultValue={[0]}
                    max={20}
                    step={1}
                    value={[formData.yearsOfExperience]}
                    onValueChange={(value) => updateFormData('yearsOfExperience', value[0])}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">{formData.yearsOfExperience} years</p>
                </div>
              </motion.div>
            );
          case 2:
            return (
              <motion.div className="space-y-4" variants={formAnimation}>
                <Input
                  label="Proposed Rate ($/hour)"
                  type="number"
                  placeholder="Your hourly rate"
                  value={formData.proposedRate}
                  onChange={(e) => updateFormData('proposedRate', e.target.value)}
                  startContent={<DollarSign className="text-default-400" />}
                />
                <Input
                  label="Estimated Hours per Week"
                  type="number"
                  placeholder="Hours you can dedicate per week"
                  value={formData.estimatedHours}
                  onChange={(e) => updateFormData('estimatedHours', e.target.value)}
                  startContent={<Clock className="text-default-400" />}
                />
                <Textarea
                  label="Cover Letter"
                  placeholder="Write a brief cover letter..."
                  value={formData.coverLetter}
                  onChange={(e) => updateFormData('coverLetter', e.target.value)}
                  minRows={3}
                />
              </motion.div>
            );
          case 3:
            return (
              <motion.div className="space-y-4" variants={formAnimation}>
                <div className=" p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Application Summary</h3>
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                  <p><strong>Proposed Rate:</strong> ${formData.proposedRate}/hour</p>
                  <p><strong>Estimated Hours:</strong> {formData.estimatedHours} hours/week</p>
                </div>
                <Checkbox
                  isSelected={formData.agreedToTerms}
                  onValueChange={(value) => updateFormData('agreedToTerms', value)}
                >
                  I agree to the terms and conditions
                </Checkbox>
              </motion.div>
            );
    }
  };

  return (
  

    <AnimatePresence>
      {isOpen && (
        <>  
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 "
            onClick={onClose}
          />
          <motion.div
            className="fixed right-0 top-0 bg-muted h-full w-full max-w-6xl  z-50 overflow-y-auto "
            variants={drawerAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
          > <ScrollArea className=" rounded-md border p-4">
            <div className='flex justify-end'>
                <Button isIconOnly variant="light" onClick={onClose}>
                  <X size={24} />
                </Button>
              </div>

            <div className='flex'>

              <div className="p-8 w-[60%]">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">{job.title}</h2>
                
                </div>

                <AnimatePresence mode="wait">
                  {!showApplicationForm ? (
                    <motion.div 
                      key="jobDetails"
                      variants={contentAnimation}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="space-y-6 p-10"
                    >
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Job Details</h3>
                        <p className="text-sm text-gray-500 mb-6">{job.description}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {job.tags.map((tag, index) => (
                            <Chip key={index} variant="solid">{tag}</Chip>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2 mb-6">
                            <DollarSign size={16} className="text-green-500" />
                            <span>Budget: ${job.budget.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-6">
                            <Clock size={16} className="text-blue-500" />
                            <span>Duration: {job.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-6">
                            <Briefcase size={16} className="text-purple-500" />
                            <span>Experience: {job.experienceLevel}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-6">
                            <Target size={16} className="text-red-500" />
                            <span>Difficulty: {job.difficulty}/5</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">Client Information</h3>
                        <div className="flex items-center gap-4 mb-2">
                          <img src={job.client.avatar} alt={job.client.name} className="w-12 h-12 rounded-full" />
                          <div>
                            <p className="font-medium">{job.client.name}</p>
                            <div className="flex items-center gap-1">
                              <Star size={14} className="text-yellow-500" />
                              <span className="text-sm">{job.client.rating} / 5</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{job.client.description}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin size={14} className="text-gray-400" />
                          <span>{job.client.location}</span>
                        </div>
                      </div>

                      <Button 
                        color="primary" 
                        className="w-full"
                        onClick={() => setShowApplicationForm(true)}
                      >
                        Apply for this Job
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="applicationForm"
                      variants={contentAnimation}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="mt-8"
                    >
                      <h3 className="text-xl font-semibold mb-4">Application Form</h3>
                      <div className="mb-6">
                        <div className="flex justify-between mb-2">
                          {steps.map((stepName, index) => (
                            <div 
                              key={index}
                              className={`text-sm font-medium ${index <= step ? 'text-primary' : 'text-gray-400'}`}
                            >
                              {stepName}
                            </div>
                          ))}
                        </div>
                        <Progress value={(step + 1) * 25} className="mb-4" />
                      </div>
                      <form onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait">
                          {renderStep()}
                        </AnimatePresence>
                        <div className="flex justify-between mt-6">
                          <Button 
                            variant="flat" 
                            onClick={() => step > 0 ? setStep(step - 1) : setShowApplicationForm(false)}
                          >
                            {step === 0 ? 'Back to Details' : 'Previous'}
                          </Button>
                          {step < 3 ? (
                            <Button 
                              color="primary"
                              onClick={() => setStep(Math.min(3, step + 1))}
                            >
                              Next
                            </Button>
                          ) : (
                            <Button 
                              color="primary"
                              type="submit"
                              disabled={!formData.agreedToTerms}
                            >
                              Submit Application
                            </Button>
                          )}
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Separator orientation='vertical'  />
              <div className='flex justify-center w-[30%]'>
                    <Card>
                    Title
                    </Card>
              </div>
            
            </div> </ScrollArea>
          </motion.div>
         
        </>
      )}
    </AnimatePresence>
   
  );
};

export default JobDetailsDrawer;