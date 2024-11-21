import {
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Progress,
  User,
  Avatar,
} from "@nextui-org/react";
import {
  ArrowUpRight,
  Clock,
  CrownIcon,
  Globe,
  MessageCircle,
} from "lucide-react";

import { Award } from "lucide-react";

import { CardTitle } from "@/components/ui/card";

const TopProposals = () => {
  return (
    <Card className="mb-6 bg-background shadow-none rounded-[2.5rem] border-medium border-default">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 flex flex-wrap gap-4 justify-between">
        <CardTitle className="text-lg sm:text-xl font-semibold flex items-center gap-2">
          <Award size={22} className="text-primary" />
          Featured Proposals
        </CardTitle>
        <Button
          size="sm"
          variant="flat"
          endContent={<ArrowUpRight className="w-4 h-4" />}
        >
          View All 24
        </Button>
      </CardHeader>

      <div className="p-6">
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((profile) => (
            <Card
              key={profile}
              className="group relative bg-background/50 backdrop-blur-xl p-1 rounded-[2rem] border-medium border-default-200 
              hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              {/* Gradient Border Effect 
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-orange-500 rounded-[2rem] opacity-[0.15] group-hover:opacity-25 transition-all" />*/}

              <div className="relative bg-background rounded-[1.8rem] p-6 h-full">
                {/* Profile Header */}
                <div className="space-y-4">
                  <div className="absolute top-3 right-4 justify-center">
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
                  {/* Avatar & Name - Removed justify-between since badge is absolute */}
                  <div className="flex gap-3 items-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl blur-md opacity-40" />
                      <Avatar
                        src={`https://i.pravatar.cc/150?u=${profile}`}
                        className="w-12 h-12 border-3 border-background relative"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success-500 rounded-full border-2 border-background" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Alex Thompson
                      </h3>
                      <p className="text-xs text-default-500">
                        Senior Blockchain Dev
                      </p>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "$85", label: "Hourly", metric: "98% Success" },
                      {
                        value: "4.95",
                        label: "Rating",
                        metric: "180+ Reviews",
                      },
                    ].map((stat, idx) => (
                      <div
                        key={idx}
                        className="space-y-1 p-3 rounded-xl bg-default-50 group-hover:bg-default-100 transition-colors"
                      >
                        <div className="flex items-baseline gap-1">
                          <span className="text-base font-semibold">
                            {stat.value}
                          </span>
                          <span className="text-xs text-default-500">
                            {stat.label}
                          </span>
                        </div>
                        <p className="text-xs text-default-500">
                          {stat.metric}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1">
                    {["Solidity", "Smart Contracts", "DeFi"].map((skill) => (
                      <Chip
                        key={skill}
                        size="sm"
                        className="bg-default-100 hover:bg-default-200 transition-colors text-xs"
                      >
                        {skill}
                      </Chip>
                    ))}
                  </div>

                  {/* Quick Info */}
                  <div className="flex flex-wrap gap-2 text-xs text-default-500">
                    <div className="flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      United States
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      2h Response
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white font-medium
                      hover:opacity-90 transition-opacity"
                      endContent={<ArrowUpRight className="w-4 h-4" />}
                    >
                      View Profile
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
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TopProposals;
