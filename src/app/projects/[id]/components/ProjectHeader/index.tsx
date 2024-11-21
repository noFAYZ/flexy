
import { Button, Card, Chip, Divider, Progress, User, Avatar } from "@nextui-org/react";
import { 
  ArrowUpRight, 
  CircleDollarSign, 
  Clock, 
  Eye, 
  Shield, 
  Star,
  Users 
} from "lucide-react";

import { 
  ShieldCheck,
} from "lucide-react";

const ProjectHeader = () => {
  return (
    <div className="relative flex flex-col lg:flex-row gap-6 items-start">
    {/* Project Info */}
    <div className="flex-1 space-y-6">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Chip
            className="bg-orange-500/10 text-orange-500 border border-orange-500/20"
            size="sm"
            startContent={<Star className="w-3 h-3" />}
          >
            Featured
          </Chip>
          <Chip
            startContent={<Shield className="w-3 h-3" />}
            className="bg-green-500/10 text-green-600 border border-green-500/20"
            size="sm"
          >
            Verified Client
          </Chip>
          <Chip
            startContent={<Clock className="w-3 h-3" />}
            className="bg-blue-500/10 text-blue-600 border border-blue-500/20"
            size="sm"
          >
            Posted 2 days ago
          </Chip>
        </div>

        <h1 className="text-4xl font-bold  bg-clip-text ">
          Build a Web3 NFT Marketplace with Next.js and Solidity
        </h1>

 

        <div className="flex flex-wrap gap-2">
          {["Next.js", "Solidity", "Smart Contracts", "Web3", "DeFi"].map((tag) => (
            <Chip
              key={tag}
              className="bg-default-100 hover:bg-default-200 cursor-pointer transition-colors"
              variant="flat"
              
            >
              {tag}
            </Chip>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="bg-default-50/50 backdrop-blur-sm border border-default-200 p-4 rounded-[2.5rem]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-pink-500/10">
              <CircleDollarSign className="w-5 h-5 text-pink-500" />
            </div>
            <div>
              <p className="text-xs text-default-500">Project Value</p>
              <p className="font-semibold">$15,000</p>
              <p className="text-xs text-success-500">Fixed Price</p>
            </div>
          </div>
        </Card>

        <Card className="bg-default-50/50 backdrop-blur-sm border border-default-200 p-4 rounded-[2.5rem]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-500/10">
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-xs text-default-500">Timeline</p>
              <p className="font-semibold">3 Months</p>
              <p className="text-xs text-default-400">Est. completion Dec 2024</p>
            </div>
          </div>
        </Card>

        <Card className="bg-default-50/50 backdrop-blur-sm border border-default-200 p-4 rounded-[2.5rem]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10">
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-default-500">Proposals</p>
              <p className="font-semibold">24 / 50</p>
              <p className="text-xs text-warning-500">Closing soon</p>
            </div>
          </div>
        </Card>

        <Card className="bg-default-50/50 backdrop-blur-sm border border-default-200 p-4 rounded-[2.5rem]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-green-500/10">
              <Eye className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-xs text-default-500">Engagement</p>
              <p className="font-semibold">156 views</p>
              <p className="text-xs text-success-500">↑ 23% this week</p>
            </div>
          </div>
        </Card>
      </div>
    </div>

    {/* Action Card */}
    <Card className="w-full lg:w-[300px] xl:w-[400px] mb-6 bg-background shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50 overflow-hidden">
      <div className="p-6 space-y-6">
        {/* Budget Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-sm text-default-500">Project Budget</p>
            
              <h3 className="text-2xl font-bold">$15,000</h3>
            </div>
            <div className="p-3 rounded-2xl bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-orange-500/20">
              <CircleDollarSign className="w-6 h-6 text-orange-500" />
            </div>
          </div>

          <Divider className="bg-default-200/50" />

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-default-500">Time Left</span>
              <span className="font-medium">4 days</span>
            </div>
            <Progress
          value={65}
          classNames={{
              base: "max-w-full",
              track: "bg-default-500/30",
            indicator: "bg-gradient-to-r from-pink-500 to-orange-600",
          }}
        />
          
            <div className="flex justify-between text-sm">
              <span className="text-default-500">Proposals</span>
              <span className="font-medium">24 / 50</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            size="lg"
            className="rounded-2xl w-full bg-gradient-to-r from-pink-500 to-orange-600 text-white  h-12
              hover:opacity-90 transition-opacity"
            endContent={<ArrowUpRight className="w-4 h-4" />}
          >
            Submit Proposal
          </Button>

        </div>

        {/* Client Preview */}
        <div className="space-y-4">
          <Divider className="bg-default-200/50" />
          <div className="flex items-center justify-between">
            <User
              name="Web3 Innovations Ltd"
              description={
                <div className="flex items-center gap-1 text-success-500">
                  <ShieldCheck className="w-3 h-3" />
                  <span className="text-xs">Verified Client</span>
                </div>
              }
              avatarProps={{
                src: "https://example.com/avatar.jpg",
                className: "w-10 h-10 text-large border-2 border-orange-500/20"
              }}
            />
            <Button
              size="sm"
              variant="light"
              endContent={<ArrowUpRight className="w-4 h-4" />}
            >
              View Profile
            </Button>
          </div>
        </div>
      </div>
    </Card>
  </div>
  )
}

export default ProjectHeader