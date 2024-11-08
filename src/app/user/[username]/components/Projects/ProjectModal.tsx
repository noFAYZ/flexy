
import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalHeader, ModalBody, Chip, ModalFooter } from "@nextui-org/react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Calendar, User, Code, LinkIcon, ExternalLink, Github } from "lucide-react";
import { Image } from "@nextui-org/react";
import React from "react";

  
  export  const ProjectDetailModal = ({ project, isOpen, onClose }) => {
    if (!project) return null;
  
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
        scrollBehavior="inside"
        className="rounded-[2.5rem]"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h2 className="text-xl font-bold">{project.title}</h2>
            <p className="text-sm text-gray-500">{project.category}</p>
          </ModalHeader>
          <ModalBody>
            <ScrollArea className="w-full h-[800px]  rounded-md">
              <div className="mb-6 w-full h-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  classNames={{
                    wrapper: "rounded-xl min-w-full h-full overflow-hidden",
                    img: "rounded-[2.5rem] min-w-full h-full object-cover",
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <ProjectInfoItem
                  icon={<Calendar />}
                  label="Completion Date"
                  value={project.completionDate}
                />
                <ProjectInfoItem
                  icon={<User />}
                  label="Client"
                  value={project.client}
                />
                <ProjectInfoItem
                  icon={<Code />}
                  label="Project Type"
                  value={project.type}
                />
                <ProjectInfoItem
                  icon={<LinkIcon />}
                  label="Industry"
                  value={project.industry}
                />
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Project Overview</h3>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                <ul className="list-disc list-inside space-y-1">
                  {project.features?.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Chip key={index} className="bg-primary/10 text-primary">
                      {tech}
                    </Chip>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </ModalBody>
          <ModalFooter>
            {project.demoLink && (
              <Button
                size="sm"
                className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold rounded-full 
  transition-all duration-100 transform hover:scale-105 mr-2"
                endContent={<ExternalLink size={16} />}
                as="a"
                href={project.demoLink}
                target="_blank"
              >
                Live Demo!
              </Button>
            )}
            {project.githubLink && (
              <Button
                size="sm"
                className="rounded-full"
                variant="solid"
                endContent={<Github size={16} />}
                as="a"
                href={project.githubLink}
                target="_blank"
              >
                View Code
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

 const ProjectInfoItem = ({ icon, label, value }) => (
    <div className="flex items-center gap-2">
      <div className="p-2 rounded-full bg-primary/10">
        {React.cloneElement(icon, { size: 16, className: "text-primary" })}
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );