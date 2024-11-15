export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  image?: string
  budget: number
  timeline: string
  proposals: number
  maxProposals: number
  clientId: string
  createdAt: Date
  // ... other project fields
} 