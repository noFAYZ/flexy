"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { 
  Card, CardBody, Button, Input, Chip, 
  Tabs, Tab, Dropdown, DropdownTrigger, 
  DropdownMenu, DropdownItem, Badge 
} from "@nextui-org/react";
import { 
  Briefcase, Search, Globe, Users, ArrowUpRight, 
  Target, SlidersHorizontal, ChevronDown, Coins, 
  Zap, Plus, Bookmark, 
  Filter
} from 'lucide-react';


import { FreelancerDashboard } from '../components/freelancer-dashboard';
import RecentBids from '../components/recent-bids';
import JobDetailsDrawer from '../components/application-drawr';
import FilterSidebar from '../components/filter-sidebar';
import { useToast } from '@/hooks/use-toast';
import { JobCard } from './components/JobCard';

const jobsData = [
    {
      id: 1,
      title: "Senior Solidity Developer for Advanced DeFi Protocol",
      excerpt: "Design and implement complex smart contracts for a groundbreaking DeFi protocol, focusing on yield optimization and risk management.",
      description: "We're seeking a seasoned Solidity developer to lead the development of our next-generation DeFi protocol. You'll be responsible for architecting and implementing advanced smart contracts that handle complex financial operations, including yield farming strategies, automated market-making, and cross-chain interactions. The ideal candidate will have a deep understanding of DeFi ecosystems, experience with gas optimization, and a strong background in smart contract security. You'll work closely with our research team to translate cutting-edge financial models into efficient, secure smart contract code.",
      category: "Smart Contracts",
      tags: ["Solidity", "Ethereum", "DeFi", "Security", "Yield Farming", "AMM", "Cross-chain"],
      client: {
        name: "DeFi Innovations Inc.",
        avatar: "https://i.pravatar.cc/150?img=1",
        location: "Remote (USA)",
        rating: 4.9,
        description: "Leading DeFi company specializing in innovative financial protocols and pushing the boundaries of decentralized finance."
      },
      budget: 12000,
      duration: "3 months",
      difficulty: 5,
      experienceLevel: "Expert",
      postedDate: "2 days ago",
      applicants: 18
    },
    {
      id: 2,
      title: "Blockchain UX/UI Designer for Next-Gen Decentralized Exchange",
      excerpt: "Create an intuitive and visually appealing interface for a high-performance decentralized exchange with advanced trading features.",
      description: "We're looking for a talented UX/UI designer to reimagine the user experience of decentralized trading. You'll be tasked with designing a sleek, user-friendly interface for our next-generation DEX, which includes features like real-time charting, advanced order types, and cross-chain swaps. The ideal candidate will have a strong portfolio showcasing clean, modern designs and a deep understanding of blockchain user behavior. You'll work closely with our product and development teams to create wireframes, prototypes, and final designs that balance aesthetics with functionality. Experience with designing for Web3 wallets and handling complex data visualizations is a big plus.",
      category: "Design",
      tags: ["UI/UX", "Figma", "Web3", "DEX", "Responsive Design", "Data Visualization", "User Research"],
      client: {
        name: "CryptoTrade Solutions",
        avatar: "https://i.pravatar.cc/150?img=2",
        location: "London, UK (Hybrid)",
        rating: 4.7,
        description: "Fast-growing startup building next-gen trading platforms to revolutionize the crypto trading experience for both retail and institutional users."
      },
      budget: 8000,
      duration: "2 months",
      difficulty: 3,
      experienceLevel: "Intermediate",
      postedDate: "1 week ago",
      applicants: 24
    },
    {
      id: 3,
      title: "Zero-Knowledge Proof Engineer for Privacy-Focused Layer 2 Scaling Solution",
      excerpt: "Implement and optimize ZK-SNARKs for a cutting-edge, privacy-focused Layer 2 scaling solution on Ethereum.",
      description: "We're seeking a brilliant Zero-Knowledge Proof Engineer to join our team in developing a state-of-the-art Layer 2 scaling solution that prioritizes user privacy. Your primary responsibility will be to design, implement, and optimize ZK-SNARK circuits for various cryptographic operations. This role requires a deep understanding of zero-knowledge proofs, elliptic curve cryptography, and Ethereum's architecture. You'll work on challenges such as minimizing proof generation time, reducing on-chain verification costs, and ensuring the overall security and efficiency of the system. Experience with Circom, snarkjs, or similar ZK frameworks is highly desirable. This is an opportunity to be at the forefront of blockchain scalability and privacy technology.",
      category: "Cryptography",
      tags: ["ZK-proofs", "Ethereum", "Layer 2", "Privacy", "Circom", "Elliptic Curve Cryptography", "Scalability"],
      client: {
        name: "ZK Scaling Labs",
        avatar: "https://i.pravatar.cc/150?img=3",
        location: "Berlin, Germany",
        rating: 4.8,
        description: "Pioneering research and development in zero-knowledge cryptography, focused on creating scalable and privacy-preserving blockchain solutions."
      },
      budget: 15000,
      duration: "6 months",
      difficulty: 5,
      experienceLevel: "Expert",
      postedDate: "3 days ago",
      applicants: 7
    },
    {
      id: 4,
      title: "Full-Stack NFT Marketplace Developer with Focus on Performance and User Experience",
      excerpt: "Build a high-performance, user-centric NFT marketplace with advanced trading features and multi-chain support.",
      description: "We're looking for a skilled full-stack developer to create a next-generation NFT marketplace. This project involves building a robust backend using Node.js, a responsive and interactive frontend with React, and integrating with multiple blockchain networks. You'll be responsible for implementing features such as lazy minting, fractional NFTs, auction mechanisms, and a recommendation engine. The ideal candidate will have experience with IPFS for decentralized storage, understanding of ERC standards (ERC-721, ERC-1155), and the ability to optimize for high concurrency. Knowledge of Layer 2 solutions for Ethereum is a plus. You'll work in an agile environment, collaborating closely with our design and blockchain teams to deliver a seamless user experience.",
      category: "NFT",
      tags: ["React", "Node.js", "IPFS", "ERC-721", "ERC-1155", "Multi-chain", "GraphQL", "AWS"],
      client: {
        name: "ArtChain Global",
        avatar: "https://i.pravatar.cc/150?img=4",
        location: "Singapore (On-site)",
        rating: 4.5,
        description: "Revolutionizing the digital art world through blockchain technology, connecting artists, collectors, and investors on a global scale."
      },
      budget: 10000,
      duration: "4 months",
      difficulty: 4,
      experienceLevel: "Advanced",
      postedDate: "5 days ago",
      applicants: 31
    },
    {
      id: 5,
      title: "Senior Blockchain Data Analyst for Crypto Investment Strategies",
      excerpt: "Analyze on-chain data to provide actionable insights and develop predictive models for a leading crypto investment firm.",
      description: "We're seeking a senior blockchain data analyst to join our quantitative research team. In this role, you'll be responsible for collecting, processing, and analyzing large volumes of on-chain data across multiple blockchain networks. Your insights will directly inform our investment strategies and risk management models. Key responsibilities include developing data pipelines for real-time blockchain data ingestion, creating dashboards for monitoring network activities, and building predictive models for market trends and token valuations. The ideal candidate will have strong skills in Python, SQL, and data visualization tools, as well as experience with machine learning techniques. A deep understanding of blockchain ecosystems, DeFi protocols, and tokenomics is essential. You'll work closely with our trading and research teams to translate data insights into actionable investment strategies.",
      category: "Data Science",
      tags: ["Python", "SQL", "Machine Learning", "Data Visualization", "Blockchain Analytics", "DeFi", "Quantitative Analysis"],
      client: {
        name: "Crypto Insights Capital",
        avatar: "https://i.pravatar.cc/150?img=5",
        location: "New York, USA",
        rating: 4.6,
        description: "Data-driven crypto investment firm with a focus on algorithmic trading and quantitative strategies in the digital asset space."
      },
      budget: 9000,
      duration: "3 months",
      difficulty: 3,
      experienceLevel: "Intermediate",
      postedDate: "1 day ago",
      applicants: 15
    },
    {
      id: 6,
      title: "Expert Smart Contract Auditor for High-Stakes DeFi Projects",
      excerpt: "Conduct thorough security audits of complex smart contracts for various high-value DeFi projects, ensuring robustness and safety.",
      description: "We're looking for an expert smart contract auditor to join our security team. In this critical role, you'll be responsible for performing comprehensive security audits on a wide range of DeFi protocols, including lending platforms, decentralized exchanges, and yield aggregators. You'll use both manual code review techniques and automated tools to identify vulnerabilities, assess risk, and provide actionable recommendations to our clients. The ideal candidate will have a deep understanding of common smart contract vulnerabilities, experience with formal verification methods, and knowledge of the latest developments in DeFi. You'll also contribute to developing our internal auditing tools and methodologies, and may occasionally represent the company at conferences or in client meetings. This position requires meticulous attention to detail, strong communication skills, and the ability to explain complex security concepts to both technical and non-technical stakeholders.",
      category: "Security",
      tags: ["Solidity", "Auditing", "DeFi", "Security Tools", "Formal Verification", "Vyper", "Slither"],
      client: {
        name: "BlockSafe Audits",
        avatar: "https://i.pravatar.cc/150?img=6",
        location: "Remote (Global)",
        rating: 4.9,
        description: "Industry-leading blockchain security firm ensuring the safety of Web3 projects through rigorous audits and cutting-edge security practices."
      },
      budget: 13000,
      duration: "2 months",
      difficulty: 5,
      experienceLevel: "Expert",
      postedDate: "4 days ago",
      applicants: 9
    },
    {
      id: 7,
      title: "Senior Rust Blockchain Core Developer for High-Performance Protocol",
      excerpt: "Contribute to the core development of a new high-performance blockchain protocol, focusing on consensus mechanisms and network optimization.",
      description: "We're seeking a senior Rust developer to join our core blockchain development team. In this role, you'll be at the forefront of creating a next-generation blockchain protocol that aims to solve the blockchain trilemma: scalability, security, and decentralization. Your responsibilities will include designing and implementing novel consensus algorithms, optimizing network layer performance, and ensuring the overall security and efficiency of the blockchain. The ideal candidate will have extensive experience with Rust, a deep understanding of distributed systems, and knowledge of cryptographic primitives. You should be comfortable working in a research-oriented environment, collaborating with cryptographers and economists to bring theoretical concepts into practical implementation. Experience with WebAssembly, parallel computing, or previous work on blockchain core protocols is highly desirable.",
      category: "Core Development",
      tags: ["Rust", "Consensus Algorithms", "Networking", "Cryptography", "Distributed Systems", "WebAssembly", "Performance Optimization"],
      client: {
        name: "Next-Gen Blockchain Foundation",
        avatar: "https://i.pravatar.cc/150?img=7",
        location: "San Francisco, USA",
        rating: 4.7,
        description: "Non-profit organization dedicated to advancing blockchain technology through open-source development and academic research partnerships."
      },
      budget: 18000,
      duration: "6 months",
      difficulty: 5,
      experienceLevel: "Expert",
      postedDate: "1 week ago",
      applicants: 22
    },
    {
      id: 8,
      title: "Web3 Community Manager and Growth Strategist",
      excerpt: "Build and engage a vibrant community for a new Web3 social platform while developing and implementing growth strategies.",
      description: "We're looking for a dynamic Web3 Community Manager and Growth Strategist to help launch and grow our decentralized social platform. In this role, you'll be responsible for building and nurturing our community across various channels, including Discord, Twitter, and Telegram. You'll create engaging content, organize virtual and physical events, and act as the primary liaison between our development team and our user base. Additionally, you'll work on growth strategies, including influencer partnerships, token-based incentive programs, and viral marketing campaigns. The ideal candidate will have a deep understanding of Web3 culture, experience in community management for a crypto project, and a track record of growing online communities. Strong communication skills, creativity, and the ability to explain complex blockchain concepts in simple terms are essential. You should also be comfortable with data analysis to measure the effectiveness of community initiatives and growth strategies.",
      category: "Community",
      tags: ["Community Building", "Social Media", "Content Creation", "Discord", "Growth Hacking", "Token Economics", "Web3 Marketing"],
      client: {
        name: "Decentralized Social Inc.",
        avatar: "https://i.pravatar.cc/150?img=8",
        location: "Remote (Europe preferred)",
        rating: 4.3,
        description: "Startup creating the next generation of decentralized social networks, focusing on user data ownership and content monetization."
      },
      budget: 5000,
      duration: "Ongoing",
      difficulty: 2,
      experienceLevel: "Intermediate",
      postedDate: "3 days ago",
      applicants: 41
    },
    {
      id: 9,
      title: "Tokenomics Designer and Economic Modeler for Innovative GameFi Project",
      excerpt: "Design and model comprehensive tokenomics for a new GameFi project, balancing gameplay incentives with long-term economic sustainability.",
      description: "We're seeking a skilled Tokenomics Designer to create a robust and sustainable economic model for our upcoming GameFi project. In this role, you'll be responsible for designing the entire token ecosystem, including supply and distribution mechanisms, utility within the game, governance structures, and incentive alignment for all stakeholders. You'll use advanced economic modeling and simulation techniques to test and refine the tokenomics under various scenarios. The ideal candidate will have a strong background in economics or game theory, experience with designing token systems for successful crypto projects, and a deep understanding of DeFi mechanisms. Familiarity with agent-based modeling and tools like Python or R for economic simulations is highly desirable. You'll work closely with our game design team to ensure that the economic model enhances rather than detracts from the core gameplay experience. This role requires creative problem-solving skills, the ability to balance competing interests, and excellent communication skills to explain complex economic concepts to both technical and non-technical team members.",
      category: "Economics",
      tags: ["Tokenomics", "Game Theory", "Economic Modeling", "GameFi", "DeFi", "Agent-based Modeling", "Governance"],
      client: {
        name: "PlayToEarn Games",
        avatar: "https://i.pravatar.cc/150?img=9",
        location: "Seoul, South Korea",
        rating: 4.5,
        description: "Innovative gaming studio blending blockchain technology with AAA game development to create immersive and economically viable GameFi experiences."
      },
      budget: 11000,
      duration: "2 months",
      difficulty: 4,
      experienceLevel: "Expert",
      postedDate: "6 days ago",
      applicants: 13
    },

  ];

