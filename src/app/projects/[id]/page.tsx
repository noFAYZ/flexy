import type { Metadata } from 'next'
import ProjectHeader from "./components/ProjectHeader";
import ProjectOverview from "./components/ProjectOverview";
import TechnicalStack from "./components/TechnicalStack";
import Milestones from "./components/Milestones";
import TopProposals from "./components/TopProposals";
import ClientDetails from "./components/ClientDetails";
import { getProject } from '@/lib/actions/project'; // You'll need to create this

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

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <div className="relative">

        <ProjectHeader />
    
      </div>

      {/* Main Content Grid */}
      <div className="flex gap-6">
        {/* Left Column - Main Content */}
        <div className="flex-1 space-y-6">

          {/* Project Overview Card */}
        <ProjectOverview />

          {/* Technical Stack Section */}
        <TechnicalStack />

          {/* Milestones Section */}
        <Milestones />
        
          {/* Top Proposals Section */}
        <TopProposals />

          {/* Similar Projects Card 
        <Card className="mb-6 bg-background shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50 overflow-hidden">

              <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 flex flex-wrap  gap-4 justify-between sm:gap-0">
          <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
            <ScrollText size={22} className="text-primary mr-2" />
            Similar Projects        </CardTitle>
       
        </CardHeader>


            <div className="p-6 space-y-4">
      

              <div className="space-y-4">
                {[1, 2, 3].map((project) => (
                  <Card
                    key={project}
                    className="bg-default-100/50 p-4 rounded-xl hover:bg-default-200/50 transition-colors cursor-pointer"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Chip size="sm" className="bg-orange-500/10 text-orange-500">
                          $12,000
                        </Chip>
                        <Chip size="sm" className="bg-blue-500/10 text-blue-500">
                          15 Proposals
                        </Chip>
                      </div>
                      <h3 className="font-medium line-clamp-2">
                        Build DeFi Platform with Smart Contracts
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-default-500">
                        <Clock className="w-3 h-3" />
                        <span>Posted 3 days ago</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Button
                className="w-full"
                variant="flat"
                endContent={<ArrowUpRight className="w-4 h-4" />}
              >
                View More Projects
              </Button>
            </div>
          </Card>*/}

        </div>

        {/* Right Column - Sidebar */}
        <div className="hidden lg:block w-[400px] space-y-6">
          {/* Client Details Card */}
          
        <ClientDetails  />
      
        </div>
      </div>
    </div>
  );
}
