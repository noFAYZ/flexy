export const mockData = {
  projects: [
    {
      id: "1",
      title: "NFT Marketplace Development",
      description: "Building a decentralized NFT marketplace with advanced features",
      category: "Blockchain",
      budget: {
        amount: 15000,
        spent: 5000,
        currency: "USD"
      },
      timeline: {
        startDate: "2024-01-01",
        endDate: "2024-04-01",
        progress: 35
      },
      team: [
        {
          id: "t1",
          name: "John Doe",
          avatar: "https://i.pravatar.cc/150?u=t1",
          role: "Lead Developer"
        },
        // Add more team members...
      ],
      milestones: [
        {
          id: "m1",
          title: "Smart Contract Development",
          completed: true,
          dueDate: "2024-02-15"
        },
        // Add more milestones...
      ],
      status: "active"
    },
    // Add more projects...
  ],
  
  freelancers: [
    {
      id: "f1",
      name: "Alice Johnson",
      avatar: "https://i.pravatar.cc/150?u=f1",
      title: "Senior Blockchain Developer",
      skills: ["Solidity", "Web3.js", "React"],
      hourlyRate: 85,
      rating: 4.9,
      completedProjects: 32
    },
    // Add more freelancers...
  ],

  transactions: [
    {
      id: "tx1",
      date: "2024-02-15",
      description: "Milestone Payment - NFT Marketplace",
      amount: 5000,
      status: "completed",
      type: "outgoing"
    },
    // Add more transactions...
  ]
}; 
