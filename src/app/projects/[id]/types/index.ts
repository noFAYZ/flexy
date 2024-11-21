interface Bid {
  id: number;
  amount: number;
  status: "pending" | "accepted" | "rejected";
  freelancer: {
    jobSuccess: string;
    expertise: string;
    name: string;
    avatar: string;
    rating: number;
    location: string;
    title: string;
    languages: {
      name: string;
      level: string;
      proficiency: number;
    }[];
    education: {
      degree: string;
      institution: string;
      year: number;
    }[];
    stats: {
      successRate: number;
      responseTime: string;
      experience: string;
    };
  };
  skills: string[];
  proposal: string;
  submittedAt: string;
  portfolio: {
    id: number;
    title: string;
    description: string;
    status: 'completed' | 'in_progress';
    technologies: string[];
  }[];
  duration: string;
  timestamp: string;
}

const mockBids: Bid[] = [
  {
    id: 1,
    amount: 85,
    status: "pending",
    submittedAt: "2024-03-20T10:30:00Z",
    freelancer: {
        name: "Alex Thompson",
        expertise: "Blockchain Development",
        avatar: "https://i.pravatar.cc/150?u=1",
        rating: 4.95,
        location: "United States",
        title: "Senior Blockchain Developer",
        languages: [
            { name: "English", level: "Native", proficiency: 100 },
            { name: "Spanish", level: "Fluent", proficiency: 85 },
            { name: "French", level: "Intermediate", proficiency: 60 }
        ],
        education: [
            {
                degree: "Master's in Computer Science",
                institution: "Stanford University",
                year: 2019
            },
            {
                degree: "Bachelor's in Software Engineering",
                institution: "MIT",
                year: 2017
            }
        ],
        stats: {
            successRate: 98,
            responseTime: "2hrs",
            experience: "5+ years"
        },
        jobSuccess: undefined
    },
    skills: ["Smart Contracts", "DeFi", "Web3", "Solidity", "React", "Node.js"],
    proposal: "I have extensive experience in blockchain development and have successfully delivered similar projects. My approach would be to first analyze your requirements in detail, then create a robust architecture that ensures scalability and security. I specialize in smart contract development and have worked with major DeFi protocols. I can start immediately and commit full-time to your project. My experience with similar projects will help me deliver efficient and secure solutions that meet your specific needs.",
    portfolio: [
      {
        id: 1,
        title: "DeFi Lending Protocol",
        description: "Developed a decentralized lending platform with automated market maker functionality. Implemented smart contracts for lending, borrowing, and liquidity provision.",
        status: "completed",
        technologies: ["Solidity", "Web3.js", "React"]
      },
      {
        id: 2,
        title: "NFT Marketplace",
        description: "Built a full-featured NFT marketplace with minting, trading, and auction capabilities. Integrated with IPFS for decentralized storage.",
        status: "completed",
        technologies: ["Ethereum", "IPFS", "Next.js"]
      },
      {
        id: 3,
        title: "DAO Governance Platform",
        description: "Created a governance platform for DAOs with proposal creation, voting mechanisms, and treasury management.",
        status: "completed",
        technologies: ["Smart Contracts", "TypeScript", "Graph Protocol"]
      }
    ],
    duration: "2 weeks",
    timestamp: "2024-03-20T10:30:00Z",
  },
  {
    id: 2,
    amount: 75,
    submittedAt: "2024-03-20T09:15:00Z",
    status: "pending",  
    freelancer: {
        name: "Sarah Chen",
        expertise: "Smart Contract Security",
        avatar: "https://i.pravatar.cc/150?u=2",
        rating: 4.89,
        location: "Singapore",
        title: "Blockchain Security Expert",
        languages: [
            { name: "English", level: "Fluent", proficiency: 95 },
            { name: "Mandarin", level: "Native", proficiency: 100 },
            { name: "Japanese", level: "Basic", proficiency: 40 }
        ],
        education: [
            {
                degree: "MSc in Cybersecurity",
                institution: "NUS",
                year: 2020
            }
        ],
        stats: {
            successRate: 96,
            responseTime: "1hr",
            experience: "4+ years"
        },
        jobSuccess: undefined
    },
    skills: ["Smart Contract Security", "Solidity", "Audit", "DeFi", "ZK-Proofs"],
    proposal: "As a blockchain security expert, I specialize in smart contract auditing and secure DeFi protocol development. I've identified and fixed critical vulnerabilities in major protocols and can ensure your project meets the highest security standards. I offer comprehensive security reviews and implementation of best practices.",
    portfolio: [
      {
        id: 1,
        title: "DeFi Protocol Security Audit",
        description: "Conducted comprehensive security audit for a major DeFi protocol, identifying and fixing critical vulnerabilities.",
        status: "completed",
        technologies: ["Solidity", "Security Tools", "Testing Frameworks"]
      },
      {
        id: 2,
        title: "Zero-Knowledge Proof Implementation",
        description: "Implemented ZK-proofs for a privacy-focused blockchain application.",
        status: "completed",
        technologies: ["ZK-SNARKs", "Circom", "Solidity"]
      }
    ],
    duration: "3 weeks",
    timestamp: "2024-03-20T09:15:00Z",
  },
  {
    id: 3,
    amount: 95,
    submittedAt: "2024-03-20T08:45:00Z",
    status: "pending",
    freelancer: {
        name: "Michael Rodriguez",
        expertise: "Full Stack Development",
        avatar: "https://i.pravatar.cc/150?u=3",
        rating: 4.92,
        location: "Canada",
        title: "Full Stack Web3 Developer",
        languages: [
            { name: "English", level: "Native", proficiency: 100 },
            { name: "Portuguese", level: "Fluent", proficiency: 90 }
        ],
        education: [
            {
                degree: "Bachelor's in Computer Engineering",
                institution: "University of Toronto",
                year: 2018
            }
        ],
        stats: {
            successRate: 94,
            responseTime: "3hrs",
            experience: "6+ years"
        },
        jobSuccess: undefined
    },
    skills: ["Ethereum", "React", "Node.js", "Solidity", "TypeScript", "AWS"],
    proposal: "I bring extensive experience in full-stack Web3 development, having built and deployed multiple successful DApps. My expertise spans both frontend and smart contract development, ensuring seamless integration and optimal user experience. I can help architect and implement your entire solution.",
    portfolio: [
      {
        id: 1,
        title: "Cross-chain DEX Platform",
        description: "Built a cross-chain decentralized exchange with bridge functionality and liquidity aggregation.",
        status: "completed",
        technologies: ["Cross-chain", "Smart Contracts", "React"]
      },
      {
        id: 2,
        title: "Web3 Social Platform",
        description: "Developed a decentralized social media platform with NFT integration and token incentives.",
        status: "in_progress",
        technologies: ["IPFS", "Next.js", "Graph Protocol"]
      }
    ],
    duration: "4 weeks",
    timestamp: "2024-03-20T08:45:00Z",
  }
];

export type { Bid };
export { mockBids }; 