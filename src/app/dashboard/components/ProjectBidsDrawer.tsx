import React from "react";
import { Star, Clock, DollarSign, Calendar, MessageSquare, Shield, Award, ThumbsUp, Briefcase, MapPin, CrownIcon } from "lucide-react";
import { Button, Avatar, Chip, Tooltip, Card, CardBody, user } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useDrawer } from "@/app/hooks/useDrawer";
import { ProfileStats } from "@/app/user/[username]/components/Header/ProfileStats";
import { MingcuteExchangeDollarLine } from "@/components/icons/icons";
import { Bid } from "@/app/projects/[id]/types";



interface ProjectBidsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string | null;
  bids: Bid[];
}

export const ProjectBidsContent = ({ bids }: { bids: Bid[] }) => {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { 
            label: "Total Bids", 
            value: bids.length, 
            icon: Briefcase, 
            gradient: "from-pink-500 to-orange-500"
          },
          { 
            label: "Average Bid", 
            value: "$45/hr", 
            icon: DollarSign, 
            gradient: "from-pink-500 via-orange-500 to-yellow-500"
          },
          { 
            label: "Avg. Rating", 
            value: "4.8", 
            icon: Star, 
            gradient: "from-orange-500 to-amber-500"
          },
          { 
            label: "Response Time", 
            value: "2hrs", 
            icon: Clock, 
            gradient: "from-rose-500 to-pink-500"
          },
        ].map((stat, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={stat.label}
            className="group relative bg-background/50 backdrop-blur-sm rounded-[2.5rem] p-5
              border-medium border-default-200 hover:border-primary/50 
              hover:shadow-lg transition-all duration-300"
          >
            {/* Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} 
              rounded-[2.5rem] opacity-5 group-hover:opacity-10 transition-opacity`} />

            {/* Content Container */}
            <div className="relative z-10">
              {/* Icon */}
              <div className={`
                w-10 h-10 rounded-2xl flex items-center justify-center mb-4
                bg-gradient-to-br ${stat.gradient} 
                shadow-lg shadow-default-500/20
              `}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>

              {/* Stats */}
              <div className="space-y-1">
                <p className="text-2xl font-bold bg-gradient-to-br from-foreground to-foreground/70 
                  bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-sm text-default-500 font-medium">
                  {stat.label}
                </p>
              </div>
            </div>

       
          </motion.div>
        ))}
      </div>

      {/* Bids List */}
      <div className="space-y-4">
        {bids.map((bid, idx) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={bid.id}
            className="group relative bg-background rounded-[2.5rem] p-4 sm:p-6 border-medium border-default-200 
              hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
          >
            {/* Status Badge */}
            <div className="absolute -top-2 -right-2">
              <Chip
                size="sm"
                className={`
                  ${bid.status === 'accepted' ? 'bg-success-500' : ''}
                  ${bid.status === 'rejected' ? 'bg-danger-500' : ''}
                  ${bid.status === 'pending' ? 'bg-warning-500' : ''}
                  text-white shadow-lg
                `}
              >
                {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
              </Chip>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              {/* Left Column - Profile */}
              <div className="flex flex-row lg:flex-col lg:w-[180px] gap-4 p-3 bg-gradient-to-br from-background to-default-50 rounded-2xl">
                {/* Profile Header */}
                <div className="flex flex-row lg:flex-col items-center gap-3">
                  {/* Avatar Stack */}
                  <div className="relative group">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                    
                    {/* Status Indicator */}
                    <div className="absolute -top-2 -right-2 z-10">
                      <Chip
                        size="sm"
                        startContent={<CrownIcon className="text-white" size={12} />}
                        classNames={{
                          base: "bg-gradient-to-br from-amber-500 to-rose-700 border-small border-white/50 shadow-lg",
                          content: "text-white text-[10px] font-medium drop-shadow-md px-0 py-0",
                        }}
                      >
                        Top Rated
                      </Chip>
                    </div>
                    
                    {/* Avatar */}
                    <Avatar
                      src={bid.freelancer.avatar}
                      className="w-14 h-14 sm:w-16 sm:h-16 border-3 border-background relative z-0
                        transform group-hover:scale-105 transition-transform duration-200"
                    />
                    
                    {/* Online Status */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background z-10
                      animate-pulse" />
                  </div>

                  {/* User Info */}
                  <div className="flex flex-col min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base truncate">
                      {bid.freelancer.name}
                    </h3>
                    <p className="text-xs text-default-500 truncate">
                      {bid.freelancer.expertise}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-default-400 flex-shrink-0" />
                      <span className="text-xs text-default-400 truncate">
                        {bid.freelancer.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="flex flex-col gap-2 ml-auto lg:ml-0">
                 
                    <Tooltip content="Rating">
                      <div className="flex items-center gap-1.5 bg-default-100 hover:bg-default-200 px-3 py-1.5 
                        rounded-full transition-colors group cursor-default">
                        <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                        <span className="text-xs font-medium">{bid.freelancer.rating}</span>
                      </div>
                    </Tooltip>
                    <Tooltip content="Job Success">
                      <div className="flex items-center gap-1.5 bg-default-100 hover:bg-default-200 px-3 py-1.5 
                        rounded-full transition-colors group cursor-default">
                        <ThumbsUp className="w-3.5 h-3.5 text-success" />
                        <span className="text-xs font-medium">{bid.freelancer.jobSuccess}%</span>
                      </div>
                    </Tooltip>
                  
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="flex-1 space-y-3 sm:space-y-4">
                {/* Stats Card */}
                <Card className="w-full sm:w-fit px-3 sm:px-4 bg-gradient-to-tl from-pink-500 to-orange-500 text-white shadow rounded-[2.5rem]">
                  <CardBody>
                    <div className="flex justify-center sm:justify-start sm:flex-row gap-2 sm:gap-4 items-center">
                      <div className="flex items-center bg-card text-foreground/80 p-2 rounded-full gap-1">
                        <MingcuteExchangeDollarLine height={20} className="text-semibold" />
                        <span className="font-semibold text-sm sm:text-base">${bid.amount}/hr</span>
                      </div>
                      <div className="flex gap-4">
                        <Stat value={"$2k"} label="Earned" />
                        <Stat value={20} label="Projects" />
                        <Stat value={`4`} label="Hours" />
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Proposal */}
                <div className="bg-default-50 rounded-xl p-3 sm:p-4">
                  <p className="text-sm text-default-700 line-clamp-3">{bid.proposal}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row gap-2">
                  <Button
                    className="flex-1 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-600 text-white"
                    startContent={<MessageSquare className="w-4 h-4" />}
                  >
                    Message
                  </Button>
                  <Button
                    className="flex-1 rounded-2xl bg-lime-800 text-gray-100  "
                    
                    variant="flat"
                    startContent={<Shield className="w-4 h-4" />}
                  >
                    Accept Bid
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const useProjectBidsDrawer = () => {
  const { openDrawer, closeDrawer } = useDrawer();

  const openProjectBidsDrawer = (props: ProjectBidsDrawerProps) => {
    if (!props.isOpen) {
      closeDrawer();
      return null;
    }
    
    // Only open if not already open
    openDrawer({
      title: "Project Proposals",
      content: <ProjectBidsContent bids={props.bids} />,
      width: "lg"
    });
    return null;
  };

  return { openProjectBidsDrawer };
};

const Stat = ({ value, label }) => (
    <div className="flex items-center">
      <div>
        <div className="font-semibold">{value}</div>
        <div className="text-xs">{label}</div>
      </div>
    </div>
  );