import { Button, Progress } from '@nextui-org/react';
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { AboutMeCard, CertificationsCard, EducationCard, FeaturedProjectsCard, LanguageesCard, ProfileHeader, ProfileStats, ReviewsCard, SkillsCard, SocialsCard, WorkHistoryCard } from '../components/UserPageCards';

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
  console.log(user)
  if (!user) {
    notFound()
  }
  
  return (
    <Suspense fallback={<UserProfileSkeleton />}>
    
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

      <div className="flex w-full flex-col  sm:px-10 pb-10">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-grow lg:w-2/3">
          <AboutMeCard aboutData={user.aboutData} onUpdate={undefined} />  
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

    </Suspense>
  )
}