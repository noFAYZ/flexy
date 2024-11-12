"use client";
import React, { useState } from "react";
import {
  Card,
  Button,
  Avatar,
  Chip,
  AvatarGroup,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  Select,
  SelectItem,
} from "@nextui-org/react";
import {
  Search,
  Plus,
  Briefcase,
  Users,
  MoreVertical,
  ChevronRight,
  Code2,
  Network,
  Paintbrush,
  Shield,
  X,
  ChevronLeft,
  Puzzle,
  Rocket,
  Target,
  Check,
  Brain,
  Filter,
  Star,
  DollarSign,
} from "lucide-react";
import { motion } from "framer-motion";
import { FreelancerProfile } from "../../types";


interface TalentTabProps {
  freelancers: FreelancerProfile[];
}

export const TalentTab = ({ freelancers }: TalentTabProps) => {
  const [activeTeam, setActiveTeam] = useState(null);
  const [addMemberSearch, setAddMemberSearch] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isAddTeamOpen, setIsAddTeamOpen] = useState(false);
  const [isAddMembersOpen, setIsAddMembersOpen] = useState(false);
  const [newTeam, setNewTeam] = useState({
    name: '',
    description: '',
    icon: Users,
    color: 'from-pink-500 to-orange-600',
    members: []
  });

  const [teams, setTeams] = useState([
    {
      id: 'design',
      name: 'Design Team',
      icon: Paintbrush,
      members: [],
      description: 'UI/UX and Visual Design Team',
      color: 'from-pink-500 to-orange-600'
    },
    {
      id: 'development',
      name: 'Development Team',
      icon: Code2,
      members: [],
      description: 'Frontend and Backend Development',
      color: 'from-blue-500 to-purple-600'
    }
  ]);

  const teamIcons = [
    { icon: Code2, label: 'Development' },
    { icon: Paintbrush, label: 'Design' },
    { icon: Network, label: 'Network' },
    { icon: Shield, label: 'Security' },
    { icon: Users, label: 'Team' },
    { icon: Brain, label: 'AI' },
    { icon: Rocket, label: 'Launch' },
    { icon: Target, label: 'Goals' },
    { icon: Briefcase, label: 'Business' },
    { icon: Puzzle, label: 'Strategy' }
  ];

  const getFilteredAvailableMembers = (teamId) => {
    const team = teams.find(t => t.id === teamId);
    if (!team) return [];
    
    return freelancers.filter(freelancer => 
      !team.members.includes(freelancer.id) &&
      (freelancer.name.toLowerCase().includes(addMemberSearch.toLowerCase()) ||
       freelancer.role.toLowerCase().includes(addMemberSearch.toLowerCase()) ||
       freelancer.skills.some(skill => 
         skill.toLowerCase().includes(addMemberSearch.toLowerCase())
       ))
    );
  };

  const handleCreateTeam = () => {
    if (!newTeam.name) return;
    
    const teamId = newTeam.name.toLowerCase().replace(/\s+/g, '-');
    const team = {
      ...newTeam,
      id: teamId,
      members: []
    };
    
    setTeams(prev => [...prev, team]);
    setNewTeam({
      name: '',
      description: '',
      icon: Users,
      color: 'from-pink-500 to-orange-600',
      members: []
    });
    setIsAddTeamOpen(false);
  };

  const addMemberToTeam = (teamId, memberId) => {
    setTeams(prev => prev.map(team => {
      if (team.id === teamId && !team.members.includes(memberId)) {
        return { ...team, members: [...team.members, memberId] };
      }
      return team;
    }));
  };

  const removeMemberFromTeam = (teamId, memberId) => {
    setTeams(prev => prev.map(team => {
      if (team.id === teamId) {
        return { ...team, members: team.members.filter(id => id !== memberId) };
      }
      return team;
    }));
  };

  const removeTeam = (teamId) => {
    setTeams(prev => prev.filter(team => team.id !== teamId));
  };

  const TeamCard = ({ team }) => {
    const teamMembers = team.members.map(id => 
      freelancers.find(f => f.id === id)
    ).filter(Boolean);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.13 }}
        whileHover={{ y: -4 }}
        className="w-full"
      >
        <Card 
          isPressable
          className="h-[360px] bg-default/40 backdrop-blur-sm border border-default-200 
          hover:border-orange-500/50 transition-all duration-300 rounded-[2.5rem] group 
          hover:shadow-lg hover:shadow-pink-500/10 overflow-hidden"
          onClick={() => setActiveTeam(team.id)}
        >
          {/* Background Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-transparent opacity-90" />

          {/* Content Container */}
          <div className="relative h-full p-6 flex flex-col">
            {/* Top Section */}
            <div className="flex items-start justify-between mb-4">
              <div className={`p-4 rounded-2xl bg-gradient-to-r ${team.color} shadow-lg`}>
                <team.icon size={24} className="text-white" />
              </div>
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    isIconOnly
                    variant="light" 
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <MoreVertical size={18} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>Edit Team</DropdownItem>
                  <DropdownItem>Manage Members</DropdownItem>
                  <DropdownItem 
                    className="text-danger" 
                    onClick={(e) => removeTeam(team.id)}
                  >
                    Delete Team
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>

            {/* Team Info */}
            <div className="flex-1">
              <div className="mb-4">
                <h4 className="text-xl font-semibold mb-2 line-clamp-1">{team.name}</h4>
                <p className="text-default-500 text-sm line-clamp-2">{team.description}</p>
              </div>

              {/* Team Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-default/40 rounded-2xl p-4 backdrop-blur-sm border border-default-200">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-default-500" />
                    <span className="text-xs text-default-500">Members</span>
                  </div>
                  <span className="text-2xl font-semibold mt-1 block">{teamMembers.length}</span>
                </div>
                <div className="bg-default/40 rounded-2xl p-4 backdrop-blur-sm border border-default-200">
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} className="text-default-500" />
                    <span className="text-xs text-default-500">Projects</span>
                  </div>
                  <span className="text-2xl font-semibold mt-1 block">0</span>
                </div>
              </div>

              {/* Team Members */}
              <div className="mb-4">
                {teamMembers.length > 0 ? (
                  <div className="flex items-center justify-between">
                    <AvatarGroup 
                      max={4} 
                      size="sm"
                      className="hover:scale-105 transition-transform"
                      renderCount={(count) => (
                        <div className="flex items-center gap-1 text-default-500 bg-default/40 px-2 py-1 rounded-full">
                          <span className="text-xs">+{count} more</span>
                        </div>
                      )}
                    >
                      {teamMembers.map(member => (
                        <Avatar 
                          key={member.id} 
                          src={member.avatar} 
                          name={member.name}
                          className="ring-2 ring-background"
                        />
                      ))}
                    </AvatarGroup>
                    <Chip
                      size="sm"
                      variant="flat"
                      className="bg-success/10 text-success border-success/20"
                      startContent={<div className="w-1 h-1 rounded-full bg-success" />}
                    >
                      Active
                    </Chip>
                  </div>
                ) : (
                  <div className="flex items-center justify-center p-3 rounded-xl bg-default/20 border border-dashed border-default-300">
                    <p className="text-sm text-default-500">No members yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* View Details Button */}
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-pink-500 to-orange-600 text-white rounded-xl 
              opacity-0 group-hover:opacity-100 transition-all duration-300"
              endContent={<ChevronRight className="w-4 h-4" />}
            >
              View Team Details
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {!activeTeam ? (
        <>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-semibold bg-orange-500 bg-clip-text text-transparent">
                Teams
              </h3>
              <p className="text-default-500 text-sm">Manage your project teams</p>
            </div>
            <Button
              className="bg-gradient-to-r from-pink-500 to-orange-600 text-white rounded-2xl"
              startContent={<Plus size={18} />}
              onClick={() => setIsAddTeamOpen(true)}
            >
              Create Team
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6 auto-rows-fr">
            {teams.map(team => (
              <TeamCard key={team.id} team={team} />
            ))}
            
            {/* Add Team Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.13 }}
              whileHover={{ y: -4 }}
              className="w-full"
            >
              <Card 
                isPressable
                className="h-[360px] bg-default/20 border border-dashed border-default-200 
                hover:border-orange-500/50 transition-all duration-300 rounded-[2.5rem] group
                hover:shadow-lg hover:shadow-orange-500/10"
                onClick={() => setIsAddTeamOpen(true)}
              >
                <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                  <div className="mb-4 p-4 rounded-full bg-gradient-to-r from-pink-500/10 to-orange-500/10">
                    <Plus size={24} className="text-orange-500" />
                  </div>
                  <p className="text-xl font-semibold bg-orange-600 bg-clip-text text-transparent">
                    Create New Team
                  </p>
                  <p className="text-default-500 text-sm mt-2">Add a new team to your workspace</p>
                </div>
              </Card>
            </motion.div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-4 mb-6">
            <Button
              isIconOnly
              variant="light"
              className="rounded-full"
              onClick={() => setActiveTeam(null)}
            >
              <ChevronLeft size={20} />
            </Button>
            <div>
              <h3 className="text-xl font-semibold">
                {teams.find(t => t.id === activeTeam)?.name}
              </h3>
              <p className="text-default-500 text-sm">
                {teams.find(t => t.id === activeTeam)?.description}
              </p>
            </div>
          </div>
  
          <Card className="p-6 rounded-[2.5rem] bg-default/40">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-medium">Team Members</h4>
              <Button
                className="bg-gradient-to-r from-pink-500 to-orange-600 text-white rounded-2xl"
                startContent={<Plus size={18} />}
                onClick={() => setIsAddMembersOpen(true)}
              >
                Add Members
              </Button>
            </div>
  
            <div className="space-y-4">
              {teams
                .find(t => t.id === activeTeam)
                ?.members.map(memberId => {
                  const member = freelancers.find(f => f.id === memberId);
                  if (!member) return null;
  
                  return (
                    <Card 
                      key={member.id} 
                      className="p-4 bg-default/20 rounded-2xl"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar src={member.avatar} size="lg" />
                        <div className="flex-1">
                          <h5 className="font-medium">{member.name}</h5>
                          <p className="text-sm text-default-500">{member.role}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {member.skills.map(skill => (
                              <Chip 
                                key={skill} 
                                size="sm" 
                                variant="flat"
                              >
                                {skill}
                              </Chip>
                            ))}
                          </div>
                        </div>
                        <Button
                          isIconOnly
                          variant="light"
                          className="text-danger"
                          onClick={() => removeMemberFromTeam(activeTeam, member.id)}
                        >
                          <X size={18} />
                        </Button>
                      </div>
                    </Card>
                  );
                })}
            </div>
          </Card>
        </>
      )}
  
      <Modal 
        isOpen={isAddTeamOpen} 
        onClose={() => {
          setIsAddTeamOpen(false);
          setNewTeam({
            name: '',
            description: '',
            icon: Users,
            color: 'from-pink-500 to-orange-600',
            members: []
          });
        }}
      >
        <ModalContent>
          <ModalHeader>Create New Team</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
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
                <label className="text-sm mb-2 block">Select Team Icon</label>
                <div className="flex gap-2 flex-wrap">
                  {teamIcons.map(({ icon: Icon, label }) => (
                    <Button
                      key={label}
                      isIconOnly
                      variant={newTeam.icon === Icon ? "solid" : "flat"}
                      className={`bg-default/40 ${
                        newTeam.icon === Icon ? "bg-primary" : ""
                      }`}
                      onClick={() => setNewTeam(prev => ({ ...prev, icon: Icon }))}
                    >
                      <Icon size={18} />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button 
              variant="flat" 
              onPress={() => {
                setIsAddTeamOpen(false);
                setNewTeam({
                  name: '',
                  description: '',
                  icon: Users,
                  color: 'from-pink-500 to-orange-600',
                  members: []
                });
              }}
            >
              Cancel
            </Button>
            <Button 
              className="bg-gradient-to-r from-pink-500 to-orange-600 text-white"
              onPress={handleCreateTeam}
              isDisabled={!newTeam.name.trim()}
            >
              Create Team
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  
      <Modal 
        isOpen={isAddMembersOpen} 
        onClose={() => {
          setIsAddMembersOpen(false);
          setAddMemberSearch('');
          setSelectedMembers([]);
        }}
        size="2xl"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">Add Team Members</h3>
            <p className="text-sm text-default-500">
              Add members to {teams.find(t => t.id === activeTeam)?.name}
            </p>
          </ModalHeader>
          <ModalBody>
            <Input
              placeholder="Search by name, role, or skills..."
              startContent={<Search size={18} />}
              value={addMemberSearch}
              onChange={(e) => setAddMemberSearch(e.target.value)}
              className="mb-4"
              isClearable
              onClear={() => setAddMemberSearch('')}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {getFilteredAvailableMembers(activeTeam).map(member => (
                <Card 
                  key={member.id}
                  isPressable
                  className={`p-4 transition-colors ${
                    selectedMembers.includes(member.id)
                      ? 'bg-primary/20'
                      : 'bg-default/40'
                  }`}
                  onClick={() => {
                    setSelectedMembers(prev => 
                      prev.includes(member.id)
                        ? prev.filter(id => id !== member.id)
                        : [...prev, member.id]
                    );
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar 
                        src={member.avatar} 
                        size="sm"
                        className={selectedMembers.includes(member.id)
                          ? 'ring-2 ring-primary ring-offset-2'
                          : ''
                        }
                      />
                      {selectedMembers.includes(member.id) && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                          <Check size={12} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{member.name}</p>
                      <p className="text-sm text-default-500 truncate">{member.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {member.skills.slice(0, 3).map(skill => (
                      <Chip 
                        key={skill} 
                        size="sm" 
                        variant="flat"
                        className="text-xs"
                      >
                        {skill}
                      </Chip>
                    ))}
                    {member.skills.length > 3 && (
                      <Chip 
                        size="sm" 
                        variant="flat"
                        className="text-xs"
                      >
                        +{member.skills.length - 3} more
                      </Chip>
                    )}
                  </div>
                </Card>
              ))}
              
              {getFilteredAvailableMembers(activeTeam).length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
                  <Users size={24} className="text-default-500 mb-2" />
                  <p className="text-default-500">
                    {addMemberSearch
                      ? 'No members found matching your search'
                      : 'No available members to add'
                    }
                  </p>
                </div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button 
              variant="light" 
              onPress={() => {
                setIsAddMembersOpen(false);
                setAddMemberSearch('');
                setSelectedMembers([]);
              }}
            >
              Cancel
            </Button>
            <Button 
              className="bg-gradient-to-r from-pink-500 to-orange-600 text-white"
              isDisabled={selectedMembers.length === 0}
              onPress={() => {
                selectedMembers.forEach(memberId => {
                  addMemberToTeam(activeTeam, memberId);
                });
                setSelectedMembers([]);
                setAddMemberSearch('');
                setIsAddMembersOpen(false);
              }}
            >
              Add Selected ({selectedMembers.length})
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};