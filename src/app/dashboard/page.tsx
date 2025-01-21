"use client";
import React, { useState } from "react";
import {
  Button,
} from "@nextui-org/react";
import {
  Plus,
  Users,
  Wallet,
  BarChart2,
  FileCheck,
  HandCoinsIcon,
  LayoutDashboardIcon,
  MessageCircleMoreIcon,
  Settings,
} from "lucide-react";
import { FluentBriefcase20Filled, FluentBriefcaseSearch20Regular, MingcuteUser3Fill } from "@/components/icons/icons";
import { ActivityLogIcon } from "@radix-ui/react-icons";
import { AnalyticsTab } from "./components/AnalyticsTab/AnalyticsTab";

import { PaymentsTab } from "./components/PaymentTab/PaymentTab";
import { ProjectsTab } from "./components/ProjectsTab/ProjectsTab";
import { TalentTab } from "./components/TalentTab/TalentTab";
import { useLogin, usePrivy } from "@privy-io/react-auth";

import { motion } from "framer-motion";
import { SettingsTab } from "./components/SettingsTab/SettingsTab";
import OverviewTab from "./components/OverviewTab/OverviewTab";
import { InboxTab } from "./components/InboxTab/InboxTab";
import { NewProjectDrawer } from "./components/NewProjectDrawer";



