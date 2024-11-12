import { Button, Progress } from '@nextui-org/react';
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { AboutMeCard } from './components/About/AboutMe';
import { ProfileHeader } from './components/Header/ProfileHeader';
import { ProfileStats } from './components/Header/ProfileStats';
import { ReviewsCard } from './components/Reviews/ReviewsCard';
import { FeaturedProjectsCard } from './components/Projects/ProjectCard';
import { SkillsCard } from './components/Sidebar/SkillsCard';
import { WorkHistoryCard } from './components/Sidebar/WorkHistoryCard';
import { LanguageesCard } from './components/Sidebar/LanguagesCard';
import { CertificationsCard } from './components/Sidebar/CertificationsCard';
import { EducationCard } from './components/Sidebar/EducationCard';
import { ArrowUpRight, Zap } from 'lucide-react';

interface UserPageProps {
  params: {
    username: string
  }
}

async function getUserProfile(username: string) {
  // Simulated API call - replace with your actual data fetching logic
 /*  const res = await fetch(`https://api.example.com/users/${username}`, {
    next: {
      revalidate: 3600 // Cache for 1 hour
    }
  })
  
  if (!res.ok) {
    return null
  } */

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
      quickFacts: [
        {
          icon: "Globe",
          title: "Location",
          value: "San Francisco, CA"
        },
        {
          icon: "Briefcase",
          title: "Experience",
          value: "7+ Years"
        },
    
      ],
      
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
  
  return user
}

function UserProfileSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-32 w-32 rounded-full bg-gray-200 mb-4"/>
      <div className="h-8 w-64 bg-gray-200 mb-4"/>
      <div className="h-4 w-48 bg-gray-200"/>
    </div>
  )
}

export async function generateMetadata({ params }: UserPageProps) {
  const user = await getUserProfile(params.username)

  if (!user) {
    return {
      title: 'User Not Found'
    }
  }
  
  return {
    title: `${user.name}'s Profile | deFlexy`,
    description: `View ${user.name}'s profile and activity`
  }
}

export default async function UserProfilePage({ params }: UserPageProps) {
  const user = await getUserProfile(params.username)

  if (!user) {
    notFound()
  }
  
  return (
    <Suspense fallback={<UserProfileSkeleton />}>
    
    <div className="w-full   ">

        <div className="w-full max-w-[1600px] mx-auto mb-6">
          <div className="bg-background/60 backdrop-blur-md shadow-medium rounded-[2.5rem] border-medium border-default overflow-hidden">
       
            
            <div className="p-6 space-y-6">
              {/* Header Section */}
              <div className="flex flex-col sm:flex-row gap-8 items-center">
                {/* Enhanced Progress Circle */}
                <div className="relative w-32 h-32 group">
                  {/* Outer decorative ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 animate-spin-slow opacity-20" />
                  
                  <div className="absolute inset-1 rounded-full bg-background/80 backdrop-blur-sm" />
                  
                  <svg className="w-full h-full relative" viewBox="0 0 100 100">
                    {/* Decorative background circles */}
                    <circle
                      className="text-default-100/20"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="transparent"
                      r="44"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-default-100/10"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="38"
                      cx="50"
                      cy="50"
                    />
                    
                    {/* Main progress circle */}
                    <circle
                      className="text-primary transition-all duration-1000 ease-out"
                      strokeWidth="6"
                      strokeLinecap="round"
                      stroke="url(#progressGradient)"
                      fill="transparent"
                      r="41"
                      cx="50"
                      cy="50"
                      style={{
                        strokeDasharray: `${2 * Math.PI * 41}`,
                        strokeDashoffset: `${2 * Math.PI * 41 * (1 - 65 / 100)}`,
                        transform: 'rotate(-90deg)',
                        transformOrigin: '50% 50%'
                      }}
                    />
                    
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="50%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#f97316" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Centered percentage with animated background */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-pink-500 to-red-500">
                        65%
                      </span>
                      <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs text-default-500">
                        Complete
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Details */}
                <div className="flex-1 space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-pink-500 to-red-500">
                        Profile Completion
                      </h3>
                      <p className="text-default-500 text-sm mt-1">Complete your profile to increase visibility</p>
                    </div>
       {/*              <Button
                      className="group bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg 
                        hover:shadow-orange-500/25 transition-all duration-300 rounded-xl"
                      size="sm"
                      endContent={
                        <ArrowUpRight 
                          size={16} 
                          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        />
                      }
                    >
                      Complete Profile
                    </Button> */}
                  </div>
                  
                  {/* Progress Sections Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { name: 'About', progress: 100 },
                      { name: 'Skills', progress: 80 },
                      { name: 'Portfolio', progress: 40 },
                      { name: 'Contact', progress: 60 }
                    ].map((section) => (
                      <div key={section.name} 
                        className="group p-4 rounded-xl bg-default/40 backdrop-blur-md hover:bg-default/60 
                          transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{section.name}</span>
                            <span className="text-xs text-default-500">{section.progress}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-default-200/50 overflow-hidden">
                            <div 
                              className="h-full rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 
                                transition-all duration-500 ease-out group-hover:opacity-90"
                              style={{ width: `${section.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Tips Section */}
              <div className="mt-6 p-4 rounded-2xl bg-default/40 backdrop-blur-md border border-default-200">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Zap size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Profile Tip</p>
                    <p className="text-xs text-default-500 mt-1">
                      A complete profile increases your chances of being discovered by 75%. 
                      Add your recent projects and skills to stand out.
                    </p>
                  </div>
                </div>
              </div>
            </div>
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

      <div className="flex w-full flex-col  sm:px-10 pb-10">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-grow lg:w-2/3">
          <AboutMeCard aboutData={user.aboutData} onUpdate={undefined} />  
          <ReviewsCard completedWork={user.completedWork} inProgressWork={user.inProgressWork} />
          <FeaturedProjectsCard projects={user.projects} />
        </div>
        <div className="flex flex-col lg:w-1/3 gap-6">
      
         
          <SkillsCard skills={user.skills} onUpdate={undefined} />
          <WorkHistoryCard workHistory={user.workHistory} onUpdate={undefined} />
          <EducationCard education={user.education} />
          <CertificationsCard certifications={user.certifications} />
          <LanguageesCard languages={user.languages} />
          
          {/* <Socials/> */}
        </div>
      </div>
    </div>

  {/*     <ProfileDock /> */}
    </div>

    </Suspense>
  )
}