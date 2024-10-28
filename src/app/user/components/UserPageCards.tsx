"use client";
import { Avatar, Badge, CardHeader, Chip, Input,  Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Progress,  Select,  SelectItem,  Tab,  Tabs,  Textarea,  Tooltip, useDisclosure } from "@nextui-org/react";
import {
  Award,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Code,
  Coffee,
  Cpu,
  ExternalLink,
  Github,
  Globe,
  Heart,
  LanguagesIcon,
  LinkIcon,
  MapPin,
  MapPinIcon,
  Pencil,
  Plus,
  Star,
  Target,
  Trash2,
  TrendingUp,
  Trophy,
  User,
  Users,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";

import { StarRating } from "@/components/rating";


import { Card, CardBody } from "@nextui-org/react";
import {  CarbonBadge, ClarityCertificateLine, F7Wrench, FluentBriefcaseSearch20Regular, HugeiconsContact, HugeiconsNoteDone, MingcuteExchangeDollarLine, SolarLayersBroken } from "@/components/icons/icons";
import { AnimatePresence, motion } from "framer-motion";
import { CardContent, CardTitle } from "@/components/ui/card";
import { Image } from "@nextui-org/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProfileBadges from "./ProfileBadges";
import ProfileSocials from "./ProfileSocials";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { Content } from "@tiptap/react";

export const ProfileHeader = ({ user }) => (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full lg:w-auto">
      <div className="relative flex flex-col items-center sm:items-start">
        <Badge
          content="online"
          color="success"
          size="sm"
          placement="bottom-right"
          className="shadow"
        >
          <Avatar
            isBordered
            color="success"
            src="https://avatar.iran.liara.run/public"
            className="w-28 h-28 sm:w-36 sm:h-36 text-large"
          />
        </Badge>
      </div>
      <div className="flex flex-col justify-between mt-4 sm:mt-0 text-center sm:text-left">
        <div className="flex flex-col">
          <span className="flex gap-2 text-2xl sm:text-3xl font-medium align-baseline items-center justify-center sm:justify-start">
            {user.name}
            <Tooltip
              showArrow={true}
              content="ID verified"
              className="bg-orange-600 text-white rounded-full"
              placement={"top-start"}
            >
              <span className="bg-orange-600 rounded-full p-[1px]">
                <BadgeCheck className="p-0" stroke="background" />
              </span>
            </Tooltip>
          </span>
          <span className="text-sm font-medium text-gray-400 pb-2 pt-0">
            @{user.username}
          </span>
          <span className="text-md">{user.title}</span>
        </div>
        <div className="mt-2 flex flex-col items-center sm:items-start">
          <StarRating
            isInteractive={false}
            size={18}
            initialRating={user.rating}
          />
          <span className="flex gap-1 align-baseline items-center text-sm mt-2">
            <MapPinIcon size={18} /> {user.location}
          </span>
        </div>
      </div>
    </div>
  );
  
  export const ProfileStats = ({ user }) => (
    <div className="flex flex-col  items-center gap-1 sm:gap-2 md:gap-4 w-full lg:w-auto">
      <ProfileBadges />
  
      <Card className="flex flex-row mb-6 w-fit px-4 bg-gradient-to-tl from-pink-500 to-orange-500 text-white shadow backdrop-blur-0 rounded-[2.5rem] items-center content-center justify-center align-middle">
        <CardBody>
          <div className="flex gap-1 md:gap2 lg:gap-4 items-center  py-2 ">
            <div
              className="flex flex-row  w-fit items-center shadow-lg  align-middle bg-card text-foreground/80 px-1 py-1 md:px-2 
             md:py-2 rounded-full gap-1"
            >
              <MingcuteExchangeDollarLine
                fill={"lime-500"}
                height={24}
                className="text-semibold"
              />
              <span className="font-semibold">${user.hourlyRate}.00/hr</span>
            </div>
            <div className="flex gap-4 sm:gap-5 md:gap-6">
              {" "}
              <Stat value={"$2k"} label="Earned" />
              <Stat value={user.projectsCompleted} label="Projects" />
              <Stat value={`${user.hoursWorked}`} label="Hours" />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
  
  export const Stat = ({ value, label }) => (
    <div className="flex items-center">
      <div>
        <div className="font-semibold">{value}</div>
        <div className="text-xs">{label}</div>
      </div>
    </div>
  );
  
 export const AboutMeCard = ({ aboutData, onUpdate }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editData, setEditData] = useState(aboutData);
    const [value, setValue] = useState<Content>('')

    const handleSave = () => {
      console.log(aboutData)
      onUpdate(editData);
      onClose();
    };
  
    return (
      <>
        <Card className="mb-6 bg-background shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50 overflow-hidden">
          <CardBody className="p-6">
            <div className="space-y-6">
              {/* Header with Edit Button */}
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-semibold mb-4 text-foreground flex items-center">
                  <span className="bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
                    About Me
                  </span>
                </h2>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onClick={onOpen}
                  className="text-default-500 hover:text-primary"
                >
                  <Pencil size={18} />
                </Button>
              </div>
  
              {/* Main Bio Section */}
              <div>
                <p className="text-md text-foreground/70 leading-relaxed mb-4">
                  {aboutData.bio}
                </p>
              </div>
  
              {/* Quick Facts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <QuickFact
                  icon={<Globe />}
                  title="Location"
                  value={aboutData.location}
                />
                <QuickFact
                  icon={<Briefcase />}
                  title="Experience"
                  value={`${aboutData.yearsOfExperience}+ Years`}
                />
                <QuickFact
                  icon={<Trophy />}
                  title="Projects Completed"
                  value={aboutData.projectsCompleted}
                />
                <QuickFact
                  icon={<Coffee />}
                  title="Coffee Consumed"
                  value={`${aboutData.coffeeCount}+ Cups`}
                />
              </div>
            </div>
          </CardBody>
        </Card>
  
        {/* Edit Drawer */}
        <div
          className={`fixed inset-y-0 right-0 w-full sm:w-1/2 bg-background shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="h-full flex flex-col">
            {/* Drawer Header */}
            <div className="p-6 border-b border-divider flex justify-between items-center">
              <h2 className="text-xl font-semibold">Edit About Me</h2>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onClick={onClose}
                className="text-default-500"
              >
                <X size={20} />
              </Button>
            </div>
  
            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-foreground/80 mb-2 block">
                    Bio
                  </label>
                  <MinimalTiptapEditor
                    value={editData.bio}
                    onChange={(e) => setEditData({ ...editData, bio: e })}
                    className="w-full"
                    editorContentClassName="p-5"
                    output="html"
                    placeholder="Type your description here..."
                    autofocus={true}
                    editable={true}
                    editorClassName="focus:outline-none"
                  />
                </div>
  
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <QuickFactsEditor quickFacts={aboutData.quickFacts} setEditData={setEditData} />
             
                </div>
              </div>
            </div>
  
            {/* Drawer Footer */}
            <div className="p-6 border-t border-divider">
              <div className="flex justify-end gap-2">
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  className="bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                  onPress={handleSave}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
  
        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />
        )}
      </>
    );
  };

  const availableIcons = [
    { label: 'Globe', icon: Globe },
    { label: 'Briefcase', icon: Briefcase },
    { label: 'Trophy', icon: Trophy },
    { label: 'Coffee', icon: Coffee },
    { label: 'Target', icon: Target },
    { label: 'Heart', icon: Heart },
    { label: 'Star', icon: Star },
    { label: 'Award', icon: Award },
    { label: 'Users', icon: Users },
    { label: 'Clock', icon: Clock },
    { label: 'Code', icon: Code },
    { label: 'Book', icon: BookOpen },
    { label: 'CPU', icon: Cpu },
    { label: 'Location', icon: MapPin }
  ];
  
  const QuickFactsEditor = ({ quickFacts, setEditData }) => {
    
    const addQuickFact = () => {
      console.log(quickFacts)
      if (quickFacts?.length < 4) {
        setEditData({
          ...quickFacts,
          quickFacts: [
            ...quickFacts?.quickFacts,
            { icon: 'Globe', title: '', value: '' }
          ]
        });
      }
    };
  
    const removeQuickFact = (index) => {
      const newQuickFacts = quickFacts.filter((_, i) => i !== index);
      setEditData({
        ...quickFacts,
        quickFacts: newQuickFacts
      });
    };
  
    const updateQuickFact = (index, field, value) => {
      const newQuickFacts = [...quickFacts];
      newQuickFacts[index] = {
        ...newQuickFacts[index],
        [field]: value
      };
      setEditData({
        ...quickFacts,
        quickFacts: newQuickFacts
      });
    };
  
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <label className="text-lg font-medium text-foreground/80">
            Quick Facts
          </label>
          <Button
            size="sm"
            variant="flat"
            color="primary"
            startContent={<Plus size={16} />}
            onClick={addQuickFact}
            disabled={quickFacts?.length >= 4}
            className="bg-gradient-to-r from-pink-500/20 to-orange-500/20"
          >
            Add Fact
          </Button>
        </div>
  
        <div className="space-y-4">
          {quickFacts?.map((fact, index) => (
            <div 
              key={index}
              className="p-4 bg-content2 rounded-xl border border-divider"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-medium text-foreground/80">
                  Fact {index + 1}
                </h3>
                <Button
                  isIconOnly
                  size="sm"
                  color="danger"
                  variant="light"
                  onClick={() => removeQuickFact(index)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
  
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground/60 mb-2 block">
                    Icon
                  </label>
                  <Select
                    value={fact.icon}
                    onChange={(e) => updateQuickFact(index, 'icon', e.target.value)}
                    size="sm"
                  >
                    {availableIcons.map((iconOption) => (
                      <SelectItem key={iconOption.label} value={iconOption.label}>
                        <div className="flex items-center gap-2">
                          <iconOption.icon size={16} />
                          {iconOption.label}
                        </div>
                      </SelectItem>
                    ))}
                  </Select>
                </div>
  
                <div>
                  <label className="text-sm font-medium text-foreground/60 mb-2 block">
                    Title
                  </label>
                  <Input
                    size="sm"
                    value={fact.title}
                    onChange={(e) => updateQuickFact(index, 'title', e.target.value)}
                    placeholder="Enter title"
                  />
                </div>
  
                <div>
                  <label className="text-sm font-medium text-foreground/60 mb-2 block">
                    Value
                  </label>
                  <Input
                    size="sm"
                    value={fact.value}
                    onChange={(e) => updateQuickFact(index, 'value', e.target.value)}
                    placeholder="Enter value"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
  
        {quickFacts?.length === 0 && (
          <div className="text-center py-8 text-foreground/60">
            No quick facts added. Click "Add Fact" to start.
          </div>
        )}
      </div>
    );
  };


  
  const QuickFact = ({ icon, title, value }) => {
    const IconComponent = availableIcons.find(i => i.label === icon)?.icon || Globe;
    
    return (
      <div className="flex items-center gap-3 bg-content2 rounded-xl p-4">
        <div className="p-2 rounded-full bg-gradient-to-r from-pink-500/20 to-orange-500/20">
          <IconComponent className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-foreground/60">{title}</p>
          <p className="font-semibold">{value}</p>
        </div>
      </div>
    );
  };
  
  export const ReviewsCard = ({ completedWork, inProgressWork }) => {
    const [activeTab, setActiveTab] = useState("completed");
    const [selectedWork, setSelectedWork] = useState(null);
    const [visibleCount, setVisibleCount] = useState(4);
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const currentWork =
      activeTab === "completed" ? completedWork : inProgressWork;
    const displayedWork = currentWork.slice(0, visibleCount);
  
    const handleWorkClick = (work) => {
      setSelectedWork(work);
      onOpen();
    };
  
    const handleViewMore = () => {
      setVisibleCount((prevCount) => Math.min(prevCount + 2, currentWork.length));
    };
  
    return (
      <Card className="mb-6 bg-background shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 flex flex-wrap  gap-4 justify-between sm:gap-0">
          <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
            <HugeiconsNoteDone size={22} className="text-primary mr-2" />
            Recent Work
          </CardTitle>
          <div className="antialiased flex border-medium border-default bg-muted rounded-full p-1">
            <TabButton
              isActive={activeTab === "completed"}
              onClick={() => {
                setActiveTab("completed");
                setVisibleCount(4); // Reset visible count when switching tabs
              }}
            >
              <span className="flex gap-1">
                Completed ({completedWork.length})
              </span>
            </TabButton>
            <TabButton
              isActive={activeTab === "inProgress"}
              onClick={() => {
                setActiveTab("inProgress");
                setVisibleCount(4); // Reset visible count when switching tabs
              }}
            >
              <span className="flex gap-1">
                In Progress ({inProgressWork.length})
              </span>
            </TabButton>
          </div>
        </CardHeader>
        <CardBody className="p-4">
          <div className="space-y-2">
            {displayedWork.map((work, index) => (
              <RecentWorkItem
                key={index}
                work={work}
                onClick={() => handleWorkClick(work)}
              />
            ))}
          </div>
          {visibleCount < currentWork.length && (
            <div className="mt-4 text-center rounded-3xl">
              <Button
                size="sm"
                className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold rounded-full 
                transition-all duration-100 transform hover:scale-105"
                endContent={<ChevronRight size={16} />}
                onClick={handleViewMore}
              >
                View more! ({currentWork.length - visibleCount} remaining)
              </Button>
            </div>
          )}
        </CardBody>
        <DetailedReviewModal
          work={selectedWork}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Card>
    );
  };
  
  export const TabButton = ({ isActive, onClick, children }) => (
    <button
      className={`flex py-2 px-4 text-xs rounded-full transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white"
          : "text-gray-600 hover:text-gray-100"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
  
  export const RecentWorkItem = ({ work, onClick }) => {
    return (
      <div
        className="p-4 border-b-2 cursor-pointer hover:bg-muted transition-colors duration-200"
        onClick={onClick}
      >
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-lg">{work.title}</h3>
          </div>
          <Chip
            variant="flat"
            className="text-sm bg-gradient-to-r from-pink-500 to-orange-500 text-white"
          >
            {work.amount}
          </Chip>
        </div>
        <p className="text-sm mb-3 line-clamp-2">{work.review}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Avatar src={work.clientAvatar} size="sm" className="mr-2" />
            <p className="text-xs mr-4">{work.clientName}</p>
            <span className="text-xs">
              {new Date(work.date).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center mb-2">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < work.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm font-medium">
                {work?.rating?.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export const DetailedReviewModal = ({ work, isOpen, onClose }) => {
    if (!work) return null;
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h2 className="text-xl font-bold">{work.title}</h2>
            <p className="text-sm text-gray-500">{work.clientName}</p>
          </ModalHeader>
          <ModalBody>
            <div className="mb-4">
              <Chip
                variant="flat"
                className="text-sm bg-gradient-to-r from-pink-500 to-orange-500 text-white"
              >
                {work.amount}
              </Chip>
            </div>
            <p className="text-base mb-4">{work.review}</p>
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={
                      i < work.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-lg font-medium">
                {work?.rating?.toFixed(1)}
              </span>
            </div>
            <div className="flex items-center">
              <Avatar src={work.clientAvatar} size="lg" className="mr-4" />
              <div>
                <p className="font-semibold">{work.clientName}</p>
                <span className="text-sm text-gray-500">
                  {new Date(work.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
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
                auto
                light
                onClick={prevProjects}
                disabled={currentIndex === 0}
                className="bg-background/50 backdrop-blur-md transition-all duration-300"
              >
                <ChevronLeft />
                Previous
              </Button>
              <Button
                auto
                light
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
  
  export  const ProjectCard = ({ project, onClick }) => (
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
                  layout="responsive"
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
  
  export const ProjectInfoItem = ({ icon, label, value }) => (
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
  
  export const WorkHistoryCard = ({ workHistory }) => (
    <Card className="bg-accent shadow backdrop-blur-0 rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
        <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
          <FluentBriefcaseSearch20Regular
            size={22}
            className="text-primary mr-2"
          />
          Work History
        </CardTitle>
      </CardHeader>
      <CardBody className="p-4">
        <div className="relative">
          {workHistory.map((work, index) => (
            <WorkHistoryItem
              key={index}
              work={work}
              isLast={index === workHistory.length - 1}
            />
          ))}
        </div>
      </CardBody>
    </Card>
  );
  
  export  const WorkHistoryItem = ({ work, isLast }) => (
    <div className="flex items-start space-x-4 mb-4 relative">
      <div className=" w-full ">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src={`https://avatar.iran.liara.run/public/`}
              alt={`${work.company} logo`}
              width={40}
              height={40}
              className="rounded-full bg-white p-1 shadow-md"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${work.company}&background=random`;
              }}
            />
            <div>
              <h3 className="font-semibold text-sm">{work.title}</h3>
              <p className="text-xs">{work.company}</p>
            </div>
          </div>
          <Chip className="text-xs">{work.period}</Chip>
        </div>
        <p className="text-sm text-gray-500 mt-2">{work.description}</p>
      </div>
    </div>
  );
  
  export  const LanguageesCard = ({ languages }) => (
    <Card className="bg-accent shadow backdrop-blur-0 rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
        <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
          <LanguagesIcon size={22} className="text-primary mr-2" />
          Languages
        </CardTitle>
      </CardHeader>
      <CardBody className="p-4">
        <div className="flex flex-wrap gap-2">
          {languages.map((lang, index) => (
            <Chip
              key={index}
              className="bg-gradient-to-r from-pink-500/10 to-orange-500/10"
            >
              {lang}
            </Chip>
          ))}
        </div>
      </CardBody>
    </Card>
  );
  
  export const SkillsCard = ({ skills }) => (
    <Card className=" bg-accent shadow backdrop-blur-0 rounded-[2.5rem] border-medium border-default  bg-gradient-to-br from-background to-muted/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
        <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
          <motion.div className="mr-2">
            <F7Wrench size={22} className="text-primary" />
          </motion.div>
          Skills
        </CardTitle>
      </CardHeader>
      <CardBody className="p-4">
        <div className="flex flex-wrap gap-1 ">
          {skills.map((skill, index) => (
            <div key={index}>
              <Chip className="font-semibold bg-gradient-to-r from-pink-500 to-orange-500 text-white">
                {skill.name}
              </Chip>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
  
  export const SocialsCard = () => (
    <Card className=" bg-accent shadow backdrop-blur-0 rounded-[2.5rem] border-medium border-default  bg-gradient-to-br from-background to-muted/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
        <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
          <motion.div className="mr-2">
            <HugeiconsContact size={22} className="text-primary" />
          </motion.div>
          Contacts
        </CardTitle>
      </CardHeader>
      <CardBody className="p-4">
        <ul className="space-y-2">
          <li className="flex gap-2 ">
            {" "}
            <h3> Phone:</h3> <span>+1 233 232 233</span>
          </li>
          <li className="flex gap-2 ">
            {" "}
            <h3> Email:</h3> <span>hello@mywebsite.com</span>
          </li>
          <li>
            {" "}
            <ProfileSocials />
          </li>
        </ul>
      </CardBody>
    </Card>
  );
  export const CertificationsCard = ({ certifications }) => {
    return (
      <Card className="bg-accent shadow backdrop-blur-0 rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
          <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
            <motion.div className="mr-2">
              <CarbonBadge size={22} className="text-primary" />
            </motion.div>
            Certifications
          </CardTitle>
        </CardHeader>
        <CardBody className="p-4">
          <motion.ul className="space-y-2">
            {certifications.map((certification, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group mb-4 "
              >
                <div className=" transition-colors duration-300  ">
                  <div className="flex gap-3 content-center items-center align-middle ">
                    <ClarityCertificateLine className="text-primary" size={20} />
                    <div>
                      <h3 className="font-medium group-hover:text-primary transition-colors duration-300">
                        {certification.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {certification.issuer}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-center"
          >
            <Button
              type="submit"
              size="sm"
              className={` text-xs bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold rounded-full 
                  transition-all duration-100 transform hover:scale-105 `}
              endContent={<ChevronRight size={16} />}
            >
              View all!
            </Button>
          </motion.div>
        </CardBody>
      </Card>
    );
  };
  export const EducationCard = ({ education }) => (
    <Card className="border-medium border-default rounded-3xl bg-gradient-to-br from-background to-muted/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
        <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
          <motion.div className="mr-2">
            <TrendingUp size={24} className="text-primary" />
          </motion.div>
          Education
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <AnimatePresence>
          <div className="relative">
            {education.map((ed, index) => (
              <EducationItem
                key={index}
                education={ed}
                isLast={index === education.length - 1}
              />
            ))}
          </div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
  
  export const EducationItem = ({ education, isLast }) => (
    <div className="flex items-start space-x-4 mb-4 relative">
      <div className="w-full ">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src={`https://avatar.iran.liara.run/public/`}
              alt={`${education.company} logo`}
              width={40}
              height={40}
              className="rounded-full bg-white p-1 shadow-md"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${education.company}&background=random`;
              }}
            />
            <div>
              <h3 className="font-semibold text-sm">{education.degree}</h3>
              <p className="text-xs">{education.school}</p>
            </div>
          </div>
          <Chip className="text-xs">{education.year}</Chip>
        </div>
      </div>
    </div>
  );
  
  export const EducationCard2 = ({ education }) => (
    <Card className="border-medium border-default rounded-3xl bg-gradient-to-br from-background to-muted/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
        <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
          <motion.div className="mr-2">
            <TrendingUp size={24} className="text-primary" />
          </motion.div>
          Education
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <AnimatePresence></AnimatePresence>
      </CardContent>
    </Card>
  );