const stats = [
    {
      title: "Active Projects",
      value: "12",
      trend: "+2",
      trendLabel: "from last month",
      icon: FluentBriefcase20Filled,
      color: "text-pink-500",
      background: "bg-pink-500/10",
    },
    {
      title: "Available Balance",
      value: "$45,200",
      trend: "+12.5%",
      trendLabel: "from last month",
      icon: Wallet,
      color: "text-orange-500",
      background: "bg-orange-500/10",
    },
    {
      title: "Active Contracts",
      value: "8",
      trend: "+1",
      trendLabel: "this week",
      icon: FileCheck,
      color: "text-blue-500",
      background: "bg-blue-500/10",
    },
    {
      title: "Total Hired",
      value: "34",
      trend: "+5",
      trendLabel: "this month",
      icon: Users,
      color: "text-green-500",
      background: "bg-green-500/10",
    },
  ];

  const mockData = {
    projects: [
      {
        id: 1,
        title: "NFT Marketplace Development",
        category: "Blockchain",
        status: "in_progress",
        priority: "high",
        budget: {
          amount: 25000,
          spent: 15000,
          currency: "USD",
        },
        timeline: {
          startDate: "2024-01-15",
          endDate: "2024-03-30",
          progress: 65,
        },
        team: [
          {
            id: 1,
            name: "Alex Morgan",
            avatar: "/avatars/alex.jpg",
            role: "Lead Developer",
          },
          {
            id: 2,
            name: "Sarah Chen",
            avatar: "/avatars/sarah.jpg",
            role: "Smart Contract Developer",
          },
          {
            id: 3,
            name: "David Kim",
            avatar: "/avatars/david.jpg",
            role: "Frontend Developer",
          },
        ],
        milestones: [
          { id: 1, title: "Smart Contract Development", completed: true },
          { id: 2, title: "Frontend Integration", completed: true },
          { id: 3, title: "Testing & Audit", completed: false },
          { id: 4, title: "Deployment", completed: false },
        ],
        recentActivity: [
          {
            id: 1,
            type: "milestone",
            description: "Milestone 2 completed",
            timestamp: "2024-02-10T10:30:00Z",
          },
          {
            id: 2,
            type: "payment",
            description: "Payment released - $5,000",
            timestamp: "2024-02-09T15:45:00Z",
          },
        ],
      },
      {
        id: 2,
        title: "DeFi Protocol Smart Contracts",
        category: "Blockchain",
        status: "in_progress",
        priority: "high",
        budget: {
          amount: 35000,
          spent: 20000,
          currency: "USD",
        },
        timeline: {
          startDate: "2024-02-01",
          endDate: "2024-04-15",
          progress: 45,
        },
        team: [
          {
            id: 4,
            name: "Emma Wilson",
            avatar: "/avatars/emma.jpg",
            role: "Solidity Developer",
          },
          {
            id: 5,
            name: "Michael Chang",
            avatar: "/avatars/michael.jpg",
            role: "Security Auditor",
          },
        ],
        milestones: [],
        recentActivity: [
          {
            id: 3,
            type: "milestone",
            description: "Core Protocol Development completed",
            timestamp: "2024-02-11T09:15:00Z",
          },
        ],
      },
      {
        id: 3,
        title: "Web3 Mobile App Design",
        category: "Design",
        status: "review",
        priority: "medium",
        budget: {
          amount: 18000,
          spent: 12000,
          currency: "USD",
        },
        timeline: {
          startDate: "2024-01-20",
          endDate: "2024-03-15",
          progress: 85,
        },
        team: [
          {
            id: 6,
            name: "Sophie Lee",
            avatar: "/avatars/sophie.jpg",
            role: "UI/UX Designer",
          },
          {
            id: 7,
            name: "James Miller",
            avatar: "/avatars/james.jpg",
            role: "Product Designer",
          },
        ],
        milestones: [
          { id: 9, title: "Wireframes", completed: true },
          { id: 10, title: "UI Design", completed: true },
          { id: 11, title: "Prototyping", completed: true },
          { id: 12, title: "User Testing", completed: false },
        ],
        recentActivity: [
          {
            id: 4,
            type: "message",
            description: "Design review feedback received",
            timestamp: "2024-02-12T14:20:00Z",
          },
        ],
      },
      {
        id: 4,
        title: "Smart Contract Security Audit",
        category: "Security",
        status: "completed",
        priority: "high",
        budget: {
          amount: 15000,
          spent: 15000,
          currency: "USD",
        },
        timeline: {
          startDate: "2024-01-10",
          endDate: "2024-02-10",
          progress: 100,
        },
        team: [
          {
            id: 8,
            name: "Ryan Park",
            avatar: "/avatars/ryan.jpg",
            role: "Security Expert",
          },
          {
            id: 9,
            name: "Lisa Chen",
            avatar: "/avatars/lisa.jpg",
            role: "Code Auditor",
          },
        ],
        milestones: [
          { id: 13, title: "Initial Audit", completed: true },
          { id: 14, title: "Vulnerability Assessment", completed: true },
          { id: 15, title: "Fix Verification", completed: true },
          { id: 16, title: "Final Report", completed: true },
        ],
        recentActivity: [
          {
            id: 5,
            type: "file",
            description: "Final audit report submitted",
            timestamp: "2024-02-10T16:45:00Z",
          },
        ],
      },
      {
        id: 5,
        title: "DAO Governance Implementation",
        category: "Blockchain",
        status: "blocked",
        priority: "medium",
        budget: {
          amount: 28000,
          spent: 8000,
          currency: "USD",
        },
        timeline: {
          startDate: "2024-02-05",
          endDate: "2024-04-30",
          progress: 25,
        },
        team: [
          {
            id: 10,
            name: "Tom Wilson",
            avatar: "/avatars/tom.jpg",
            role: "Backend Developer",
          },
          {
            id: 11,
            name: "Nina Patel",
            avatar: "/avatars/nina.jpg",
            role: "Smart Contract Developer",
          },
        ],
        milestones: [
          { id: 17, title: "Token Contract", completed: true },
          { id: 18, title: "Voting Mechanism", completed: false },
          { id: 19, title: "Frontend Development", completed: false },
          { id: 20, title: "Testing & Launch", completed: false },
        ],
        recentActivity: [
          {
            id: 6,
            type: "alert",
            description: "Dependency issue blocking progress",
            timestamp: "2024-02-12T11:30:00Z",
          },
        ],
      },
      {
        id: 6,
        title: "Cross-Chain Bridge Development",
        category: "Blockchain",
        status: "in_progress",
        priority: "high",
        budget: {
          amount: 42000,
          spent: 18000,
          currency: "USD",
        },
        timeline: {
          startDate: "2024-02-01",
          endDate: "2024-05-15",
          progress: 35,
        },
        team: [
          {
            id: 12,
            name: "Chris Anderson",
            avatar: "/avatars/chris.jpg",
            role: "Protocol Developer",
          },
          {
            id: 13,
            name: "Maria Garcia",
            avatar: "/avatars/maria.jpg",
            role: "Integration Specialist",
          },
          {
            id: 14,
            name: "Kevin Zhang",
            avatar: "/avatars/kevin.jpg",
            role: "Security Engineer",
          },
        ],
        milestones: [
          { id: 21, title: "Architecture Design", completed: true },
          { id: 22, title: "Smart Contract Development", completed: true },
          { id: 23, title: "Security Implementation", completed: false },
          { id: 24, title: "Testing & Deployment", completed: false },
        ],
        recentActivity: [
          {
            id: 7,
            type: "milestone",
            description: "Architecture design approved",
            timestamp: "2024-02-13T10:15:00Z",
          },
          {
            id: 8,
            type: "payment",
            description: "Milestone 1 payment released",
            timestamp: "2024-02-12T16:30:00Z",
          },
        ],
      },
    ],

    topFreelancers: [
      {
        id: 1,
        name: "Sarah Chen",
        avatar: "/avatars/sarah.jpg",
        role: "Blockchain Developer",
        rating: 4.9,
        hourlyRate: 85,
        availability: "Available",
        skills: ["Solidity", "React", "Node.js"],
        completedProjects: 23,
        totalEarnings: 125000,
      },
      // Add more freelancers...
    ],

    recentlyViewed: [
      {
        id: 1,
        type: "project",
        title: "DeFi Platform Development",
        subtitle: "Active Project",
        timestamp: "2024-02-10T14:30:00Z",
      },
      {
        id: 2,
        type: "freelancer",
        title: "Alex Morgan",
        subtitle: "Full Stack Developer",
        image: "/avatars/alex.jpg",
        timestamp: "2024-02-10T13:15:00Z",
      },
      // Add more items...
    ],

    analytics: {
      spending: {
        total: 145000,
        monthly: [
          { month: "Jan", amount: 25000 },
          { month: "Feb", amount: 30000 },
          // Add more months...
        ],
        byCategory: [
          { category: "Development", amount: 80000 },
          { category: "Design", amount: 35000 },
          { category: "Marketing", amount: 30000 },
        ],
      },
      projectMetrics: {
        completion: 92,
        onTime: 88,
        onBudget: 95,
        satisfaction: 4.8,
      },
    },
  };

  const tabOptions = [
    { key: "overview", label: "Overview", icon: ActivityLogIcon },
    { key: "projects", label: "Projects", icon: FluentBriefcaseSearch20Regular },
    { key: "talent", label: "Talent Pool", icon: Users },
    { key: "payments", label: "Payments", icon: Wallet },
    { key: "analytics", label: "Analytics", icon: BarChart2 },
  ];

  const mockFreelancers = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "https://avatar.iran.liara.run/public",
      role: "Senior React Developer",
      team: "development",
      rating: 4.9,
      hourlyRate: 85,
      availability: "Available",
      skills: ["React", "Node.js", "TypeScript"],
      completedProjects: 23,
    },
    {
      id: 2,
      name: "Alex Morgan",
      avatar: "https://avatar.iran.liara.run/public",
      role: "UI/UX Designer",
      team: "design",
      rating: 4.8,
      hourlyRate: 75,
      availability: "Available",
      skills: ["Figma", "Adobe XD", "UI Design"],
      completedProjects: 18,
    },
    // Add more freelancers...
  ];

