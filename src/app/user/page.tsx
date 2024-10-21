"use client";
import { Avatar, Badge, CardHeader, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Progress,  Tab,  Tabs,  Tooltip, useDisclosure } from "@nextui-org/react";
import {
  Award,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  MapPinIcon,
  Star,
  TrendingUp,

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

const UserPage = () => {
  const user = {
    name: "Sophia Rodriguez",
    username: "sophiarodriguez",
    location: "San Francisco, CA",
    title: "Full Stack Developer & UX/UI Designer",
    avatar: "https://avatar.iran.liara.run/public",
    tags: ["React", "Node.js", "UI/UX", "MongoDB", "TypeScript"],
    bio: "Passionate full-stack developer with 7+ years of experience crafting innovative web and mobile applications. Specializing in creating seamless user experiences backed by robust, scalable architectures. Committed to staying at the forefront of technology trends and delivering solutions that exceed client expectations.",

    projects: [
      {
        title: "EcoTrack",
        description:
          "A sustainability tracking app helping users reduce their carbon footprint.",
        image: "https://picsum.photos/seed/ecotrack/400/250",
        technologies: ["React Native", "Firebase", "Node.js", "MongoDB"],
      },
      {
        title: "EcoTrack",
        description:
          "A sustainability tracking app helping users reduce their carbon footprint.",
        image: "https://picsum.photos/seed/ecotrack/400/250",
        technologies: ["React Native", "Firebase", "Node.js", "MongoDB"],
      },
      {
        title: "EcoTrack",
        description:
          "A sustainability tracking app helping users reduce their carbon footprint.",
        image: "https://picsum.photos/seed/ecotrack/400/250",
        technologies: ["React Native", "Firebase", "Node.js", "MongoDB"],
      },
      {
        title: "EcoTrack",
        description:
          "A sustainability tracking app helping users reduce their carbon footprint.",
        image: "https://picsum.photos/seed/ecotrack/400/250",
        technologies: ["React Native", "Firebase", "Node.js", "MongoDB"],
      },
      // ... other projects
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


    inProgressWork : [
      {
        title: "Mobile App Development",
        clientName: "FitnessPro",
        amount: "$5,000",
        rating: null, // or omit if not applicable
        review: "Project is on track and progressing well.",
        clientAvatar: "https://i.pravatar.cc/150?u=fitnesspro",
        date: "2023-11-01"
      },
      {
        title: "Mobile App Development",
        clientName: "FitnessPro",
        amount: "$5,000",
        rating: null, // or omit if not applicable
        review: "Project is on track and progressing well.",
        clientAvatar: "https://i.pravatar.cc/150?u=fitnesspro",
        date: "2023-11-01"
      },
      {
        title: "Mobile App Development",
        clientName: "FitnessPro",
        amount: "$5,000",
        rating: null, // or omit if not applicable
        review: "Project is on track and progressing well.",
        clientAvatar: "https://i.pravatar.cc/150?u=fitnesspro",
        date: "2023-11-01"
      },
      {
        title: "Mobile App Development",
        clientName: "FitnessPro",
        amount: "$5,000",
        rating: null, // or omit if not applicable
        review: "Project is on track and progressing well.",
        clientAvatar: "https://i.pravatar.cc/150?u=fitnesspro",
        date: "2023-11-01"
      },
      {
        title: "Mobile App Development",
        clientName: "FitnessPro",
        amount: "$5,000",
        rating: null, // or omit if not applicable
        review: "Project is on track and progressing well.",
        clientAvatar: "https://i.pravatar.cc/150?u=fitnesspro",
        date: "2023-11-01"
      },
    ],

    completedWork : [
      {
        title: "E-commerce Website Redesign",
        clientName: "TechStore Inc.",
        amount: "$2,500",
        rating: 4.8,
        review: "Sophia did an excellent job redesigning our e-commerce platform.",
        clientAvatar: "https://i.pravatar.cc/150?u=techstore",
        date: "2023-10-15"
      },
      {
        title: "E-commerce Website Redesign",
        clientName: "TechStore Inc.",
        amount: "$2,500",
        rating: 4.8,
        review: "Sophia did an excellent job redesigning our e-commerce platform.",
        clientAvatar: "https://i.pravatar.cc/150?u=techstore",
        date: "2023-10-15"
      },
      {
        title: "E-commerce Website Redesign",
        clientName: "TechStore Inc.",
        amount: "$2,500",
        rating: 4.8,
        review: "Sophia did an excellent job redesigning our e-commerce platform.",
        clientAvatar: "https://i.pravatar.cc/150?u=techstore",
        date: "2023-10-15"
      },
      {
        title: "E-commerce Website Redesign",
        clientName: "TechStore Inc.",
        amount: "$2,500",
        rating: 4.8,
        review: "Sophia did an excellent job redesigning our e-commerce platform.",
        clientAvatar: "https://i.pravatar.cc/150?u=techstore",
        date: "2023-10-15"
      },
      {
        title: "E-commerce Website Redesign",
        clientName: "TechStore Inc.",
        amount: "$2,500",
        rating: 4.8,
        review: "Sophia did an excellent job redesigning our e-commerce platform.",
        clientAvatar: "https://i.pravatar.cc/150?u=techstore",
        date: "2023-10-15"
      },
      // ... more completed work items
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
          <AboutMeCard bio={user.bio} />  
          <ReviewsCard completedWork={user.completedWork} inProgressWork={user.inProgressWork} />
          <FeaturedProjectsCard projects={user.projects} />
        </div>
        <div className="flex flex-col lg:w-1/3 gap-6">
      
         
          <SkillsCard skills={user.skills} />
          <WorkHistoryCard workHistory={user.workHistory} />
          <CertificationsCard certifications={user.certifications} />
          <EducationCard education={user.education} />
          <SocialsCard/>
          <LanguageesCard languages={user.languages} />
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


const AboutMeCard = ({ bio }) => (
  <div className="mb-6 p-4  rounded-[2.5rem]">

      <h2 className="text-2xl font-semibold mb-2 text-foreground">About Me</h2>
      <p className="text-md text-foregound/70">{bio}</p>
   
  </div>
);

const ReviewsCard = ({ completedWork, inProgressWork }) => {
  const [activeTab, setActiveTab] = useState("completed");
  const [selectedWork, setSelectedWork] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const currentWork = activeTab === "completed" ? completedWork : inProgressWork;
  const displayedWork = currentWork.slice(0, 4);

  const handleWorkClick = (work) => {
    setSelectedWork(work);
    onOpen();
  };

  return (
    <Card className="mb-6 bg-background shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 flex justify-between ">
        <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
          <HugeiconsNoteDone size={22} className="text-primary mr-2" />
          Recent Work
        </CardTitle><div className=" antialiased flex border-medium border-default bg-muted rounded-full p-1">
          <TabButton
            isActive={activeTab === "completed"}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </TabButton>
          <TabButton
            isActive={activeTab === "inProgress"}
            onClick={() => setActiveTab("inProgress")}
          >
            In Progress
          </TabButton>
        </div>
      </CardHeader>
      <CardBody className="p-4">
        
        <div className="space-y-2">
          {displayedWork.map((work, index) => (
            <RecentWorkItem key={index} work={work} onClick={() => handleWorkClick(work)} />
          ))}
        </div>
        {currentWork.length > 3 && (
          <div className="mt-4 text-center rounded-3xl">
            <Button
              size="sm"
              className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold rounded-full 
              transition-all duration-100 transform hover:scale-105"
              endContent={<ChevronRight size={16} />}
            >
              View more!
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
    className={`flex-1 py-2 px-4 text-xs rounded-full transition-all duration-300 ${
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
              <ProjectCard key={index} project={project} />
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
    </Card>
  );
};

const ProjectCard = ({ project }) => (
  <div className="flex-shrink-0 w-full sm:w-[calc(33.333%-1rem)] min-w-[250px] group">
    <Card className="h-full rounded-[2.5rem] ">
      <CardBody className="">
        <div className="relative p-2px w-full">
          <Image
            src={project.image}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="rounded-[2.5rem]"
          />
    
        </div>
        <div className="py-2 px-4">
          <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
          <p className="text-sm  mb-3 line-clamp-2  ">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0,2).map((tech, index) => (
              <Chip key={index} className="text-xs">
                {tech}
              </Chip>
            ))}
            {project.technologies.length > 2 && (
              <Chip className="text-xs">
                +{project.technologies.length - 2}
              </Chip>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
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
        <Award size={22} className="text-primary mr-2" />
        Languages
      </CardTitle>
    </CardHeader>
    <CardBody className="p-4">
      <div className="flex flex-wrap gap-2">
        {languages.map((language, index) => (
          <Chip key={index} className="text-xs">
            {language}
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
            <Chip className="font-semibold hover:bg-foreground-200" >{skill.name}</Chip>
     
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
