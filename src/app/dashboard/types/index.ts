export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: {
    amount: number;
    spent: number;
    currency: string;
  };
  timeline: {
    startDate: string;
    endDate: string;
    progress: number;
  };
  team: TeamMember[];
  milestones: Milestone[];
  status: 'active' | 'completed' | 'pending';
}

export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  type: 'incoming' | 'outgoing';
}

export interface FreelancerProfile {
  role: any;
  id: string;
  name: string;
  avatar: string;
  title: string;
  skills: string[];
  hourlyRate: number;
  rating: number;
  completedProjects: number;
} 
interface Freelancer {
  expertise: string;
  name: string;
  avatar: string;
  rating: number;
  location: string;
  title: string;
  jobSuccess: number;
  // ... rest of the properties
} 