const ClientDashboard = () => {
  const [tab, setTab] = useState("overview");
  const [isNewProjectDrawerOpen, setIsNewProjectDrawerOpen] = useState(false);

  const getPageTitle = () => {
    const currentTab = menuItems.find(item => item.link === tab);
    return currentTab ? currentTab.text : "Overview";
  };

  const menuItems = [
    { icon: LayoutDashboardIcon, text: "Overview", link: "overview" },
    { icon: FluentBriefcaseSearch20Regular, text: "Projects", link: "projects" },
    { icon: Users, text: "Talent Pool", link: "talent" },
    { icon: HandCoinsIcon, text: "Payments", link: "payments" },
    { icon: BarChart2, text: "Analytics", link: "analytics" },
    { icon: MessageCircleMoreIcon, text: "Inbox", link: "inbox" },
    { icon: Settings, text: "Settings", link: "settings" },
  ];

  const renderTabContent = () => {
    switch (tab) {
      case "overview":
        return <OverviewTab stats={stats} projects={mockData.projects}  />;
      case "projects":
        return <ProjectsTab projects={mockData.projects} />;
      case "talent":
        return <TalentTab freelancers={mockFreelancers.map(f => ({
          ...f,
          id: f.id.toString(),
          title: f.role
        }))} />;
      case "payments":
        return <PaymentsTab />;
      case "analytics":
        return <AnalyticsTab />;
      case "settings":
        return <SettingsTab />;
      case "inbox":
        return <InboxTab />;
      default:
        return <OverviewTab stats={stats} projects={undefined}  />;
    }
  };


  
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { ready, authenticated } = usePrivy();
  const { login } = useLogin({
    onComplete: () => setIsLoggingIn(false),
    onError: (error) => {
      console.error(error);
      setIsLoggingIn(false);
    },
  });

const disableLogin = !ready || (ready && authenticated);

  return (
    <div className="min-h-screen px-16">
      <title>{`Dashboard - ${getPageTitle()}`}</title>
      {/* Header Section */}
      <div className=" mx-auto">
        <div className="shadow-none rounded-[2.5rem] px-6 ">
          <div className="px-6 space-y-2">
           {/* Enhanced Header Section */}
    

          <div className="relative pb-10 ">
            {/* Top Bar */}
            <div className="flex items-center justify-between ">
              {/* Welcome Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-sm font-medium">Online</span>
                  </div>
                  <span className="text-default-500">Last login: Today, 9:30 AM</span>
                </div>
                <div className="space-y-1">
                  <h1 className="text-4xl font-bold">
                    Welcome back, Faizan
                    <span className="ml-2 inline-block animate-wave">👋</span>
                  </h1>
                  <p className="text-default-500">Here's what's happening with your projects today</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-3 justify-end">


            
      
  
               <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.12, delay: 0.1 }}
                whileHover={{ scale: 1.05 }}

                >
                    <Button 
                
                  className="bg-gradient-to-r from-pink-500 to-orange-600 text-white shadow-lg rounded-2xl"
                  startContent={<Plus className="w-4 h-4" />}
                  onClick={() => setIsNewProjectDrawerOpen(true)}
                >
                  New Project
                </Button>
                </motion.button>

  

              
                
              </div>
            </div>

       
          </div>
       

            {/* Navigation Menu */}
            <div className="flex justify-center md:justify-start">
              <div className="flex gap-3 overflow-x-auto pb-2">
                {menuItems.map((item, index) => (
                  <Button
                    key={index}
                    className={`flex gap-2 h-12 items-center rounded-[1.25rem] shadow-lg px-6 border-medium border-default transition-all duration-200
                      ${tab === item.link 
                        ? "bg-gradient-to-r from-pink-500 to-orange-600 text-white border-none" 
                        : "bg-default/40 hover:bg-default/60"}`}
                    onClick={() => setTab(item.link)}
                  >
                    <item.icon size={18} />
                    <span className="font-medium">{item.text}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className=" gap-6 m-4 sm:m-6 lg:m-8">
          {/* Main Content Area - Spans 8 columns */}
          <div className="lg:col-span-8 space-y-6">
            {renderTabContent()}
          </div>

        
        </div>
      </div>
      <NewProjectDrawer 
        isOpen={isNewProjectDrawerOpen}
        onClose={() => setIsNewProjectDrawerOpen(false)}
      />
    </div>
  );
};




export default ClientDashboard;
