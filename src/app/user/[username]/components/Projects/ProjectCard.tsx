"use client";

import { SolarLayersBroken } from "@/components/icons/icons";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@nextui-org/button";
import { useDisclosure, Card, CardHeader, CardBody, Chip } from "@nextui-org/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Image } from "@nextui-org/react";
import { ProjectDetailModal } from "./ProjectModal";

export  const FeaturedProjectsCard = ({ projects }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const nextProjects = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 3 >= projects.length ? 0 : prevIndex + 3
      );
    };
  
    const prevProjects = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? Math.max(0, projects.length - 3) : prevIndex - 3
      );
    };
  
    const handleProjectClick = (project) => {
      setSelectedProject(project);
      onOpen();
    };
  
    const visibleProjects = projects.slice(currentIndex, currentIndex + 3);
  
    return (
      <Card className="mb-6 bg-background shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
          <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
            <SolarLayersBroken size={22} className="text-primary mr-2" />
            Featured Projects
          </CardTitle>
        </CardHeader>
        <CardBody className="p-4 h-full">
          <div className="relative h-full">
            <div className="flex gap-4 h-full">
              {visibleProjects.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  onClick={() => handleProjectClick(project)}
                />
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <Button
                
                
                onClick={prevProjects}
                disabled={currentIndex === 0}
                className="bg-background/50 backdrop-blur-md transition-all duration-300"
              >
                <ChevronLeft />
                Previous
              </Button>
              <Button
                
                
                onClick={nextProjects}
                disabled={currentIndex + 3 >= projects.length}
                className="bg-background/50 backdrop-blur-md transition-all duration-300"
              >
                Next
                <ChevronRight />
              </Button>
            </div>
          </div>
        </CardBody>
        <ProjectDetailModal
          project={selectedProject}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Card>
    );
  };

  const ProjectCard = ({ project, onClick }) => (
    <div
      className="flex-shrink-0 w-full sm:w-[calc(33.333%-1rem)] min-w-[250px] group cursor-pointer"
      onClick={onClick}
    >
      <Card className="h-full rounded-[2.5rem] hover:shadow-lg transition-shadow duration-300">
        <CardBody className="p-1">
          <div className="relative h-full w-full">
            <Image
              src={project.image}
              alt={project.title}
              className="rounded-[2.5rem] object-cover shadow-lg backdrop:blur-sm h-56 w-full"
            />
          </div>
          <div className="py-2 px-4">
            <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
  
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 2).map((tech, index) => (
                <Chip key={index} className="text-xs bg-primary/10 text-primary">
                  {tech}
                </Chip>
              ))}
              {project.technologies.length > 2 && (
                <Chip className="text-xs bg-primary/10 text-primary">
                  +{project.technologies.length - 2}
                </Chip>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );