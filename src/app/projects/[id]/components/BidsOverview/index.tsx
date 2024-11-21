"use client";

import {
  Button,
  Card,
  CardHeader,
  Chip,
  Avatar,
  User,
} from "@nextui-org/react";
import {
  ArrowUpRight,
  Clock,
  Globe,
  MessageCircle,
  Award,
  Star,
  Wallet,
  CheckCircle2,
  Users,
  CrownIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useDrawer } from '@/app/hooks/useDrawer';

import { Bid, mockBids } from "../../types";
import BidDetailsDrawer from "../BidDetailsDrawer";
import { StarFilledIcon } from "@radix-ui/react-icons";

const BidsOverview = ({ projectId }: { projectId: string }) => {
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null);
  const { openDrawer,closeDrawer } = useDrawer();
  
  const handleOpenBidDetails = (bid: Bid) => {
    openDrawer({
      content: <BidDetailsDrawer bid={bid} onClose={() => closeDrawer()} />,
      title: "Bid Details",
      width: "lg"
    });
  };
  
  return (
    <Card className="mb-6 shadow-none rounded-[2.5rem] border-medium border-default backdrop-blur-xl">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 flex flex-wrap gap-4 justify-between rounded-t-[2.5rem]">
        <div className="flex w-full justify-between items-center">
          <CardTitle className="text-base sm:text-lg md:text-xl font-semibold flex items-center gap-2">
            <div className="relative">
              <Award size={22} className="text-primary relative" />
            </div>
            Project Proposals
          </CardTitle>
          <Button
            className="bg-background/50 backdrop-blur-sm border-medium border-default-200"
            endContent={<ArrowUpRight className="w-4 h-4" />}
          >
            View All 24
          </Button>
        </div>
      </CardHeader>

      <div className="p-3 sm:p-6">
        <div className="grid gap-3 sm:gap-4">
          {mockBids.slice(0, 3).map((bid) => (
            <Card
              key={bid.id}
              className="group relative bg-background/50 backdrop-blur-xl p-1 rounded-[2rem] border-medium border-default-200 
              hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative bg-background rounded-[1.8rem] p-3 sm:p-5">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Left Column - Profile */}
                  <div className="flex sm:flex-col items-center sm:w-[140px] text-center space-y-0 sm:space-y-3 align-middle">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl blur-md opacity-40" />
                      <Avatar
                        src={bid.freelancer.avatar}
                        className="w-12 h-12 sm:w-16 sm:h-16 border-3 border-background relative"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-success-500 rounded-full border-2 border-background" />
                    </div>
                    <div className="ml-3 sm:ml-0">
                      <h3 className="font-semibold text-foreground">{bid.freelancer.name}</h3>
                      <p className="text-xs text-default-500">Senior Developer</p>
                     
                    </div>
                     <Chip
                      startContent={
                        <CrownIcon className="text-white" size={14} />
                      }
                      variant="shadow"
                      classNames={{
                        base: "bg-gradient-to-br from-amber-500 to-rose-700 border-small border-white/50 shadow-lg",
                        content:
                          "text-white text-xs font-medium drop-shadow-md",
                      }}
                    >
                      Top Rated
                    </Chip>
                  </div>

                  {/* Right Column - Content */}
                  <div className="flex-1 space-y-3 sm:space-y-4">
                    {/* Stats Row */}
                    <div className="flex items-center justify-between gap-4 mb-2">
                        <div className="flex gap-4">
                      {[
                        { icon: StarFilledIcon, value: bid.freelancer.rating, color: "text-warning" },
                        { icon: CheckCircle2, value: "98%", color: "text-success" },
                        { icon: Clock, value: "2hrs", color: "text-primary" },
                      ].map((stat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <stat.icon className={`w-4 h-4 ${stat.color}`} />
                          <span className="text-xs sm:text-sm font-medium">{stat.value}</span>
                        </div>
                      ))}</div>

                    <Chip
                        variant="shadow"
                        classNames={{
                          base: "bg-gradient-to-br from-pink-500 to-orange-500 border-small border-white/50 shadow-lg ",
                          content: "text-white text-sm font-medium drop-shadow-md",
                        }}
                      >
                        ${bid.amount}/hr
                      </Chip>
                    </div>

                    {/* Proposal Preview */}
                    <div className="bg-default-50 rounded-xl p-3 sm:p-4">
                      <p className="text-xs sm:text-sm text-default-700 line-clamp-2">{bid.proposal}</p>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {bid.skills.map((skill) => (
                          <Chip
                            key={skill}
                            size="sm"
                            className="bg-default-100 hover:bg-default-200 transition-colors text-xs"
                          >
                            {skill}
                          </Chip>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-pink-500 to-orange-500 text-white font-medium
                          hover:opacity-90 transition-opacity"
                          endContent={<ArrowUpRight className="w-4 h-4" />}
                          onClick={() => handleOpenBidDetails(bid)}
                        >
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          variant="bordered"
                          isIconOnly
                          className="border-default-200"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default BidsOverview