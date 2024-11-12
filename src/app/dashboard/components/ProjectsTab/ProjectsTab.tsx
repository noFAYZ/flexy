import { Button } from "@nextui-org/button";
import { Card, Chip, Select, SelectItem } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Filter, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { ProjectCard } from "../ProjectCard/ProjectCard";


export const ProjectsTab = ({ projects, initialCount = 2 }) => {
    const [displayCount, setDisplayCount] = useState(initialCount);
    const [isLoading, setIsLoading] = useState(false);

    console.log("Project Tab",projects);
    
    const totalProjects = projects.length;
    const displayedProjects = projects.slice(0, displayCount);
    const hasMore = displayCount < totalProjects;
  
    const handleLoadMore = () => {
      setIsLoading(true);
      // Simulate loading delay
      setTimeout(() => {
        setDisplayCount(prev => Math.min(prev + 2, totalProjects));
        setIsLoading(false);
      }, 500);
    };
  
    return (
      <Card className="p-4 sm:p-6 rounded-[3.5rem]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-medium">Active Projects</h3>
            <div className="flex items-center gap-2">
              <p className="text-default-500 text-sm">
                {`Showing ${displayedProjects.length} of ${totalProjects} projects`}
              </p>
              {hasMore && (
                <Chip 
                  size="sm" 
                  variant="flat" 
                  className="bg-pink-500/10 text-pink-500"
                >
                  {totalProjects - displayCount} more
                </Chip>
              )}
            </div>
          </div>
  
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              size="sm"
              variant="flat"
              startContent={<Filter size={16} />}
              radius="full"
              className="w-full sm:w-auto"
            >
              Filter
            </Button>
            <Select
              size="sm"
              className="w-full sm:w-40"
              defaultSelectedKeys={["all"]}
              classNames={{
                trigger: "h-9",
              }}
            >
              <SelectItem key="all">All Projects</SelectItem>
              <SelectItem key="active">Active</SelectItem>
              <SelectItem key="completed">Completed</SelectItem>
            </Select>
          </div>
        </div>
  
        {/* Projects List with Animation */}
        <div className="space-y-4">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
  
        {/* Load More Button */}
        {hasMore && (
          <motion.div 
            className="mt-6 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              isLoading={isLoading}
              onClick={handleLoadMore}
              className="bg-default/40 hover:bg-default/60 transition-colors rounded-2xl group relative overflow-hidden"
              endContent={
                !isLoading && (
                  <motion.div
                    animate={{ rotate: hasMore ? 0 : 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.div>
                )
              }
            >
              {isLoading ? "Loading..." : "Load More Projects"}
              
              {/* Gradient hover effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
                animate={{ opacity: isLoading ? 1 : 0 }}
              />
            </Button>
          </motion.div>
        )}
  
        {/* Show message when all projects are loaded */}
        {!hasMore && displayCount > initialCount && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center text-default-500 text-sm"
          >
            <p>All projects have been loaded</p>
          </motion.div>
        )}
      </Card>
    );
  };