import React, { useState } from "react";
import { Progress, Avatar, AvatarGroup, Button, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Textarea } from "@nextui-org/react";
import { ArrowUpRight, Calendar, Clock, Copy, MessageSquare, Pencil, Trash, Users, Wallet, Zap, Plus, X, Code2, Paintbrush, Network, Shield, Brain, Rocket, Target, Briefcase, Puzzle, Search, UserPlus } from "lucide-react";
import { ProjectCard } from "../ProjectCard/ProjectCard";
import Link from "next/link";

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

interface Team {
  id: string;
  name: string;
  icon: any;
  members: TeamMember[];
  description: string;
  color: string;
}

const teamIcons = [
  { icon: Code2, label: 'Development' },
  { icon: Paintbrush, label: 'Design' },
  { icon: Network, label: 'Network' },
  { icon: Shield, label: 'Security' },
  { icon: Brain, label: 'AI' },
  { icon: Rocket, label: 'Launch' },
  { icon: Target, label: 'Goals' },
  { icon: Briefcase, label: 'Business' },
  { icon: Puzzle, label: 'Strategy' }
];

const teamColors = [
  'from-pink-500 to-orange-600',
  'from-blue-500 to-purple-600',
  'from-green-500 to-teal-600',
  'from-yellow-500 to-red-600',
  'from-indigo-500 to-blue-600'
];

interface AvailableMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  skills: string[];
}

const availableMembers: AvailableMember[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    avatar: 'https://i.pravatar.cc/150?u=alice',
    role: 'UI Designer',
    skills: ['UI Design', 'Figma', 'User Research']
  },
  {
    id: '2',
    name: 'Bob Smith',
    avatar: 'https://i.pravatar.cc/150?u=bob',
    role: 'Frontend Developer',
    skills: ['React', 'TypeScript', 'Tailwind']
  },
  // Add more members as needed
];

