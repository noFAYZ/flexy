
"use client"
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Card, CardBody, Button, Avatar, Tooltip, Badge } from "@nextui-org/react";
import { StarIcon, BriefcaseIcon, ClockIcon, CurrencyDollarIcon, GlobeAltIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import { CalendarIcon, ChevronDownIcon, ChevronUpIcon, CodeIcon, ExternalLinkIcon, Users } from 'lucide-react';
 const user = {
        name: "Sophia Rodriguez",
        title: "Full Stack Developer & UX/UI Designer",
        avatar: "https://i.pravatar.cc/300?u=sophiarodriguez",
        tags: ["React", "Node.js", "UI/UX", "MongoDB", "TypeScript"],
        bio: "Passionate full-stack developer with 7+ years of experience crafting innovative web and mobile applications. Specializing in creating seamless user experiences backed by robust, scalable architectures. Committed to staying at the forefront of technology trends and delivering solutions that exceed client expectations.",
        
      
        projects: [
            {
                title: "EcoTrack",
                description: "A sustainability tracking app helping users reduce their carbon footprint.",
                image: "https://picsum.photos/seed/ecotrack/400/250",
                technologies: ["React Native", "Firebase", "Node.js", "MongoDB"]
              },
              {
                title: "EcoTrack",
                description: "A sustainability tracking app helping users reduce their carbon footprint.",
                image: "https://picsum.photos/seed/ecotrack/400/250",
                technologies: ["React Native", "Firebase", "Node.js", "MongoDB"]
              },
              {
                title: "EcoTrack",
                description: "A sustainability tracking app helping users reduce their carbon footprint.",
                image: "https://picsum.photos/seed/ecotrack/400/250",
                technologies: ["React Native", "Firebase", "Node.js", "MongoDB"]
              },
              {
                title: "EcoTrack",
                description: "A sustainability tracking app helping users reduce their carbon footprint.",
                image: "https://picsum.photos/seed/ecotrack/400/250",
                technologies: ["React Native", "Firebase", "Node.js", "MongoDB"]
              },
            // ... other projects
          ],
          workHistory: [
            {
              title: "Senior Full Stack Developer",
              company: "TechNova Solutions",
              period: "2020 - Present"
            },
            {
                title: "Senior Full Stack Developer",
                company: "TechNova Solutions",
                period: "2020 - Present"
              },
              {
                title: "Senior Full Stack Developer",
                company: "TechNova Solutions",
                period: "2020 - Present"
              },
          ],
        
        skills: [
          { name: "React & React Native", level: 95 },
          { name: "Node.js", level: 90 },
          { name: "UI/UX Design", level: 88 },
          { name: "MongoDB", level: 85 },
          { name: "TypeScript", level: 92 },
          { name: "GraphQL", level: 80 },
          { name: "AWS", level: 75 },
          { name: "Docker", level: 78 }
        ],
        
        rating: 4.9,
        projectsCompleted: 54,
        hoursWorked: 4200,
        hourlyRate: 95,
        website: "www.sophiarodriguez.dev",
        languages: ["English", "Spanish", "Portuguese"],
        
        testimonials: [
          {
            name: "Alex Chen",
            company: "HealthTech Innovations",
            comment: "Sophia's expertise in both front-end and back-end development was crucial in bringing our telemedicine platform to life. Her attention to detail and user-centric approach resulted in an intuitive and robust solution."
          },
          {
            name: "Emily Watson",
            company: "EcoSolutions Co.",
            comment: "Working with Sophia on our sustainability app was a fantastic experience. Her technical skills combined with her passion for environmental issues made her the perfect fit for our project."
          }
        ],
        
        certifications: [
          "AWS Certified Solutions Architect",
          "Google UX Design Professional Certificate",
          "MongoDB Certified Developer Associate"
        ],
        
        education: {
          degree: "M.S. in Computer Science",
          school: "Stanford University",
          year: 2016
        },
        
        availability: {
          status: "Available",
          hours: "30 hrs/week",
          timezone: "UTC-8 (PST)"
        },
        
        socialMedia: {
          github: "github.com/sophiarodriguez",
          linkedin: "linkedin.com/in/sophiarodriguez",
          twitter: "twitter.com/sophiadev"
        }
      };

      const ProfilePage = () => {
        return (
          <div className="max-w-5xl mx-auto p-4 ">
            <Card className="mb-6">
              <CardBody className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4">
                <Avatar src={user.avatar} className="w-24 h-24" />
                <div className="flex-grow text-center md:text-left">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-lg ">{user.title}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                    {user.tags.map((tag, index) => (
                      <Badge key={index} color="primary" variant="flat">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <Button color="primary" auto>Hire Me</Button>
              </CardBody>
            </Card>
      
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardBody>
                  <h2 className="text-xl font-semibold mb-2">About Me</h2>
                  <p className="text-sm ">{user.bio}</p>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <h2 className="text-xl font-semibold mb-2">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <Badge key={index} color="secondary" variant="flat">{skill.name}</Badge>
                    ))}
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <h2 className="text-xl font-semibold mb-2">Stats</h2>
                  <div className="grid grid-cols-2 gap-2">
                    <Stat icon={<StarIcon />} value={user.rating} label="Rating" />
                    <Stat icon={<BriefcaseIcon />} value={user.projectsCompleted} label="Projects" />
                    <Stat icon={<ClockIcon />} value={`${user.hoursWorked}h`} label="Hours" />
                    <Stat icon={<CurrencyDollarIcon />} value={`$${user.hourlyRate}`} label="Rate" />
                  </div>
                </CardBody>
              </Card>
            </div>
      
            <h2 className="text-2xl font-semibold mb-4">Featured Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {user.projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
      
            <Card>
              <CardBody>
                <h2 className="text-xl font-semibold mb-2">Work History</h2>
                <div className="space-y-4">
                  {user.workHistory.map((work, index) => (
                    <div key={index}>
                      <h3 className="font-semibold">{work.title}</h3>
                      <p className="text-sm ">{work.company} • {work.period}</p>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        );
      };
      
      const ProjectCard = ({ project }) => (
        <Card className="h-full">
          <CardBody className="p-0">
            <img src={project.image} alt={project.title} className="w-full h-32 object-cover" />
            <div className="p-3">
              <h3 className="text-md font-semibold mb-1">{project.title}</h3>
              <p className="text-xs mb-2 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <Badge key={index} variant="flat" color="primary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge variant="flat" color="primary" className="text-xs">+{project.technologies.length - 3}</Badge>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      );
      
      const Stat = ({ icon, value, label }) => (
        <Tooltip content={label}>
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-primary/10 text-primary mr-2">
              {React.cloneElement(icon, { className: "w-4 h-4" })}
            </div>
            <div>
              <div className="font-semibold">{value}</div>
              <div className="text-xs">{label}</div>
            </div>
          </div>
        </Tooltip>
      );
      

const WorkHistoryItem = ({ work }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 mr-4">
      <div className="w-4 h-4 rounded-full bg-primary mt-1"></div>
    </div>
    <div>
      <h3 className="text-lg font-semibold">{work.title}</h3>
      <p className="text-sm ">{work.company} • {work.period}</p>
      <p className="mt-1 ">{work.description}</p>
    </div>
  </div>
);

const SkillsConstellation = ({ skills }) => (
  <div className="relative h-64">
    {skills.map((skill, index) => (
      <Tooltip key={index} content={`${skill.name}: ${skill.level}`}>
        <div 
          className="absolute w-4 h-4 bg-primary rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${index * 0.1}s`
          }}
        />
      </Tooltip>
    ))}
  </div>
);

const StatItem = ({ icon, value, label }) => (
  <Tooltip content={label}>
    <div className="flex flex-col items-center  p-4 rounded-lg">
      <div className="p-3 rounded-full bg-primary/10 text-primary mb-2">
        {React.cloneElement(icon, { className: "w-6 h-6" })}
      </div>
      <div className="font-semibold">{value}</div>
      <div className="text-xs ">{label}</div>
    </div>
  </Tooltip>
);

export default ProfilePage;