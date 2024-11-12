import { Button } from "@nextui-org/button";
import { Badge, Card, Chip } from "@nextui-org/react";
import { motion } from "framer-motion";
import {  Zap, MessageSquare,  ChevronRight, Calendar, DollarSign, Users, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export const ProjectCard = ({ project }) => {
    const [isHovered, setIsHovered] = useState(false);

    console.log("Project Card",project);
  
    const getStatusColor = (status) =>
      ({
        completed: "border-green-500 bg-green-500/10 text-green-600",
        in_progress: "border-blue-500 bg-blue-500/10 text-blue-600",
        blocked: "border-red-500 bg-red-500/10 text-red-600",
        review: "border-amber-500 bg-amber-500/10 text-amber-600",
      }[status] || "border-default-500 bg-default-100 text-default-600");
  
    const getStatusBarColor = (status) =>
      ({
        completed: "bg-gradient-to-r from-green-500 to-emerald-600",
        in_progress: "bg-gradient-to-r from-pink-500 to-orange-600",
        blocked: "bg-gradient-to-r from-red-500 to-rose-600",
        review: "bg-gradient-to-r from-amber-500 to-orange-600",
      }[status] || "bg-gradient-to-r from-pink-500 to-orange-600");
  
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
        <Link href={`/projects/${project.id}`}>
          <Card
            className={`relative bg-default/40 rounded-[2.5rem] overflow-hidden border border-default-200 backdrop-blur-sm
              ${isHovered ? "shadow-lg shadow-pink-500/10" : "shadow-sm"} 
              transition-all duration-300`}
          >
            {/* Status Bar 
              <div className={`absolute top-0 left-0 right-0 h-1 ${getStatusBarColor(project.status)} opacity-80`} />*/}
    
            <div className="p-4 sm:p-5 rounded-2xl">
              {/* Header Section */}
              <div className="flex flex-col sm:flex-row gap-4 sm:items-start justify-between mb-4">
                <div className="space-y-2 min-w-0">
                  <h3 className="text-lg font-semibold tracking-tight pr-4">
                    {project.title}
                  </h3>
    
                  {/* Status Chips */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Chip
                      size="sm"
                      variant="flat"
                      className={`${getStatusColor(project.status)} border`}
                    >
                      {project.status.replace("_", " ")}
                    </Chip>
                    {project.priority === "high" && (
                      <Chip
                        size="sm"
                        startContent={<Zap className="w-3 h-3" />}
                        className="bg-gradient-to-r from-pink-500 to-orange-600 text-white border-none"
                      >
                        High Priority
                      </Chip>
                    )}
                    <Chip
                      size="sm"
                      variant="flat"
                      className="bg-default-100 text-default-600"
                    >
                      {project.category}
                    </Chip>
                  </div>
                </div>
    
                {/* Desktop Actions */}
                <div className="hidden sm:flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="solid"
                    className="text-default-500 hover:text-orange-500 transition-colors rounded-2xl "
                    startContent={<MessageSquare className="w-4 h-4" />}
                    endContent={
                      <Badge
                        className=" bg-red-700 text-white"
                        size="md"
                        variant="solid"
                        content={2}
                      >
                        {" "}
                      </Badge>
                    }
                  >
                    <span className="pr-2">Chat</span>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-pink-500 to-orange-600 text-white rounded-2xl"
                    endContent={<ChevronRight className="w-4 h-4" />}
                  >
                    View Details
                  </Button>
                </div>
              </div>
    
              {/* Project Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <div className="flex items-center gap-1.5 text-default-500">
                  <div className="p-1 rounded-full bg-pink-50 dark:bg-pink-500/10">
                    <Calendar className="w-3.5 h-3.5 text-pink-500" />
                  </div>
                  <span className="text-sm">
                    Due {new Date(project.timeline.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-default-500">
                  <div className="p-1 rounded-full bg-orange-50 dark:bg-orange-500/10">
                    <DollarSign className="w-3.5 h-3.5 text-orange-500" />
                  </div>
                  <span className="text-sm">
                    ${project.budget.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-default-500">
                  <div className="p-1 rounded-full bg-blue-50 dark:bg-blue-500/10">
                    <Users className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                  <span className="text-sm">{project.team.length} members</span>
                </div>
              </div>
    
              {/* Milestones */}
              {project.milestones.length > 0 && (
                <div className="space-y-2 mb-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-default-500">Milestones</span>
                    <motion.span
                      className="font-medium"
                      animate={{
                        scale: isHovered ? 1.05 : 1,
                        transition: { duration: 0.2 },
                      }}
                    >
                      {project.milestones.filter((m) => m.completed).length}/
                      {project.milestones.length}
                    </motion.span>
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    {project.milestones.map((milestone, index) => (
                      <motion.div
                        key={milestone.id}
                        className={`h-1.5 rounded-full ${
                          milestone.completed
                            ? "bg-gradient-to-r from-pink-500/80 to-orange-600/80"
                            : "bg-default/40"
                        }`}
                        initial={{ scaleX: 0 }}
                        animate={{
                          scaleX: 1,
                          transition: { delay: index * 0.1 },
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
    
              {/* Mobile Actions */}
              <div className="sm:hidden">
                {/* Divider */}
                <div className="h-px bg-default-200 dark:bg-default-100/10 -mx-5 mb-4" />
    
                {/* Bottom Action Buttons */}
                <div className="flex flex-col xs:flex-row gap-2">
                  <Button
                    size="sm"
                    variant="flat"
                    className="w-full flex-1 rounded-2xl py-2 text-default-500 hover:text-orange-500 transition-colors"
                    startContent={<MessageSquare className="w-4 h-4" />}
                  >
                    Chat
                  </Button>
                  <Button
                    size="sm"
                    className="w-full flex-1 py-2 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-600 text-white"
                    endContent={<ArrowUpRight className="w-4 h-4" />}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      </motion.div>
    );
  };
  