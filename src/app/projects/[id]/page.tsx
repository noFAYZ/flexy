
import type { Metadata } from 'next'
import ProjectHeader from "./components/ProjectHeader";
import ProjectOverview from "./components/ProjectOverview";
import TechnicalStack from "./components/TechnicalStack";
import Milestones from "./components/Milestones";
import TopProposals from "./components/TopProposals";
import ClientDetails from "./components/ClientDetails";
import { getProject } from '@/lib/actions/project'; // You'll need to create this
import BidsOverview from './components/BidsOverview';


// Static metadata as fallback
 const metadata: Metadata = {
  title: 'Project Details | FreelanceHub',
  description: 'View project details and submit proposals',
}

// Dynamic metadata generation
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const project = await getProject(params.id)

    return {
      title: `${project.title} | DeFlexy`,
      description: project.description,
      keywords: project.tags?.join(', '),
      openGraph: {
        title: project.title,
        description: project.description,
        type: 'website',
        url: `${process.env.NEXT_PUBLIC_APP_URL}/projects/${params.id}`,
        images: [
          {
            url: project.image || '/og-image.jpg', // fallback image
            width: 1200,
            height: 630,
            alt: project.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: project.title,
        description: project.description,
        images: [project.image || '/og-image.jpg'], // fallback image
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Project Details | deFlexy',
      description: 'View project details and submit proposals',
    }
  }
}



export default function ProjectPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <div className="relative">
        <ProjectHeader />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <ProjectOverview />
          <TechnicalStack />
          <Milestones />
           <TopProposals />
          {/* Bids Overview Section */}
        <BidsOverview projectId={params.id} />
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          <ClientDetails />
         
        </div>
      </div>
    </div>
  );
}
