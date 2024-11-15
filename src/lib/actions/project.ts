import { Project } from "@/types/project";

export async function getProject(id: string): Promise<Project> {
  // Simulated API call or database query
  // Replace this with your actual data fetching logic
  return {
    id,
    title: 'Build a Web3 NFT Marketplace',
    description: 'Looking for an experienced blockchain developer to build a modern NFT marketplace.',
    tags: ['Next.js', 'Solidity', 'Web3'],
    budget: 15000,
    timeline: '3 months',
    proposals: 24,
    maxProposals: 50,
    clientId: 'client123',
    createdAt: new Date(),
    image: '/project-image.jpg'
  }
} 