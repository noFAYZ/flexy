import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { 
  Card, CardBody, Button, Chip, User, 
  Tooltip, Badge, Progress 
} from "@nextui-org/react";
import { 
  Briefcase, Clock, MapPin, Users, 
  Shield, Zap, Signal, Trophy, 
  Scale, CircleDollarSign, Star,
  ArrowUpRight, Bookmark
} from 'lucide-react';

export  function JobCard  ({ job, onApply, viewMode, onTagClick })  {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className=""
    >
      <Card 
        className="w-full rounded-[2.5rem] backdrop-blur-xl border-medium border-default-200 
          hover:border-red-500/50 transition-all duration-300 hover:shadow-xl 
          hover:shadow-red-500/10"
        isPressable
        onMouseMove={({ clientX, clientY, currentTarget }) => {
          const { left, top } = currentTarget.getBoundingClientRect();
          mouseX.set(clientX - left);
          mouseY.set(clientY - top);
        }}
        onPress={() => onApply(job)}
      >
        {/* Ambient background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background/50" />
        
        {/* Interactive gradient hover effect */}
        <motion.div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                400px circle at ${mouseX}px ${mouseY}px,
                rgba(255,100,50,0.1),
                transparent 80%
              )
            `
          }}
        />

        <CardBody className="px-6 py-4">
          {/* Top Section */}
          <div className="flex justify-between items-start mb-2">

          {/* Job Title & Description */}
            <div className="flex items-center gap-3">
                 
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2  text-gradient-to-r from-orange-500 to-pink-500 
              transition-colors">{job.title}</h3>
                 {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
            {[
              { icon: CircleDollarSign, label: "Budget", value: `$${job.budget.toLocaleString()}` },
              { icon: Clock, label: "Duration", value: job.duration },
              { icon: Users, label: "Proposals", value: `${job.applicants} Applied` },
            
            ].map((stat, index) => (
              <div key={index} className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-default-500">
                  <stat.icon size={14} />
                  <span className="text-xs">{stat.value}</span>
                </div>
         
              </div>
            ))}
          </div>
            <p className="text-default-500 line-clamp-3 text-sm">{job.excerpt}</p>
          </div>
            
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <Button
                isIconOnly
                className="bg-default-100 hover:bg-default-200"
                size="sm"
              >
                <Bookmark size={16} className="text-default-500" />
              </Button>
              <Badge 
                className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 
                  text-orange-500 border border-orange-500/20"
              >
                {job.experienceLevel}
              </Badge>
            </div>
          </div>


          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-2">
            {job.tags.map((tag) => (
              <Chip
                key={tag}
                className="bg-default-100 hover:bg-default-200 cursor-pointer text-xs"
                onClick={() => onTagClick(tag)}
                variant="flat"
                size="sm"
              >
                {tag}
              </Chip>
            ))}
          </div>

       

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-default-200">
    
               
               
           
            <div className="flex justify-between items-center gap-4 text-xs">
               
            <div>
                <div className="flex items-center gap-2">
                <User
                  name={job.client.name}
                  avatarProps={{ 
                    src: job.client.avatar,
                    className: "w-8 h-8 text-large border-2 border-orange-500/20"
                  }}
                />
    
                  <Tooltip content="Verified Client">
                    <Shield className="text-green-500" size={14} />
                  </Tooltip>
                </div>
              
              </div>  
              <div className="flex  items-center gap-1 text-default-500 text-xs">
                  <MapPin size={12} />
                  <span>{job.client.location}</span>
                </div>
              <div className="flex items-center gap-1">
                <Scale size={14} className="text-green-500" />
                <span className="text-default-500">Escrow Protected</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap size={14} className="text-orange-500" />
                <span className="text-default-500">Posted {job.postedDate}</span>
              </div>
            </div>
            
            <Button
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium
                shadow-lg hover:shadow-pink-500/25 transition-all duration-300 rounded-xl"
              size="sm"
              endContent={<ArrowUpRight size={16} />}
              onClick={() => onApply(job)}
            >
              Quick Apply
            </Button>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

