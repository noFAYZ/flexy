import React, { useState } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { 
  Card, CardBody, Button, Chip, User, 
  Tooltip, Badge, Progress, 
  Divider
} from "@nextui-org/react";
import { 
  Briefcase, Clock, MapPin, Users, 
  Shield, Zap, Signal, Trophy, 
  Scale, CircleDollarSign, Star,
  ArrowUpRight, Bookmark,

} from 'lucide-react';

export  function JobCard  ({ job, onApply, viewMode, onTagClick })  {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0.9 }}
      whileHover={{
        opacity: 1,
        y: -2,
        transition: { duration: 0.2 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        className={`relative bg-default/40 rounded-[2.5rem] overflow-hidden border border-default-200 backdrop-blur-sm
          ${isHovered ? "shadow-lg shadow-pink-500/10" : "shadow-sm"} 
          transition-all duration-300`}
      >
        <div className="p-4 sm:p-5 rounded-2xl">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-start justify-between mb-4">
            <div className="space-y-2 min-w-0">
              <h3 className="text-lg font-semibold tracking-tight pr-4">
                {job.title}
              </h3>

              {/* Status Chips */}
              <div className="flex flex-wrap items-center gap-2">
                <Chip
                  size="sm"
                  variant="flat"
                  className="bg-gradient-to-r from-pink-500/10 to-orange-600/10 text-orange-600 border border-orange-500/20"
                >
                  {job.experienceLevel}
                </Chip>
                <Chip
                  size="sm"
                  startContent={<Shield className="w-3 h-3 text-green-500" />}
                  className="bg-green-500/10 text-green-600 border border-green-500/20"
                >
                  Verified Client
                </Chip>
                <Chip
                  size="sm"
                  startContent={<Scale className="w-3 h-3" />}
                  className="bg-default-100 text-default-600"
                >
                  Escrow Protected
                </Chip>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden sm:flex items-center gap-2">
              <Button
                size="sm"
                variant="flat"
                isIconOnly
                className="text-default-500 hover:text-orange-500 transition-colors rounded-2xl"
              >
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-pink-500 to-orange-600 text-white rounded-2xl"
                endContent={<ArrowUpRight className="w-4 h-4" />}
                onClick={() => onApply(job)}
              >
                Quick Apply
              </Button>
            </div>
          </div>

          {/* Project Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div className="flex items-center gap-1.5 text-default-500">
              <div className="p-1 rounded-full bg-pink-50 dark:bg-pink-500/10">
                <CircleDollarSign className="w-3.5 h-3.5 text-pink-500" />
              </div>
              <span className="text-sm">${job.budget.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5 text-default-500">
              <div className="p-1 rounded-full bg-orange-50 dark:bg-orange-500/10">
                <Clock className="w-3.5 h-3.5 text-orange-500" />
              </div>
              <span className="text-sm">{job.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-default-500">
              <div className="p-1 rounded-full bg-blue-50 dark:bg-blue-500/10">
                <Users className="w-3.5 h-3.5 text-blue-500" />
              </div>
              <span className="text-sm">{job.applicants} Applied</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-default-500 text-sm mb-4 line-clamp-2">
            {job.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
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

          {/* Client Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <User
                name={job.client.name}
                avatarProps={{
                  src: job.client.avatar,
                  className: "w-8 h-8 text-large border-2 border-orange-500/20"
                }}
              />
              <div className="flex items-center gap-3 text-xs text-default-500">
                <div className="flex items-center gap-1">
                  <MapPin size={12} />
                  <span>{job.client.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap size={12} className="text-orange-500" />
                  <span>Posted {job.postedDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="sm:hidden mt-4">
            <div className="h-px bg-default-200 dark:bg-default-100/10 -mx-5 mb-4" />
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="flat"
                isIconOnly
                className="flex-none text-default-500 hover:text-orange-500 transition-colors rounded-2xl"
              >
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-gradient-to-r from-pink-500 to-orange-600 text-white rounded-2xl"
                endContent={<ArrowUpRight className="w-4 h-4" />}
                onClick={() => onApply(job)}
              >
                Quick Apply
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

