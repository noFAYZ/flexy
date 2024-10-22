"use client";
import { Avatar, Badge, CardHeader, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Progress,  Tab,  Tabs,  Tooltip, useDisclosure } from "@nextui-org/react";
import {
  Award,
  BadgeCheck,
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Code,
  Coffee,
  DollarSign,
  ExternalLink,
  Github,
  Globe,
  GraduationCap,
  Heart,
  Languages,
  LanguagesIcon,
  LinkIcon,
  MapPinIcon,
  Star,
  Target,
  TrendingUp,
  Trophy,
  User,

} from "lucide-react";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";

import { StarRating } from "@/components/rating";
import ProfileSocials from "./components/ProfileSocials";
import ProfileBadges from "./components/ProfileBadges";

import { Card, CardBody } from "@nextui-org/react";
import {  CarbonBadge, ClarityCertificateLine, F7Wrench, FluentBriefcaseSearch20Regular, HugeiconsContact, HugeiconsNoteDone, MingcuteExchangeDollarLine, SolarLayersBroken } from "@/components/icons/icons";
import { AnimatePresence, motion } from "framer-motion";
import { CardContent, CardTitle } from "@/components/ui/card";
import { Image } from "@nextui-org/react";
import { ScrollArea } from "@/components/ui/scroll-area";