const menuItems = [
  { icon: Globe, text: "All Jobs", link: "all", count: jobsData.length },
  { icon: Target, text: "Recommended", link: "recommended", count: jobsData.filter(job => job.experienceLevel === "Expert").length },
  { icon: Bookmark, text: "Saved", link: "saved", count: 0 },
];

export default function AllJobsPage() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [jobs, setJobs] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);
  const [viewMode, setViewMode] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState("jobs");
  const [activeFilters, setActiveFilters] = useState({
    jobs: {
      searchTerm: '',
      categoryFilter: 'all',
      jobType: [],
      experienceLevel: [],
      clientRating: 0,
      budgetRange: [0, 35000],
      duration: 'any',
      sortBy: 'relevance',
      selectedTags: []
    },
    freelancers: {
      searchTerm: '',
      skills: [],
      experienceLevel: [],
      hourlyRate: [0, 150],
      rating: 0
    }
  });

  
  const { toast } = useToast();

  const fetchJobsData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchJobs();
      setJobs(data);
      setFilteredJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast({
        title: "Error",
        description: "Failed to load jobs. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const fetchFreelancersData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchFreelancers();
      setFreelancers(data);
      setFilteredFreelancers(data);
    } catch (error) {
      console.error("Error fetching freelancers:", error);
      toast({
        title: "Error",
        description: "Failed to load freelancers. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (activeTab === 'jobs') {
      fetchJobsData();
    } else {
      fetchFreelancersData();
    }
  }, [activeTab, fetchJobsData, fetchFreelancersData]);



  useEffect(() => {
    const filters = activeFilters[activeTab];
    const dataToFilter = activeTab === 'jobs' ? jobs : freelancers;

    const filteredResults = dataToFilter.filter(item => {
      // Apply filters based on activeTab and filters
      // This is a simplified example, adjust according to your actual filter logic
      const searchMatch = item.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      // Add more filter conditions here based on your requirements
      
      return searchMatch; // && other conditions
    });

    if (activeTab === 'jobs') {
      setFilteredJobs(filteredResults);
    } else {
      setFilteredFreelancers(filteredResults);
    }
  }, [activeTab, activeFilters, jobs, freelancers]);


  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const handleFilterChange = useCallback(({ type, filters }) => {
    setActiveFilters(prevFilters => ({
      ...prevFilters,
      [type]: filters
    }));

    // Filter jobs based on the new filters
    const filteredResults = jobsData.filter(job => {
      // Search term filter
      const searchMatch = filters.searchTerm ? 
        job.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(filters.searchTerm.toLowerCase()))
        : true;

      // Budget range filter
      const budgetMatch = job.budget >= filters.budget[0] && job.budget <= filters.budget[1];

      // Rating filter
      const ratingMatch = job.client.rating >= filters.rating;

      // Project type filter
      const typeMatch = filters.projectType.length === 0 || 
        filters.projectType.includes(job.category);

      // Complexity filter
      const complexityMatch = filters.complexity.length === 0 || 
        filters.complexity.includes(job.difficulty.toString());

      // Duration filter
      const durationMatch = filters.duration.length === 0 || 
        filters.duration.includes(job.duration);

      // Skills filter
      const skillsMatch = filters.skills.length === 0 || 
        job.tags.some(tag => filters.skills.includes(tag));

      return searchMatch && budgetMatch && ratingMatch && typeMatch && 
             complexityMatch && durationMatch && skillsMatch;
    });

    setFilteredJobs(filteredResults);
  }, []);

  const [showMobileFilters, setShowMobileFilters] = React.useState(false);

  return (
    <div className="w-full max-w-[1600px] mx-auto min-h-screen">
      {/* Background Pattern - Using style from Dashboard */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-500/5 via-pink-500/5 to-purple-500/5 -z-10">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
      </div>
      
      <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header Section - Enhanced with Dashboard styling */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 
                bg-clip-text text-transparent inline-flex items-center gap-2">
                Find Work
                <Badge className="bg-orange-500/10 text-orange-500 text-xs">
                  {jobsData.length} New
                </Badge>
              </h1>
              <p className="text-default-500 mt-1">
                Discover projects that match your expertise
              </p>
            </div>
            
            {/* Quick Actions - Styled like Dashboard */}
            <div className="flex gap-2 w-full sm:w-auto">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.12, delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Button
                  className="bg-default-100 font-medium flex-1 sm:flex-none"
                  startContent={<Target size={18} />}
                >
                  Job Alerts
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.12, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <Button
                  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium
                    shadow-lg hover:shadow-pink-500/25 transition-all duration-300 flex-1 sm:flex-none"
                  startContent={<Plus size={18} />}
                >
                  Post a Job
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Search Bar - Enhanced with glass effect */}
          <Card 
            className="relative overflow-hidden bg-background/60 backdrop-blur-md border-medium border-default-200 
              hover:border-orange-500/50 transition-all duration-300"
            onMouseMove={handleMouseMove}
          >
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background: useMotionTemplate`
                  radial-gradient(
                    400px circle at ${mouseX}px ${mouseY}px,
                    rgba(255,100,50,0.1),
                    transparent 80%
                  )
                `
              }}
            />
            <CardBody className="p-3 sm:p-4">
              {/* Search inputs and filters here - same as original */}
            </CardBody>
          </Card>

          {/* Quick Stats - Using ProjectCard styling */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Stats cards here - same as original but with enhanced styling */}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Desktop */}
          <div className="hidden lg:block lg:col-span-3">
            <FilterSidebar 
              onFilterChange={handleFilterChange}
              activeTab={activeTab}
              filters={activeFilters[activeTab]}
            />
          </div>

          {/* Mobile Filter Button */}
          <Button
            className="fixed bottom-4 right-4 lg:hidden z-40"
            size="lg"
            color="primary"
            startContent={<Filter size={20} />}
            onPress={() => setShowMobileFilters(true)}
          >
            Filters
          </Button>

          {/* Mobile Filters */}
          {showMobileFilters && (
            <FilterSidebar 
              onFilterChange={handleFilterChange}
              activeTab={activeTab}
              filters={activeFilters[activeTab]}
              isMobile={true}
              onClose={() => setShowMobileFilters(false)}
            />
          )}

          {/* Job Listings */}
          <div className="col-span-12 lg:col-span-6 space-y-6">
            {/* Replace existing Tabs with new design */}
            <div className="flex justify-center md:justify-start mb-6">
              <div className="flex gap-3 overflow-x-auto pb-2">
                {menuItems.map((item, index) => (
                  <Button
                    key={index}
                    className={`flex gap-2 h-12 items-center rounded-[1.25rem] shadow-lg px-6 border-medium border-default 
                      transition-all duration-200 ${
                      activeTab === item.link 
                        ? "bg-gradient-to-r from-pink-500 to-orange-600 text-white border-none" 
                        : "bg-default/40 hover:bg-default/60"
                    }`}
                    onClick={() => setActiveTab(item.link)}
                  >
                    <item.icon size={18} />
                    <span className="font-medium">{item.text}</span>
                    {item.count > 0 && (
                      <Chip
                        size="sm"
                        className={`${
                          activeTab === item.link 
                            ? "bg-white/20 text-white" 
                            : "bg-default-100"
                        }`}
                      >
                        {item.count}
                      </Chip>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Job Cards */}
            <AnimatePresence>
              {filteredJobs.map((job) => (
                <JobCard 
                  key={job.id}
                  job={job}
                  onApply={() => {
                    setSelectedJob(job);
                    setIsDrawerOpen(true);
                  }}
                  viewMode="list"
                  onTagClick={() => {}}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-6 space-y-6">
              <FreelancerDashboard />
              <RecentBids />
            </div>
          </div>
        </div>
      </div>

      <JobDetailsDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        job={selectedJob}
        onApply={undefined}
      />
    </div>
  );
};

