import { Avatar, Button, Chip } from "@nextui-org/react";
import { Bid } from "../../types";
import { 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  MessageCircle, 
  Star, 
  Award,
  Globe,
  Briefcase,
  Shield
} from "lucide-react";

interface Props {
  bid: Bid | null;
  onClose: () => void;
}

const BidDetailsDrawer = ({ bid, onClose }: Props) => {
  if (!bid) return null;

  const profileBadges = [
    { icon: Shield, label: "Identity Verified", color: "text-success" },
    { icon: Award, label: "Top Rated", color: "text-warning" },
    { icon: Globe, label: "English Level: Native", color: "text-primary" },
    { icon: Briefcase, label: "5+ Years Exp.", color: "text-secondary" },
  ];

  return (
    <div className="p-4 sm:p-6">
      {/* Header Section */}
      <div className="relative -m-4 sm:-m-6 p-4 sm:p-6 mb-6 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-t-xl">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Avatar Section */}
          <div className="flex items-center sm:block">
            <div className="relative">
              <Avatar
                src={bid.freelancer.avatar}
                className="w-16 h-16 sm:w-20 sm:h-20 border-3 border-background"
              />
              <div className="absolute -bottom-1 -right-1 bg-success rounded-full p-1">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-success rounded-full animate-pulse" />
              </div>
            </div>
          </div>
          
          {/* Info Section */}
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold">{bid.freelancer.name}</h3>
                <p className="text-default-500">Senior Developer</p>
              </div>
              <Chip
                size="lg"
                className="w-fit bg-gradient-to-br from-pink-500 to-orange-500 text-white font-bold"
              >
                ${bid.amount}/hr
              </Chip>
            </div>
            
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-2">
              {profileBadges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-1 bg-background/50 rounded-lg px-2 py-1">
                  <badge.icon className={`w-3 h-3 sm:w-4 sm:h-4 ${badge.color}`} />
                  <span className="text-xs text-default-500">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
        {[
          { icon: Star, value: bid.freelancer.rating, label: "Rating", color: "text-warning" },
          { icon: CheckCircle2, value: "98%", label: "Success Rate", color: "text-success" },
          { icon: Clock, value: "2hrs", label: "Response Time", color: "text-primary" },
        ].map((stat, idx) => (
          <div key={idx} className="p-3 sm:p-4 rounded-xl bg-default-50 flex sm:flex-col items-center sm:items-center gap-3 sm:gap-1">
            <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
            <div className="flex flex-col sm:items-center">
              <span className="font-semibold">{stat.value}</span>
              <span className="text-xs text-default-500">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Proposal Section */}
      <div className="mb-6 p-3 sm:p-4 rounded-xl border-l-4 border-primary bg-default-50">
        <h4 className="font-semibold mb-2">Proposal</h4>
        <p className="text-default-600 text-sm sm:text-base">{bid.proposal}</p>
      </div>

      {/* Skills Section */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Skills & Expertise</h4>
        <div className="flex flex-wrap gap-2">
          {bid.skills.map((skill) => (
            <Chip 
              key={skill} 
              className="bg-default-100 hover:bg-default-200 transition-colors text-xs sm:text-sm"
              radius="sm"
            >
              {skill}
            </Chip>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          className="flex-1 bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg hover:opacity-90 transition-opacity"
          size="lg"
          endContent={<ArrowUpRight className="w-4 h-4" />}
        >
          Hire Now
        </Button>
        <Button
          variant="bordered"
          className="flex-1"
          size="lg"
          endContent={<MessageCircle className="w-4 h-4" />}
        >
          Message
        </Button>
      </div>
    </div>
  );
};

export default BidDetailsDrawer; 