const UserPage = () => {
  const user = {
    name: "Sophia Rodriguez",
    username: "sophiarodriguez",
    location: "San Francisco, CA",
    title: "Full Stack Developer & UX/UI Designer",
    avatar: "https://avatar.iran.liara.run/public",
    tags: ["React", "Node.js", "UI/UX", "MongoDB", "TypeScript"],
    bio: "Passionate full-stack developer with 7+ years of experience crafting innovative web and mobile applications. Specializing in creating seamless user experiences backed by robust, scalable architectures. Committed to staying at the forefront of technology trends and delivering solutions that exceed client expectations.",

    aboutData: {
      bio: `Passionate full-stack developer with over 7 years of experience crafting innovative web and mobile applications. 
      I specialize in creating seamless user experiences backed by robust, scalable architectures. 
      My approach combines creative problem-solving with technical expertise to deliver solutions that not only meet but exceed client expectations. 
      I'm particularly interested in AI integration and sustainable technology practices, always staying at the forefront of emerging technologies and industry trends.
      Through my journey, I've had the privilege of working with diverse teams and clients across multiple industries, 
      which has enriched my perspective and enhanced my ability to adapt to various project requirements and technological challenges.`,
      
      location: "San Francisco, CA",
      yearsOfExperience: 7,
      projectsCompleted: 150,
      coffeeCount: 2847,
      
      languages: [
        { language: "English", proficiency: "Native" },
        { language: "Spanish", proficiency: "Fluent" },
        { language: "French", proficiency: "Intermediate" },
        { language: "Japanese", proficiency: "Basic" }
      ],
      
      education: [
        {
          degree: "M.S. in Computer Science",
          university: "Stanford University",
          year: "2018-2020"
        },
        {
          degree: "B.S. in Software Engineering",
          university: "University of California, Berkeley",
          year: "2014-2018"
        }
      ],
      
      interests: [
        "AI & Machine Learning",
        "Cloud Architecture",
        "UI/UX Design",
        "Blockchain",
        "IoT",
        "Green Technology",
        "Mobile Development",
        "DevOps"
      ],
      
      goals: [
        "Lead innovative projects that push the boundaries of technology",
        "Mentor and inspire the next generation of developers",
        "Contribute to open-source projects that make a positive impact",
        "Stay at the forefront of emerging technologies and best practices"
      ]
    },
    projects : [
      {
        title: "EcoTrack",
        description: "A sustainability tracking app helping users monitor and reduce their carbon footprint through personalized recommendations and community engagement.",
        image: "https://picsum.photos/seed/ecotrack/400/250",
        technologies: ["React Native", "Firebase", "Node.js", "MongoDB"],
        category: "Mobile Application",
        completionDate: "December 2023",
        client: "GreenTech Solutions",
        type: "Mobile App",
        industry: "Environmental",
        features: [
          "Real-time carbon footprint tracking",
          "Personalized sustainability recommendations",
          "Social sharing and community features",
          "Integration with smart home devices",
          "Monthly impact reports"
        ],
        demoLink: "https://ecotrack-demo.com",
        githubLink: "https://github.com/username/ecotrack"
      },
      {
        title: "HealthHub",
        description: "A telemedicine platform connecting patients with healthcare providers, featuring secure video consultations and digital health records management.",
        image: "https://picsum.photos/seed/healthhub/400/250",
        technologies: ["React", "WebRTC", "Express", "PostgreSQL", "AWS"],
        category: "Web Application",
        completionDate: "October 2023",
        client: "MediCare Innovations",
        type: "Healthcare Platform",
        industry: "Healthcare",
        features: [
          "Secure video consultations",
          "Electronic health records",
          "Prescription management",
          "Appointment scheduling",
          "Payment processing"
        ],
        demoLink: "https://healthhub-demo.com",
        githubLink: "https://github.com/username/healthhub"
      },
      {
        title: "TradeSmart",
        description: "An AI-powered stock trading platform providing real-time market analysis and automated trading strategies for retail investors.",
        image: "https://picsum.photos/seed/tradesmart/400/250",
        technologies: ["Next.js", "Python", "TensorFlow", "Redis", "Docker"],
        category: "Financial Technology",
        completionDate: "August 2023",
        client: "FinTech Ventures",
        type: "Web Platform",
        industry: "Finance",
        features: [
          "Real-time market data analysis",
          "AI-powered trading signals",
          "Portfolio management",
          "Risk assessment tools",
          "Automated trading strategies"
        ],
        demoLink: "https://tradesmart-demo.com",
        githubLink: "https://github.com/username/tradesmart"
      },
      {
        title: "LearnLoop",
        description: "An interactive e-learning platform with AI-driven personalized learning paths and real-time progress tracking for students and educators.",
        image: "https://picsum.photos/seed/learnloop/400/250",
        technologies: ["Vue.js", "Django", "PostgreSQL", "OpenAI", "Redis"],
        category: "Education Technology",
        completionDate: "July 2023",
        client: "EduTech Solutions",
        type: "Web Application",
        industry: "Education",
        features: [
          "Personalized learning paths",
          "Interactive content delivery",
          "Progress tracking",
          "Virtual classrooms",
          "Assessment tools"
        ],
        demoLink: "https://learnloop-demo.com",
        githubLink: "https://github.com/username/learnloop"
      },
      {
        title: "EventFlow",
        description: "A comprehensive event management platform with virtual and hybrid event capabilities, ticketing, and real-time analytics.",
        image: "https://picsum.photos/seed/eventflow/400/250",
        technologies: ["React", "Node.js", "GraphQL", "MongoDB", "Stripe"],
        category: "Event Management",
        completionDate: "June 2023",
        client: "EventPro Solutions",
        type: "Web Platform",
        industry: "Events",
        features: [
          "Virtual event hosting",
          "Ticketing system",
          "Attendee management",
          "Analytics dashboard",
          "Payment processing"
        ],
        demoLink: "https://eventflow-demo.com",
        githubLink: "https://github.com/username/eventflow"
      },
      {
        title: "FoodFast",
        description: "A food delivery platform connecting local restaurants with customers, featuring real-time order tracking and automated dispatch.",
        image: "https://picsum.photos/seed/foodfast/400/250",
        technologies: ["React Native", "Node.js", "Socket.io", "PostgreSQL", "Google Maps API"],
        category: "Food Delivery",
        completionDate: "May 2023",
        client: "Urban Eats Inc",
        type: "Mobile App",
        industry: "Food & Beverage",
        features: [
          "Real-time order tracking",
          "Restaurant management",
          "Driver dispatch system",
          "Payment integration",
          "Review and rating system"
        ],
        demoLink: "https://foodfast-demo.com",
        githubLink: "https://github.com/username/foodfast"
      },
      {
        title: "WorkFlow",
        description: "A project management tool with AI-powered task automation and team collaboration features for remote teams.",
        image: "https://picsum.photos/seed/workflow/400/250",
        technologies: ["Angular", "FastAPI", "PostgreSQL", "Docker", "Kubernetes"],
        category: "Project Management",
        completionDate: "April 2023",
        client: "TeamWork Solutions",
        type: "Web Application",
        industry: "Productivity",
        features: [
          "Task automation",
          "Team collaboration",
          "Resource management",
          "Time tracking",
          "Performance analytics"
        ],
        demoLink: "https://workflow-demo.com",
        githubLink: "https://github.com/username/workflow"
      },
      {
        title: "SmartHome",
        description: "An IoT platform for smart home automation with voice control and energy management capabilities.",
        image: "https://picsum.photos/seed/smarthome/400/250",
        technologies: ["React", "Python", "MQTT", "TensorFlow", "AWS IoT"],
        category: "IoT",
        completionDate: "March 2023",
        client: "HomeTech Innovations",
        type: "IoT Platform",
        industry: "Smart Home",
        features: [
          "Device management",
          "Voice control",
          "Energy monitoring",
          "Automated routines",
          "Security system integration"
        ],
        demoLink: "https://smarthome-demo.com",
        githubLink: "https://github.com/username/smarthome"
      }
    ],
    workHistory: [
      {
        title: "Senior Full Stack Developer",
        company: "TechNova Solutions",
        period: "2020 - Present",
      },
      {
        title: "Senior Full Stack Developer",
        company: "TechNova Solutions",
        period: "2020 - Present",
      },
      {
        title: "Senior Full Stack Developer",
        company: "TechNova Solutions",
        period: "2020 - Present",
      },
    ],

    skills: [
      { name: "React & React Native" },
      { name: "Node.js" },
      { name: "UI/UX Design" },
      { name: "MongoDB" },
      { name: "TypeScript" },
      { name: "GraphQL" },
      { name: "AWS" },
      { name: "Docker" },
    ],
    earned: 50000,
    rating: 4.9,
    projectsCompleted: 54,
    hoursWorked: 40,
    hourlyRate: 95,
    website: "www.sophiarodriguez.dev",
    languages: ["English", "Spanish", "Portuguese"],

    testimonials: [
      {
        name: "Alex Chen",
        company: "HealthTech Innovations",
        comment:
          "Sophia's expertise in both front-end and back-end development was crucial in bringing our telemedicine platform to life. Her attention to detail and user-centric approach resulted in an intuitive and robust solution.",
      },
      {
        name: "Emily Watson",
        company: "EcoSolutions Co.",
        comment:
          "Working with Sophia on our sustainability app was a fantastic experience. Her technical skills combined with her passion for environmental issues made her the perfect fit for our project.",
      },
    ],

    certifications: [
      { name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services" },
      { name: "Google UX Design Professional Certificate", issuer: "Google" },
      { name: "MongoDB Certified Developer Associate", issuer: "MongoDB" },
    ],


    inProgressWork :[
      {
        title: "AI-Powered Fitness Tracking App",
        clientName: "FitTech Pro",
        amount: "$15,000",
        rating: null,
        review: "Development is progressing well. The AI workout recommendation engine is in testing phase. UI implementation is 80% complete.",
        clientAvatar: "https://i.pravatar.cc/150?u=fittech",
        date: "2024-02-15",
        progress: 75,
        deadline: "2024-04-30"
      },
      {
        title: "Restaurant Management Dashboard",
        clientName: "FoodChain Solutions",
        amount: "$8,500",
        rating: null,
        review: "Inventory management module completed. Currently implementing real-time order tracking system. Client is satisfied with current progress.",
        clientAvatar: "https://i.pravatar.cc/150?u=foodchain",
        date: "2024-02-01",
        progress: 60,
        deadline: "2024-03-15"
      },
      {
        title: "Real Estate Virtual Tour Platform",
        clientName: "HomeVision Realty",
        amount: "$12,000",
        rating: null,
        review: "3D visualization module is under development. VR integration testing is scheduled for next week.",
        clientAvatar: "https://i.pravatar.cc/150?u=homevision",
        date: "2024-01-20",
        progress: 40,
        deadline: "2024-04-10"
      },
      {
        title: "Educational Content Management System",
        clientName: "EduTech Global",
        amount: "$10,500",
        rating: null,
        review: "Course creation interface completed. Working on student analytics dashboard and integration with video streaming service.",
        clientAvatar: "https://i.pravatar.cc/150?u=edutech",
        date: "2024-02-10",
        progress: 65,
        deadline: "2024-03-30"
      },
      {
        title: "Supply Chain Analytics Platform",
        clientName: "LogiTrack Systems",
        amount: "$18,000",
        rating: null,
        review: "Data pipeline implementation in progress. Dashboard mockups approved, moving to frontend development phase.",
        clientAvatar: "https://i.pravatar.cc/150?u=logitrack",
        date: "2024-01-05",
        progress: 45,
        deadline: "2024-05-15"
      }
    ],
    
   completedWork : [
      {
        title: "E-commerce Website Redesign",
        clientName: "TechMart Global",
        amount: "$12,500",
        rating: 4.9,
        review: "Exceptional work on our e-commerce platform redesign. The new UI has increased our conversion rate by 35%. Integration with our inventory system is seamless.",
        clientAvatar: "https://i.pravatar.cc/150?u=techmart",
        date: "2024-01-15",
        duration: "2 months",
        industry: "Retail"
      },
      {
        title: "Healthcare Patient Portal",
        clientName: "MediCare Solutions",
        amount: "$20,000",
        rating: 4.8,
        review: "Delivered a secure and user-friendly patient portal that has significantly improved our patient engagement. The integration with our existing systems was handled expertly.",
        clientAvatar: "https://i.pravatar.cc/150?u=medicare",
        date: "2023-12-20",
        duration: "3 months",
        industry: "Healthcare"
      },
      {
        title: "Investment Portfolio Tracker",
        clientName: "WealthWise Finance",
        amount: "$15,000",
        rating: 5.0,
        review: "Outstanding development of our portfolio tracking system. The real-time data visualization and automated reporting features have exceeded our expectations.",
        clientAvatar: "https://i.pravatar.cc/150?u=wealthwise",
        date: "2023-11-30",
        duration: "2.5 months",
        industry: "Finance"
      },
      {
        title: "Event Management Platform",
        clientName: "EventPro Inc",
        amount: "$9,500",
        rating: 4.7,
        review: "Great work on our event management platform. The ticketing system and virtual event features work flawlessly. Our clients love the new interface.",
        clientAvatar: "https://i.pravatar.cc/150?u=eventpro",
        date: "2023-11-15",
        duration: "1.5 months",
        industry: "Events"
      },
      {
        title: "HR Management System",
        clientName: "StaffSync Solutions",
        amount: "$18,000",
        rating: 4.9,
        review: "Transformed our HR processes with this comprehensive system. The automated onboarding and performance tracking features have greatly improved our efficiency.",
        clientAvatar: "https://i.pravatar.cc/150?u=staffsync",
        date: "2023-10-25",
        duration: "3 months",
        industry: "Human Resources"
      },
      {
        title: "AI-Powered Customer Service Bot",
        clientName: "ServiceAI Tech",
        amount: "$16,500",
        rating: 4.8,
        review: "The chatbot has reduced our customer service workload by 60%. Natural language processing capabilities are impressive and the integration was smooth.",
        clientAvatar: "https://i.pravatar.cc/150?u=serviceai",
        date: "2023-10-01",
        duration: "2.5 months",
        industry: "Technology"
      }
    ],
    

    education:[ {
      degree: "M.S. in Computer Science",
      school: "Stanford University",
      year: 2016,
    },
    {
      degree: "M.S. in Computer Science",
      school: "Stanford University",
      year: 2016,
    },
  ],

    availability: {
      status: "Available",
      hours: "30 hrs/week",
      timezone: "UTC-8 (PST)",
    },

    socialMedia: {
      github: "github.com/sophiarodriguez",
      linkedin: "linkedin.com/in/sophiarodriguez",
      twitter: "twitter.com/sophiadev",
    },
  };

  return (
    <div className="w-full   ">
      <div className="hidden justify-between max-w-full bg-gradient-to-r from-orange-500  to-pink-500 rounded-2xl py-2  px-6 ">
        <Progress
          size="md"
          radius="md"
          classNames={{
            base: "max-w-xl",
            track: "drop-shadow-md ",
            indicator: "bg-gradient-to-r from-orange-500 to-indigo-500",
            label: "tracking-wider font-medium text-default-600",
            value: "text-foreground/60",
          }}
          label="Profile completeness"
          value={65}
        />
        <div className="flex gap-4 content-center  items-center text-center align-middle">
          <span className="text-foreground/60 content-center  items-center text-center align-middle">
            65%
          </span>
          <Button variant="flat">Complete</Button>
        </div>
      </div>

      <div className="px-5 relative sm:px-10 pb-10">
        <div className="flex flex-col sm:flex-row w-full  sm:pt-5 rounded-[3.5rem] justify-between gap-6">

          <ProfileHeader user={user} />
          <ProfileStats user={user} />
        </div>
        <div className=" flex flex-row justify-end w-full px-2 sm:px-10 ">
        
        </div>
      </div>

      <div className="flex w-full flex-col px-5 sm:px-10 pb-10">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-grow lg:w-2/3">
          <AboutMeCard aboutData={user.aboutData} />  
          <ReviewsCard completedWork={user.completedWork} inProgressWork={user.inProgressWork} />
          <FeaturedProjectsCard projects={user.projects} />
        </div>
        <div className="flex flex-col lg:w-1/3 gap-6">
      
         
          <SkillsCard skills={user.skills} />
          <WorkHistoryCard workHistory={user.workHistory} />
          <EducationCard education={user.education} />
          <CertificationsCard certifications={user.certifications} />
          <LanguageesCard languages={user.languages} />
          <SocialsCard/>
          
          {/* <Socials/> */}
        </div>
      </div>
    </div>

  {/*     <ProfileDock /> */}
    </div>
  );
};

const ProfileHeader = ({ user }) => (
  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full lg:w-auto">
    <div className="relative flex flex-col items-center sm:items-start">
   
      <Badge
        content="online"
        color="success"
        size="sm"
        placement="bottom-right"
        className="shadow"
      >
        <Avatar
          isBordered
          color="success"
          src="https://avatar.iran.liara.run/public"
          className="w-28 h-28 sm:w-36 sm:h-36 text-large"
        />
      </Badge>
    </div>
    <div className="flex flex-col justify-between mt-4 sm:mt-0 text-center sm:text-left">
      <div className="flex flex-col">
        <span className="flex gap-2 text-2xl sm:text-3xl font-medium align-baseline items-center justify-center sm:justify-start">
          {user.name}
          <Tooltip
            showArrow={true}
            content="ID verified"
            className="bg-orange-600 text-white rounded-full"
            placement={"top-start"}
          >
            <span className="bg-orange-600 rounded-full p-[1px]">
              <BadgeCheck className="p-0" stroke="background" />
            </span>
          </Tooltip>
        </span>
        <span className="text-sm font-medium text-gray-400 pb-2 pt-0">
          @{user.username}
        </span>
        <span className="text-md">
          {user.title}
        </span>
      </div>
      <div className="mt-2 flex flex-col items-center sm:items-start">
        <StarRating
          isInteractive={false}
          size={18}
          initialRating={user.rating}
        />
        <span className="flex gap-1 align-baseline items-center text-sm mt-2">
          <MapPinIcon size={18} /> {user.location}
        </span>
      </div>
    </div>
  </div>
);

const ProfileStats = ({ user }) => (
  <div className="flex flex-col  items-center gap-4 w-full lg:w-auto">
     <ProfileBadges  />

    <Card className="flex flex-row mb-6 w-fit px-4 bg-gradient-to-tl from-pink-500 to-orange-500 text-white shadow backdrop-blur-0 rounded-[2.5rem] items-center content-center justify-center align-middle">    
      
     
      <CardBody> 
        <div className="flex flex-wrap gap-4 justify-between">
          <div className="flex flex-row  w-fit items-center  align-middle bg-card text-foreground/80 px-4 py-2 rounded-full gap-1">
     <MingcuteExchangeDollarLine fill={'lime-500'} height={24} className="text-semibold" />
      <span className="font-semibold">${user.hourlyRate}.00/hr</span>
    </div>
          <Stat value={user.rating} label="Rating" />
          <Stat value={user.projectsCompleted} label="Projects" />
          <Stat value={`${user.hoursWorked}`} label="Hours" />
        </div>
      </CardBody>
    </Card>
    
  </div>
);

const Stat = ({ value, label }) => (
  <div className="flex items-center">
    <div>
      <div className="font-semibold">{value}</div>
      <div className="text-xs">{label}</div>
    </div>
  </div>
);



const AboutMeCard = ({ aboutData }) => (
  <Card className="mb-6 bg-background shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50 overflow-hidden">
    <CardBody className="p-6">
      <div className="space-y-6">
        {/* Main Bio Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-foreground flex items-center">
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
              About Me
            </span>
          </h2>
          <p className="text-md text-foreground/70 leading-relaxed mb-4">
            {aboutData.bio}
          </p>
        </div>

        {/* Quick Facts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <QuickFact 
            icon={<Globe />}
            title="Location"
            value={aboutData.location}
          />
          <QuickFact 
            icon={<Briefcase />}
            title="Experience"
            value={`${aboutData.yearsOfExperience}+ Years`}
          />
          <QuickFact 
            icon={<Trophy />}
            title="Projects Completed"
            value={aboutData.projectsCompleted}
          />
          <QuickFact 
            icon={<Coffee />}
            title="Coffee Consumed"
            value={`${aboutData.coffeeCount}+ Cups`}
          />
        </div>




      </div>
    </CardBody>
  </Card>
);

const QuickFact = ({ icon, title, value }) => (
  <motion.div 
    className="flex items-center gap-3 bg-content2 rounded-xl p-4"
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 10 }}
  >
    <div className="p-2 rounded-full bg-gradient-to-r from-pink-500/20 to-orange-500/20">
      {React.cloneElement(icon, { className: "w-5 h-5 text-primary" })}
    </div>
    <div>
      <p className="text-sm text-foreground/60">{title}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </motion.div>
);

const ReviewsCard = ({ completedWork, inProgressWork }) => {
  const [activeTab, setActiveTab] = useState("completed");
  const [selectedWork, setSelectedWork] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const currentWork = activeTab === "completed" ? completedWork : inProgressWork;
  const displayedWork = currentWork.slice(0, visibleCount);

  const handleWorkClick = (work) => {
    setSelectedWork(work);
    onOpen();
  };

  const handleViewMore = () => {
    setVisibleCount(prevCount => Math.min(prevCount + 2, currentWork.length));
  };

  return (
    <Card className="mb-6 bg-background shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 flex justify-between ">
        <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
          <HugeiconsNoteDone size={22} className="text-primary mr-2" />
          Recent Work
        </CardTitle>
        <div className="antialiased flex border-medium border-default bg-muted rounded-full p-1">
          <TabButton
            isActive={activeTab === "completed"}
            onClick={() => {
              setActiveTab("completed");
              setVisibleCount(4); // Reset visible count when switching tabs
            }}
          >
            <span className="flex gap-1">
              Completed ({completedWork.length})
            </span>
          </TabButton>
          <TabButton
            isActive={activeTab === "inProgress"}
            onClick={() => {
              setActiveTab("inProgress");
              setVisibleCount(4); // Reset visible count when switching tabs
            }}
          >
            <span className="flex gap-1">
              In Progress ({inProgressWork.length})
            </span>
          </TabButton>
        </div>
      </CardHeader>
      <CardBody className="p-4">
        <div className="space-y-2">
          {displayedWork.map((work, index) => (
            <RecentWorkItem 
              key={index} 
              work={work} 
              onClick={() => handleWorkClick(work)} 
            />
          ))}
        </div>
        {visibleCount < currentWork.length && (
          <div className="mt-4 text-center rounded-3xl">
            <Button
              size="sm"
              className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold rounded-full 
              transition-all duration-100 transform hover:scale-105"
              endContent={<ChevronRight size={16} />}
              onClick={handleViewMore}
            >
              View more! ({currentWork.length - visibleCount} remaining)
            </Button>
          </div>
        )}
      </CardBody>
      <DetailedReviewModal work={selectedWork} isOpen={isOpen} onClose={onClose} />
    </Card>
  );
};

const TabButton = ({ isActive, onClick, children }) => (
  <button
    className={`flex py-2 px-4 text-xs rounded-full transition-all duration-300 ${
      isActive
        ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white'
        : 'text-gray-600 hover:text-gray-100'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const RecentWorkItem = ({ work, onClick }) => {
  return (
    <div className="p-4 border-b-2 cursor-pointer hover:bg-muted transition-colors duration-200" onClick={onClick}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg">{work.title}</h3>
        </div>
        <Chip variant="flat" className="text-sm bg-gradient-to-r from-pink-500 to-orange-500 text-white">
          {work.amount}
        </Chip>
      </div>
      <p className="text-sm mb-3 line-clamp-2">{work.review}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Avatar src={work.clientAvatar} size="sm" className="mr-2" />
          <p className="text-xs mr-4">{work.clientName}</p>
          <span className="text-xs">{new Date(work.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center">
          <div className="flex items-center mb-2">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < work.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{work?.rating?.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailedReviewModal = ({ work, isOpen, onClose }) => {
  if (!work) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-xl font-bold">{work.title}</h2>
          <p className="text-sm text-gray-500">{work.clientName}</p>
        </ModalHeader>
        <ModalBody>
          <div className="mb-4">
            <Chip variant="flat" className="text-sm bg-gradient-to-r from-pink-500 to-orange-500 text-white">
              {work.amount}
            </Chip>
          </div>
          <p className="text-base mb-4">{work.review}</p>
          <div className="flex items-center mb-4">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={i < work.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-lg font-medium">{work?.rating?.toFixed(1)}</span>
          </div>
          <div className="flex items-center">
            <Avatar src={work.clientAvatar} size="lg" className="mr-4" />
            <div>
              <p className="font-semibold">{work.clientName}</p>
              <span className="text-sm text-gray-500">{new Date(work.date).toLocaleDateString()}</span>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};


const FeaturedProjectsCard = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const nextProjects = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 3) >= projects.length ? 0 : prevIndex + 3
    );
  };

  const prevProjects = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, projects.length - 3) : prevIndex - 3
    );
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    onOpen();
  };

  const visibleProjects = projects.slice(currentIndex, currentIndex + 3);

  return (
    <Card className="mb-6 bg-background shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
        <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
          <SolarLayersBroken size={22} className="text-primary mr-2" />
          Featured Projects
        </CardTitle>
      </CardHeader>
      <CardBody className="p-4 h-full">
        <div className="relative h-full">
          <div className="flex gap-4 h-full">
            {visibleProjects.map((project, index) => (
              <ProjectCard 
                key={index} 
                project={project} 
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <Button
              auto
              light
              onClick={prevProjects}
              disabled={currentIndex === 0}
              className="bg-background/50 backdrop-blur-md transition-all duration-300"
            >
              <ChevronLeft />
              Previous
            </Button>
            <Button
              auto
              light
              onClick={nextProjects}
              disabled={currentIndex + 3 >= projects.length}
              className="bg-background/50 backdrop-blur-md transition-all duration-300"
            >
              Next
              <ChevronRight />
            </Button>
          </div>
        </div>
      </CardBody>
      <ProjectDetailModal project={selectedProject} isOpen={isOpen} onClose={onClose} />
    </Card>
  );
};

const ProjectCard = ({ project, onClick }) => (
  <div 
    className="flex-shrink-0 w-full sm:w-[calc(33.333%-1rem)] min-w-[250px] group cursor-pointer"
    onClick={onClick}
  >
    <Card className="h-full rounded-[2.5rem] hover:shadow-lg transition-shadow duration-300">
      <CardBody className="p-1">
        <div className="relative h-full w-full">
          <Image
            src={project.image}
            alt={project.title}
            className="rounded-[2.5rem] object-cover shadow-lg backdrop:blur-sm h-56 w-full"
          />
     
        </div>
        <div className="py-2 px-4">
          <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
         
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0,2).map((tech, index) => (
              <Chip key={index} className="text-xs bg-primary/10 text-primary">
                {tech}
              </Chip>
            ))}
            {project.technologies.length > 2 && (
              <Chip className="text-xs bg-primary/10 text-primary">
                +{project.technologies.length - 2}
              </Chip>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  </div>
);

const ProjectDetailModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="2xl"
      scrollBehavior="inside"
      className="rounded-[2.5rem]"
    
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-xl font-bold">{project.title}</h2>
          <p className="text-sm text-gray-500">{project.category}</p>
        </ModalHeader>
        <ModalBody>
          <ScrollArea className="w-full h-[800px]  rounded-md">
          
          
          <div className="mb-6 w-full h-full">
            <Image
              src={project.image}
              alt={project.title}
              layout="responsive"
              
              classNames={{
                wrapper: "rounded-xl min-w-full h-full overflow-hidden",
                img: "rounded-[2.5rem] min-w-full h-full object-cover",
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <ProjectInfoItem icon={<Calendar />} label="Completion Date" value={project.completionDate} />
            <ProjectInfoItem icon={<User />} label="Client" value={project.client} />
            <ProjectInfoItem icon={<Code />} label="Project Type" value={project.type} />
            <ProjectInfoItem icon={<LinkIcon />} label="Industry" value={project.industry} />
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Project Overview</h3>
            <p className="text-sm text-gray-600">{project.description}</p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Key Features</h3>
            <ul className="list-disc list-inside space-y-1">
              {project.features?.map((feature, index) => (
                <li key={index} className="text-sm text-gray-600">{feature}</li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <Chip key={index} className="bg-primary/10 text-primary">
                  {tech}
                </Chip>
              ))}
            </div>
          </div></ScrollArea>
        </ModalBody>
        <ModalFooter>
          {project.demoLink && (

<Button
size="sm"
className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold rounded-full 
transition-all duration-100 transform hover:scale-105 mr-2"
endContent={<ExternalLink size={16} />}
as="a"
href={project.demoLink}
target="_blank"
>
Live Demo!
</Button>


      
          )}
          {project.githubLink && (
            <Button
            size="sm"
            className="rounded-full"
              variant="solid"
              endContent={<Github size={16} />}
              as="a"
              href={project.githubLink}
              target="_blank"
            >
              View Code
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ProjectInfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-2">
    <div className="p-2 rounded-full bg-primary/10">
      {React.cloneElement(icon, { size: 16, className: "text-primary" })}
    </div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  </div>
);


const WorkHistoryCard = ({ workHistory }) => (
  <Card className="bg-accent shadow backdrop-blur-0 rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50 overflow-hidden">
    <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
      <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
        <FluentBriefcaseSearch20Regular size={22} className="text-primary mr-2" />
        Work History
      </CardTitle>
    </CardHeader>
    <CardBody className="p-4">
      <div className="relative">
       
        {workHistory.map((work, index) => (
          <WorkHistoryItem 
            key={index} 
            work={work} 
            isLast={index === workHistory.length - 1}
          />
        ))}
      </div>
    </CardBody>
  </Card>
);

const WorkHistoryItem = ({ work, isLast }) => (
  <div className="flex items-start space-x-4 mb-4 relative">

    <div className=" w-full ">
    
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src={`https://avatar.iran.liara.run/public/`}
              alt={`${work.company} logo`}
              width={40}
              height={40}
              className="rounded-full bg-white p-1 shadow-md"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${work.company}&background=random`;
              }}
            />
            <div>
              <h3 className="font-semibold text-sm">{work.title}</h3>
              <p className="text-xs">{work.company}</p>
            </div>
          </div>
          <Chip className="text-xs">
            {work.period}
          </Chip>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {work.description}
        </p>
 
    </div>
  </div>
);

const LanguageesCard = ({ languages }) => (
  <Card className="bg-accent shadow backdrop-blur-0 rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50 overflow-hidden">
    <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
      <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
        <LanguagesIcon size={22} className="text-primary mr-2" />
        Languages
      </CardTitle>
    </CardHeader>
    <CardBody className="p-4">
    <div className="flex flex-wrap gap-2">
            {languages.map((lang, index) => (
              <Chip 
                key={index} 
                className="bg-gradient-to-r from-pink-500/10 to-orange-500/10"
              >
                {lang} 
              </Chip>
            ))}
          </div>
    </CardBody>
  </Card>
);

const SkillsCard = ({ skills }) => (
  <Card className=" bg-accent shadow backdrop-blur-0 rounded-[2.5rem] border-medium border-default  bg-gradient-to-br from-background to-muted/50 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
    <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
      <motion.div
  
        className="mr-2"
      >
        <F7Wrench size={22} className="text-primary" />
      </motion.div>
      Skills
    </CardTitle>
  </CardHeader>
    <CardBody className="p-4">
     
      <div className="flex flex-wrap gap-1 ">
        {skills.map((skill, index) => (
          <div key={index}>
            <Chip className="font-semibold bg-gradient-to-r from-pink-500 to-orange-500 text-white" >{skill.name}</Chip>
     
          </div>
        ))}
      </div>
    </CardBody>
  </Card>
);

const SocialsCard = () => (
  <Card className=" bg-accent shadow backdrop-blur-0 rounded-[2.5rem] border-medium border-default  bg-gradient-to-br from-background to-muted/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
    <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
      <motion.div
  
        className="mr-2"
      >
        <HugeiconsContact size={22} className="text-primary" />
      </motion.div>
      Contacts
    </CardTitle>
  </CardHeader>
    <CardBody className="p-4">
 
    <ul className="space-y-2">
     <li className="flex gap-2 "> <h3>  Phone:</h3> <span>+1 233 232 233</span></li>
     <li className="flex gap-2 "> <h3>  Email:</h3> <span>hello@mywebsite.com</span></li>
     <li> <ProfileSocials /></li>
     </ul>
     
    </CardBody>
  </Card>
);
const CertificationsCard = ({ certifications }) => {
  return (
    <Card className="bg-accent shadow backdrop-blur-0 rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
        <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
          <motion.div
 
            className="mr-2"
          >
            <CarbonBadge size={22} className="text-primary" />
          </motion.div>
          Certifications
        </CardTitle>
      </CardHeader>
      <CardBody className="p-4">
        <motion.ul className="space-y-2">
          {certifications.map((certification, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group mb-4 "
            >
              <div className=" transition-colors duration-300  ">
                
                  <div className="flex gap-3 content-center items-center align-middle ">
                    <ClarityCertificateLine className="text-primary" size={20} />
                    <div>
                      <h3 className="font-medium group-hover:text-primary transition-colors duration-300">{certification.name}</h3>
                      <p className="text-xs text-gray-500">{certification.issuer}</p>
                    </div>
                  </div>
   
              </div>
            </motion.li>
          ))}
        </motion.ul>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center"
        >
            <Button
                
                type="submit"
                size="sm"
                className={` text-xs bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold rounded-full 
                transition-all duration-100 transform hover:scale-105 `}
                endContent={<ChevronRight size={16} />}
              >
                View all!
              </Button>
     
        </motion.div>
      </CardBody>
    </Card>
  );
};
const EducationCard = ({education}) => (
  <Card className="border-medium border-default rounded-3xl bg-gradient-to-br from-background to-muted/50 overflow-hidden">
  <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
    <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
      <motion.div
  
        className="mr-2"
      >
        <TrendingUp size={24} className="text-primary" />
      </motion.div>
      Education
    </CardTitle>
  </CardHeader>
  <CardContent className="p-4">
    <AnimatePresence>
    <div className="relative">
     
        {education.map((ed, index) => (
          <EducationItem 
            key={index} 
            education={ed} 
            isLast={index === education.length - 1}
          />
        ))}
      </div>
    </AnimatePresence>
  </CardContent>
</Card>
);

const EducationItem = ({ education, isLast }) => (
  <div className="flex items-start space-x-4 mb-4 relative">

    <div className="w-full ">
    
        <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
            <Image
              src={`https://avatar.iran.liara.run/public/`}
              alt={`${education.company} logo`}
              width={40}
              height={40}
              className="rounded-full bg-white p-1 shadow-md"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${education.company}&background=random`;
              }}
            />
            <div>
              <h3 className="font-semibold text-sm">{education.degree}</h3>
              <p className="text-xs">{education.school}</p>
            </div>
          </div>
          <Chip className="text-xs">
            {education.year}
          </Chip>
        </div>
      
    
    </div>
  </div>
);

const EducationCard2 = ({education}) => (
  <Card className="border-medium border-default rounded-3xl bg-gradient-to-br from-background to-muted/50 overflow-hidden">
  <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
    <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
      <motion.div
  
        className="mr-2"
      >
        <TrendingUp size={24} className="text-primary" />
      </motion.div>
      Education
    </CardTitle>
  </CardHeader>
  <CardContent className="p-4">
    <AnimatePresence>

    </AnimatePresence>
  </CardContent>
</Card>
);

export default UserPage;