export const OverviewTab = ({ stats, projects }) => {
  const [teams, setTeams] = useState<Team[]>([
    {
      id: 'design',
      name: 'Design Team',
      icon: Paintbrush,
      members: [
        { id: '1', name: 'Alice', avatar: 'https://i.pravatar.cc/150?u=alice', role: 'UI Designer' },
        { id: '2', name: 'Bob', avatar: 'https://i.pravatar.cc/150?u=bob', role: 'UX Designer' }
      ],
      description: 'UI/UX and Visual Design Team',
      color: 'from-pink-500 to-orange-600'
    },
    {
      id: 'development',
      name: 'Development Team',
      icon: Code2,
      members: [
        { id: '3', name: 'Charlie', avatar: 'https://i.pravatar.cc/150?u=charlie', role: 'Frontend Dev' },
        { id: '4', name: 'David', avatar: 'https://i.pravatar.cc/150?u=david', role: 'Backend Dev' }
      ],
      description: 'Frontend and Backend Development',
      color: 'from-blue-500 to-purple-600'
    }
  ]);

  const [isAddTeamOpen, setIsAddTeamOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isTeamDetailsOpen, setIsTeamDetailsOpen] = useState(false);
  const [newTeam, setNewTeam] = useState({
    name: '',
    description: '',
    icon: Users,
    color: teamColors[0],
    members: []
  });

  const [memberSearchQuery, setMemberSearchQuery] = useState('');
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  const handleCreateTeam = () => {
    if (newTeam.name) {
      setTeams([...teams, {
        ...newTeam,
        id: Date.now().toString(),
        members: []
      }]);
      setIsAddTeamOpen(false);
      setNewTeam({
        name: '',
        description: '',
        icon: Users,
        color: teamColors[0],
        members: []
      });
    }
  };

  const handleDeleteTeam = (teamId: string) => {
    setTeams(teams.filter(t => t.id !== teamId));
  };

  const handleAddMember = (teamId: string, memberId: string) => {
    const memberToAdd = availableMembers.find(m => m.id === memberId);
    if (!memberToAdd) return;

    setTeams(teams.map(team => {
      if (team.id === teamId) {
        // Check if member already exists in team
        if (team.members.some(m => m.id === memberId)) {
          return team;
        }
        return {
          ...team,
          members: [...team.members, memberToAdd]
        };
      }
      return team;
    }));
    setSelectedMemberId('');
  };

  const handleRemoveMember = (teamId: string, memberId: string) => {
    setTeams(teams.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          members: team.members.filter(m => m.id !== memberId)
        };
      }
      return team;
    }));
  };

  return (
    <div className="grid grid-cols-12 gap-4 w-full max-w-[1600px] mx-auto p-4">
      {/* Active Projects - 6 columns */}
      <div className="col-span-12 lg:col-span-6 xl:col-span-6">
        <StaticCard title="Active Projects">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Button
                as={Link}
                href="/projects"
                className="bg-default/40 backdrop-blur-md hover:bg-default/60"
                endContent={<ArrowUpRight size={16} />}
              >
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {projects?.slice(0, 2).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </StaticCard>
      </div>

      {/* Budget Overview - 3 columns */}
      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <StaticCard title="Budget Overview">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-default-500">Total Budget</p>
                <p className="text-2xl font-semibold">$78,000</p>
              </div>
              <div className="p-3 rounded-xl bg-success/10">
                <Wallet className="w-6 h-6 text-success" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Monthly Spending</span>
                <span className="text-success">+12.5%</span>
              </div>
              <Progress
                value={65}
                classNames={{
                  indicator: "bg-gradient-to-r from-pink-500 to-orange-600",
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-default/40 backdrop-blur-md">
                <p className="text-sm text-default-500">Spent</p>
                <p className="text-lg font-semibold">$50,700</p>
              </div>
              <div className="p-3 rounded-xl bg-default/40 backdrop-blur-md">
                <p className="text-sm text-default-500">Remaining</p>
                <p className="text-lg font-semibold text-success">$27,300</p>
              </div>
            </div>
          </div>
        </StaticCard>
      </div>

      {/* Team Overview - 3 columns */}
      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <StaticCard title="Team Overview">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Button
                className="bg-default/40 backdrop-blur-md hover:bg-default/60"
                startContent={<Plus size={16} />}
                onClick={() => setIsAddTeamOpen(true)}
              >
                Add Team
              </Button>
            </div>
            <div className="flex flex-col gap-4">
              {teams.slice(0, 3).map((team) => (
                <TeamCard
                  key={team.id}
                  team={team}
                  onDelete={() => handleDeleteTeam(team.id)}
                  onClick={() => {
                    setSelectedTeam(team);
                    setIsTeamDetailsOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        </StaticCard>
      </div>

      {/* Recent Activity - 6 columns */}
      <div className="col-span-12 lg:col-span-6">
        <StaticCard title="Recent Activity">
          <div className="grid grid-cols-2 gap-4">
            {projects?.[0].recentActivity?.slice(0, 4).map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-default/40 backdrop-blur-md">
                <div className={`p-2 rounded-lg ${getActivityIconClass(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div>
                  <p className="font-medium">{activity.description}</p>
                  <p className="text-sm text-default-500">
                    {formatTimeAgo(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </StaticCard>
      </div>

      {/* Available Talent - 6 columns */}
      <div className="col-span-12 md:col-span-6 lg:col-span-6">
        <StaticCard title="Available Talent">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Button
                as={Link}
                href="/talent"
                className="bg-default/40 backdrop-blur-md hover:bg-default/60"
                endContent={<ArrowUpRight size={16} />}
              >
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {projects?.[0].team?.slice(0, 3).map((talent) => (
                <div key={talent.id} className="flex items-center gap-3 p-3 rounded-xl bg-default/40 backdrop-blur-md">
                  <Avatar src={talent.avatar} name={talent.name} />
                  <div className="flex-grow">
                    <p className="font-medium">{talent.name}</p>
                    <p className="text-sm text-default-500">{talent.role}</p>
                  </div>
                  <Chip size="sm" className="bg-primary/10 text-primary">
                    Available
                  </Chip>
                </div>
              ))}
            </div>
          </div>
        </StaticCard>
      </div>

      {/* Add Team Modal */}
      <Modal 
        isOpen={isAddTeamOpen} 
        onClose={() => setIsAddTeamOpen(false)}
        size="2xl"
      >
        <ModalContent>
          <ModalHeader>Create New Team</ModalHeader>
          <ModalBody>
            <div className="space-y-6">
              <Input
                label="Team Name"
                placeholder="Enter team name"
                value={newTeam.name}
                onChange={(e) => setNewTeam(prev => ({ ...prev, name: e.target.value }))}
              />
              <Textarea
                label="Description"
                placeholder="Enter team description"
                value={newTeam.description}
                onChange={(e) => setNewTeam(prev => ({ ...prev, description: e.target.value }))}
              />
              <div>
                <p className="text-sm mb-2">Select Team Icon</p>
                <div className="flex flex-wrap gap-2">
                  {teamIcons.map(({ icon: Icon, label }) => (
                    <Button
                      key={label}
                      isIconOnly
                      className={`bg-default/40 ${newTeam.icon === Icon ? "bg-primary text-white" : ""}`}
                      onClick={() => setNewTeam(prev => ({ ...prev, icon: Icon }))}
                    >
                      <Icon size={18} />
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm mb-2">Select Team Color</p>
                <div className="flex flex-wrap gap-2">
                  {teamColors.map((color) => (
                    <Button
                      key={color}
                      isIconOnly
                      className={`bg-gradient-to-r ${color} ${
                        newTeam.color === color ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setNewTeam(prev => ({ ...prev, color }))}
                    />
                  ))}
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={() => setIsAddTeamOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleCreateTeam}>
              Create Team
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Team Details Modal */}
      <Modal 
        isOpen={isTeamDetailsOpen} 
        onClose={() => setIsTeamDetailsOpen(false)}
        size="2xl"
      >
        <ModalContent>
          {selectedTeam && (
            <>
              <ModalHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${selectedTeam.color}`}>
                    <selectedTeam.icon className="w-5 h-5 text-white" />
                  </div>
                  <span>{selectedTeam.name}</span>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Description</h4>
                    <p className="text-default-500">{selectedTeam.description}</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-sm font-medium">Team Members</h4>
                      <Button
                        size="sm"
                        color="primary"
                        variant="flat"
                        startContent={<UserPlus size={16} />}
                        onClick={() => setIsAddMemberOpen(true)}
                      >
                        Add Member
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {selectedTeam.members.map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-3 rounded-xl bg-default/40">
                          <div className="flex items-center gap-3">
                            <Avatar src={member.avatar} name={member.name} />
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-default-500">{member.role}</p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            color="danger"
                            variant="light"
                            isIconOnly
                            onClick={() => handleRemoveMember(selectedTeam.id, member.id)}
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Add Member Modal */}
      <Modal 
        isOpen={isAddMemberOpen} 
        onClose={() => setIsAddMemberOpen(false)}
        size="md"
      >
        <ModalContent>
          <ModalHeader>Add Team Member</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                placeholder="Search members..."
                startContent={<Search size={16} />}
                value={memberSearchQuery}
                onChange={(e) => setMemberSearchQuery(e.target.value)}
              />
              <div className="space-y-2">
                {availableMembers
                  .filter(member => 
                    member.name.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
                    member.role.toLowerCase().includes(memberSearchQuery.toLowerCase())
                  )
                  .map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-default/40 hover:bg-default/60 cursor-pointer"
                      onClick={() => {
                        if (selectedTeam) {
                          handleAddMember(selectedTeam.id, member.id);
                          setIsAddMemberOpen(false);
                        }
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar src={member.avatar} name={member.name} />
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-default-500">{member.role}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {member.skills.slice(0, 2).map((skill) => (
                          <Chip key={skill} size="sm" variant="flat">
                            {skill}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

// New StaticCard component to replace SortableItem
const StaticCard = ({ title, children }) => {
  return (
    <div className="bg-background/60 shadow-none rounded-[2.5rem] border-medium border-default 
      bg-gradient-to-br from-background to-muted/50 overflow-hidden 
      hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-300 h-full">
      <div className="relative w-full h-full">
        {/* Control Buttons - Hide on mobile */}
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-10 hidden sm:flex gap-2">
          <button className="p-2 rounded-xl bg-default/40 backdrop-blur-md hover:bg-default/60 transition-all duration-300">
            <Pencil size={20} className="text-default-500" />
          </button>
          <button className="p-2 rounded-xl bg-default/40 backdrop-blur-md hover:bg-default/60 transition-all duration-300">
            <Copy size={20} className="text-default-500" />
          </button>
          <button className="p-2 rounded-xl bg-default/40 backdrop-blur-md hover:bg-default/60 transition-all duration-300">
            <Trash size={20} className="text-default-500" />
          </button>
        </div>

        {/* Content */}
        <div className="h-full flex flex-col">
          {title && (
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
            </div>
          )}
          <div className="p-4 sm:p-6 flex-grow">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions
const getActivityIconClass = (type) => {
  const classes = {
    milestone: "bg-primary/10 text-primary",
    payment: "bg-success/10 text-success",
    message: "bg-warning/10 text-warning"
  };
  return classes[type] || "bg-default/10 text-default-500";
};

const getActivityIcon = (type) => {
  const icons = {
    milestone: <Clock className="w-4 h-4" />,
    payment: <Wallet className="w-4 h-4" />,
    message: <MessageSquare className="w-4 h-4" />
  };
  return icons[type];
};
const getDaysLeft = (endDate: string): number => {
  const days = Math.ceil((new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 0;
};

const getDaysLeftChipClass = (endDate: string): string => {
  const days = getDaysLeft(endDate);
  if (days <= 3) return "bg-danger/10 text-danger";
  if (days <= 7) return "bg-warning/10 text-warning";
  return "bg-success/10 text-success";
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const formatTimeAgo = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  
  if (hours < 24) {
    return `${hours}h ago`;
  }
  return formatDate(timestamp);
};

// TeamCard Component
const TeamCard = ({ team, onDelete, onClick }) => {
  const TeamIcon = team.icon;
  
  return (
    <div className="relative group cursor-pointer" onClick={onClick}>
      <div className="p-4 rounded-xl bg-default/40 backdrop-blur-md hover:bg-default/60 transition-all duration-300">
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${team.color}`}>
            <TeamIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-medium">{team.name}</p>
            <p className="text-sm text-default-500 line-clamp-1">{team.description}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <AvatarGroup max={3} size="sm">
            {team.members.map((member) => (
              <Avatar key={member.id} src={member.avatar} name={member.name} />
            ))}
          </AvatarGroup>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-danger/10 hover:bg-danger/20"
          >
            <X size={14} className="text-danger" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;