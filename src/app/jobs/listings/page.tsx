"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sliders, Tag, Clock, Coins, Globe, ArrowUpRight, TrendingUp, Users, Zap, Book, X, Star, Briefcase, ThumbsUpIcon, Save, PinIcon, MapPin } from 'lucide-react';
import { Input } from "@/components/ui/input";

import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {  Chip } from '@nextui-org/react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Separator } from '@radix-ui/react-select';
import { Button } from '@/components/ui/button';

  const ApplicationForm = ({ onClose }) => {
    const [step, setStep] = useState(1);
    const totalSteps = 3;

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Apply for Project</h2>
            <div className="mb-6">
                <div className="flex justify-between mb-2">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className={`w-1/3 h-2 ${s <= step ? 'bg-purple-600' : 'bg-gray-300'}`} />
                    ))}
                </div>
                <div className="flex justify-between">
                    <span>Personal Info</span>
                    <span>Experience</span>
                    <span>Proposal</span>
                </div>
            </div>
            {step === 1 && (
                <div>
                    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                    <Input className="mb-4" placeholder="Full Name" />
                    <Input className="mb-4" placeholder="Email" type="email" />
                    {/* Add more fields as needed */}
                </div>
            )}
            {step === 2 && (
                <div>
                    <h3 className="text-lg font-semibold mb-4">Experience</h3>
                    <textarea className="w-full p-2 border rounded mb-4" placeholder="Describe your relevant experience" rows={4} />
                    {/* Add more fields as needed */}
                </div>
            )}
            {step === 3 && (
                <div>
                    <h3 className="text-lg font-semibold mb-4">Project Proposal</h3>
                    <textarea className="w-full p-2 border rounded mb-4" placeholder="Write your proposal" rows={6} />
                    <Input className="mb-4" placeholder="Proposed Budget" type="number" />
                    {/* Add more fields as needed */}
                </div>
            )}
            <div className="flex justify-between mt-6">
                {step > 1 && <Button onClick={prevStep}>Previous</Button>}
                {step < totalSteps ? (
                    <Button onClick={nextStep}>Next</Button>
                ) : (
                    <Button onClick={onClose}>Submit Application</Button>
                )}
            </div>
        </div>
    );
};

const FreelancerProfile = () => {
    return (
        <div className=" rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
                <img src="https://ui-avatars.com/api/?name=John+Doe&background=random" alt="John Doe" className="w-16 h-16 rounded-full mr-4" />
                <div>
                    <h2 className="text-xl font-bold">John Doe</h2>
                    <p className="text-gray-600">Full Stack Developer</p>
                </div>
            </div>
            <div className="mb-4">
                <div className="flex items-center mb-2">
                    <Star className="text-yellow-400 mr-1" size={16} />
                    <span className="font-semibold">4.9</span>
                    <span className="text-gray-600 ml-1">(120 reviews)</span>
                </div>
                <div className="flex items-center">
                    <Briefcase className="text-gray-400 mr-2" size={16} />
                    <span>Completed 85 jobs</span>
                </div>
            </div>
            <Separator className="my-4" />
            <h3 className="font-semibold mb-2">Top Skills</h3>
            <div className="flex flex-wrap gap-2 mb-4">
                <Chip>React</Chip>
                <Chip>Node.js</Chip>
                <Chip>Python</Chip>
                <Chip>AWS</Chip>
            </div>
            <Button className="w-full">View Full Profile</Button>
        </div>
    );
};


const ProjectListingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [budgetRange, setBudgetRange] = useState([0, 10000]);
  const [category, setCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('recent');
  const [experienceLevel, setExperienceLevel] = useState('all');
  const [projectLength, setProjectLength] = useState('all');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  // Mock project data
  const projects = [
    { 
      id: 1, 
      title: 'Build a Decentralized Social Media Platform',
      description: 'Create a blockchain-based social media platform with focus on privacy and data ownership.',
      budget: 8000,
      duration: '3 months',
      category: 'Blockchain',
      skills: ['Solidity', 'React', 'IPFS'],
      location: 'Remote',
      difficulty: 'Advanced',
      applicants: 12,
      verified: true,
      client: {
        name: 'DecentralTech',
        rating: 4.8,
        projects: 15
      }
    },
    { 
      id: 2, 
      title: 'Design an Immersive VR Experience',
      description: 'Conceptualize and design a virtual reality experience for meditation and mindfulness.',
      budget: 6000,
      duration: '6 weeks',
      category: 'Design',
      skills: ['Unity', 'VR', '3D Modeling'],
      location: 'Remote',
      difficulty: 'Intermediate',
      applicants: 8,
      verified: false,
      client: {
        name: 'MindscapeVR',
        rating: 4.2,
        projects: 7
      }
    },
    { 
      id: 3, 
      title: 'Develop an AI-powered Language Learning App',
      description: 'Build a mobile app that uses AI to personalize language learning experiences.',
      budget: 10000,
      duration: '4 months',
      category: 'AI/ML',
      skills: ['Python', 'TensorFlow', 'React Native'],
      location: 'Remote',
      difficulty: 'Expert',
      applicants: 20,
      verified: true,
      client: {
        name: 'LinguaLeap',
        rating: 4.9,
        projects: 23
      }
    },
  ];

const filteredProjects = projects.filter(project => 
  project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
  project.budget >= budgetRange[0] && project.budget <= budgetRange[1] &&
  (category === 'all' || project.category === category) &&
  (!verifiedOnly || project.verified) &&
  (experienceLevel === 'all' || project.difficulty.toLowerCase() === experienceLevel.toLowerCase()) &&
  (projectLength === 'all' || 
    (projectLength === 'short' && project.duration.includes('week')) ||
    (projectLength === 'medium' && project.duration.includes('month') && parseInt(project.duration) <= 3) ||
    (projectLength === 'long' && project.duration.includes('month') && parseInt(project.duration) > 3))
).sort((a, b) => {
  if (sortBy === 'recent') return new Date(b.postedDate) - new Date(a.postedDate);
  if (sortBy === 'budget') return b.budget - a.budget;
  if (sortBy === 'applicants') return b.applicants - a.applicants;
  return 0;
});

  const categoryColors = {
    'Blockchain': 'bg-blue-500',
    'Design': 'bg-pink-500',
    'AI/ML': 'bg-green-500'
  };

  return (
    <div className="min-h-screen  p-4">
      <header className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-orange-600">
          Decentralized Talent Nexus
        </h1>
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <div className="relative flex-grow ">
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full "
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 " size={20} />
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="rounded-full "
          >
            <Sliders size={16} className="mr-2" />
            Filters
          </Button>
        </div>
      </header>
  
      <main className="max-w-6xl mx-auto">
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className=" rounded-lg shadow-lg p-4 mb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Category</label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Blockchain">Blockchain</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="AI/ML">AI/ML</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Budget Range</label>
                  <Slider
                    min={0}
                    max={10000}
                    step={500}
                    value={budgetRange}
                    onValueChange={setBudgetRange}
                  />
                  <div className="flex justify-between mt-2 text-sm">
                    <span>${budgetRange[0]}</span>
                    <span>${budgetRange[1]}</span>
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Experience Level</label>
                  <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Project Length</label>
                  <Select value={projectLength} onValueChange={setProjectLength}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select project length" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Length</SelectItem>
                      <SelectItem value="short">Short Term</SelectItem>
                      <SelectItem value="medium">Medium Term</SelectItem>
                      <SelectItem value="long">Long Term</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="verified-switch"
                    checked={verifiedOnly}
                    onCheckedChange={setVerifiedOnly}
                  />
                  <label htmlFor="verified-switch" className="text-sm">Verified clients only</label>
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="budget">Highest Budget</SelectItem>
                    <SelectItem value="applicants">Most Applicants</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
  
        <div className="flex gap-6">
                    <div className="flex-grow">
                    {filteredProjects.map((project, index) => {
                const [isExpanded, setIsExpanded] = useState(false);

                return (
                    <React.Fragment key={project.id}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer border-b-1 p-4"
                            onClick={() => {
                                setSelectedProject(project);
                                setIsDrawerOpen(true);
                            }}
                        >
                            <div className="flex justify-between mb-1 align-baseline text-end content-baseline items-baseline">
                                <h3 className="text-xl text-yellow-600 font-medium transition-colors">
                                    {project.title}
                                </h3>
                                <div>
                                    <Button variant='link' className='rounded-full' onClick={(e) => e.stopPropagation()}>
                                        <ThumbsUpIcon size={18} />
                                    </Button>
                                    <Button  variant='link' className='rounded-full' onClick={(e) => e.stopPropagation()}>
                                        <Save size={18} />
                                    </Button>
                                </div>
                            </div>
                            <div className='flex mb-2'>
                                <span className="flex items-center mr-4">
                                    <Coins size={14} className="mr-2 text-yellow-600" /> 
                                    <span className="font-medium text-xs text-yellow-600">${project.budget}</span>
                                </span>
                                <span className="flex items-center mr-4">
                                    <Users size={14} className="mr-2" /> 
                                    <span className="font-medium text-xs text-gray-400">{project.applicants} applicants</span>
                                </span>
                            </div>
                            <div className="mb-2">
                                <p className={`text-gray-300 ${isExpanded ? '' : 'line-clamp-3'}`}>
                                    {project.description}
                                </p>
                                <Button 
                                    size="sm" 
                                    variant="link" 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsExpanded(!isExpanded);
                                    }}
                                >
                                    {isExpanded ? 'Show less' : 'Read more'}
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.skills.slice(0, 3).map(skill => (
                                    <Chip key={skill} variant="solid" className="">
                                        {skill}
                                    </Chip>
                                ))}
                                {project.skills.length > 3 && (
                                    <Chip variant="solid" className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                                        +{project.skills.length - 3} more
                                    </Chip>
                                )}
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <img src={`https://ui-avatars.com/api/?name=${project.client.name}&background=random`} alt={project.client.name} className="w-6 h-6 rounded-full mr-2" />
                                    <div className='flex ml-2 items-center'>
                                        <Star size={16} fill="yellow" className="text-yellow-400 mr-1" />
                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{project.client.rating.toFixed(1)}</span>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <MapPin size={16} className="mr-1 text-gray-400" />
                                    <span className="text-sm text-gray-400">{project.location}</span>
                                </div>
                            </div>
                        </motion.div>
                    </React.Fragment>
                );
            })}
         
          </div>
          <div className="w-1/4 hidden lg:block">
                        <FreelancerProfile />
                    </div>
        </div>
        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen} >
                    <SheetContent side="right" className="w-[70%] overflow-y-auto">
                        {selectedProject && !isApplying && (
                            <>
                                <SheetHeader>
                                    <SheetTitle className="text-3xl font-bold">
                                        {selectedProject.title}
                                    </SheetTitle>
                                    <SheetDescription>
                                        <Chip>{selectedProject.category}</Chip>
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="mt-6 space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">Project Description</h3>
                                        <p className="text-gray-600">{selectedProject.description}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">Requirements</h3>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {selectedProject.skills.map(skill => (
                                                <Chip key={skill}>{skill}</Chip>
                                            ))}
                                        </div>
                                        <p className="flex items-center text-gray-600">
                                            <Zap size={16} className="mr-2 text-yellow-500" />
                                            Difficulty: {selectedProject.difficulty}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                        <p className="flex items-center text-gray-600">
                                            <Coins size={16} className="mr-2 text-green-500" />
                                            Budget: ${selectedProject.budget}
                                        </p>
                                        <p className="flex items-center text-gray-600">
                                            <Clock size={16} className="mr-2 text-blue-500" />
                                            Duration: {selectedProject.duration}
                                        </p>
                                        <p className="flex items-center text-gray-600">
                                            <Users size={16} className="mr-2 text-purple-500" />
                                            {selectedProject.applicants} applicants
                                        </p>
                                        <p className="flex items-center text-gray-600">
                                            <Globe size={16} className="mr-2 text-indigo-500" />
                                            {selectedProject.location}
                                        </p>
                                    </div>
                                    <Separator />
                                    <div>
                                        <h3 className="text-xl font-semibold mb-4">Client Information</h3>
                                        <div className="flex items-center mb-4">
                                            <img 
                                                src={`https://ui-avatars.com/api/?name=${selectedProject.client.name}&background=random`} 
                                                alt={selectedProject.client.name} 
                                                className="w-16 h-16 rounded-full mr-4"
                                            />
                                            <div>
                                                <p className="font-semibold text-lg">{selectedProject.client.name}</p>
                                                <div className="flex items-center">
                                                    <Star size={14} className="text-yellow-400 mr-1" />
                                                    <span className="text-gray-600">{selectedProject.client.rating.toFixed(1)} ({selectedProject.client.projects} projects)</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-600">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        </p>
                                    </div>
                                    <Button className="w-full" onClick={() => setIsApplying(true)}>
                                        Apply Now <ArrowUpRight size={14} className="ml-2" />
                                    </Button>
                                </div>
                            </>
                        )}
                        {isApplying && (
                            <ApplicationForm onClose={() => {
                                setIsApplying(false);
                                setIsDrawerOpen(false);
                            }} />
                        )}
                    </SheetContent>
                </Sheet>
      </main>
    </div>
  );
};

export default ProjectListingPage;