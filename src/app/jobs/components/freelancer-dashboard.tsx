import React from 'react';
import { CardContent, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionItem, Card, CardHeader, Chip, Popover, PopoverContent, PopoverTrigger, Progress, User } from "@nextui-org/react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Briefcase, ChevronDown, DollarSign, MapPin, Star, Zap } from "lucide-react";

const freelancerData = {
  name: "John Doe",
  avatar: "https://i.pravatar.cc/150?u=johndoe",
  connects: 50,
  jobsBidded: 15,
  jobsWon: 8,
  totalEarned: 5000,
  rating: 4.8,
  successRate: 80,
  location: "New York, USA",
  description: "Experienced web developer",
};

export const FreelancerDashboard = ({ freelancer = freelancerData }) => (
  <Card className="mb-6 border-none shadow-none px-2 sm:px-4 bg-transparent">
    <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
      <Accordion defaultExpandedKeys={["theme"]} className="w-full">
        <AccordionItem
          key="theme"
          aria-label="Theme"
          indicator={<ChevronDown size={16} />}
          title={
            <Popover placement="bottom-start" className="">
              <PopoverTrigger className="px-2 sm:px-4 py-2  rounded-3xl border-medium border-default bg-muted w-full">
                <div className="flex flex-col w-full gap-2">
                  <div className="flex justify-between w-full items-center">
                    <User
                      name={freelancer.name}
                      description={(
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500 font-semibold">{freelancer.rating}</span>
                          <Star size={14} className="fill-yellow-500 text-yellow-500" />
                        </div>
                      )}
                      avatarProps={{
                        src: freelancer.avatar,
                        fallback: freelancer.name.charAt(0),
                        size: "sm",
                      }}
                      classNames={{
                        name: "text-sm sm:text-md",
                        description: "text-xs sm:text-sm",
                      }}
                      className="cursor-pointer"
                    />
                    <div className="flex items-center gap-2">
                      <Chip className='flex w-full px-2' startContent={ <Zap className="text-yellow-500 mb-1" fill="yellow" size={18}/>}>     
                      <p className="font-semibold text-sm">{freelancer.connects}</p>
                      </Chip>
                      <Chip className='flex w-full px-2' startContent={ <DollarSign className="text-success mb-1" fill="green" size={18}/>}>     
                      <p className="font-semibold text-sm">12,000</p>
                      </Chip>
                    
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-1">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span>Success Rate</span>
                      <span>{freelancer.successRate}%</span>
                    </div>
                    <Progress value={freelancer.successRate} className="h-2 text-success bg-success-50 shadow-md" color="success" />
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-4 py-2">
                <div className="flex flex-col gap-2">
                  <User
                    name={freelancer.name}
                    description={freelancer.description}
                    avatarProps={{
                      src: freelancer.avatar,
                      fallback: freelancer.name.charAt(0),
                      size: "lg",
                    }}
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin size={14} className="text-muted-foreground" />
                    <span className="text-sm">{freelancer.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={14} className="text-yellow-500" />
                    <span className="text-sm font-semibold">{freelancer.rating} / 5</span>
                    <span className="text-xs text-muted-foreground">(Based on 50+ reviews)</span>
                  </div>
                  <Chip variant="solid" className="self-start mt-2">
                    Verified Client
                  </Chip>
                </div>
              </PopoverContent>
            </Popover>
          }
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <div className="flex flex-col items-center">
              <Zap className="text-yellow-500 mb-1" />
              <p className="font-semibold">{freelancer.connects}</p>
              <p className="text-xs text-muted-foreground">Available Connects</p>
            </div>
            <div className="flex flex-col items-center">
              <Briefcase className="text-blue-500 mb-1" />
              <p className="font-semibold">{freelancer.jobsWon}</p>
              <p className="text-xs text-muted-foreground">Jobs Won</p>
            </div>
            <div className="flex flex-col items-center">
              <DollarSign className="text-green-500 mb-1" />
              <p className="font-semibold">${freelancer.totalEarned}</p>
              <p className="text-xs text-muted-foreground">Total Earned</p>
            </div>
            <div className="flex flex-col items-center">
              <Star className="text-orange-500 mb-1" />
              <p className="font-semibold">{freelancer.rating}</p>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </CardHeader>
    <CardContent>
      {/* Add any additional content here */}
    </CardContent>
  </Card>
);