import React, { useState, useMemo } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Avatar,
  Chip,
  Tab,
  Tabs,
  Checkbox,
  Progress,
  useDisclosure
} from "@nextui-org/react";
import {
  Search,
  Users,
  Briefcase,
  Plus,
  Hash,
  Lock,
  Globe,
  MessageSquare
} from "lucide-react";

interface NewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: string;
}

export const NewChatModal: React.FC<NewChatModalProps> = ({
  isOpen,
  onClose,
  theme
}) => {
  const [selectedTab, setSelectedTab] = useState("direct");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [groupName, setGroupName] = useState("");
  const [groupType, setGroupType] = useState<"public" | "private">("private");
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    description: "",
    deadline: "",
    members: [] as string[]
  });

  // Demo data
  const users = [
    { id: "1", name: "Alice Johnson", role: "Designer", avatar: "/api/placeholder/40/40", status: "online" },
    { id: "2", name: "Bob Smith", role: "Developer", avatar: "/api/placeholder/40/40", status: "offline" },
    // Add more users
  ];

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  const handleUserSelect = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleCreate = () => {
    switch (selectedTab) {
      case "direct":
        // Handle direct message creation
        break;
      case "group":
        // Handle group creation
        break;
      case "project":
        // Handle project chat creation
        break;
    }
    onClose();
  };

  const tabStyles = {
    base: "transition-all duration-200 flex items-center gap-2 p-3 rounded-lg",
    selected: `bg-gradient-to-r ${theme} text-white shadow-lg transform scale-105`,
    default: "hover:bg-default-100"
  };

  const renderUserCard = (user: typeof users[0], isSelected: boolean) => (
    <div
      className={`
        group transition-all duration-200 
        flex items-center justify-between p-3 rounded-xl
        ${isSelected 
          ? `bg-gradient-to-r ${theme} text-white shadow-md transform scale-102` 
          : 'hover:bg-default-100'
        }
      `}
      onClick={() => handleUserSelect(user.id)}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar
            src={user.avatar}
            className={`w-10 h-10 transition-transform ${isSelected ? 'ring-2 ring-white' : ''}`}
          />
          <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
            ${user.status === 'online' ? 'bg-success' : 'bg-default-300'}`}
          />
        </div>
        <div>
          <p className={`font-medium ${isSelected ? 'text-white' : ''}`}>{user.name}</p>
          <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-default-500'}`}>
            {user.role}
          </p>
        </div>
      </div>
      <Checkbox
        isSelected={isSelected}
        className={`pointer-events-none ${isSelected ? 'text-white' : ''}`}
      />
    </div>
  );

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="2xl"
      classNames={{
        base: "bg-background/80 backdrop-blur-md",
        header: "border-b border-default-200",
        body: "py-6",
        footer: "border-t border-default-200"
      }}
    >
      <ModalContent>
        <ModalHeader>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${theme}`}>
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold">Start a New Conversation</span>
          </div>
        </ModalHeader>

        <ModalBody>
          <Tabs 
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as string)}
            classNames={{
              tabList: "gap-4 p-2",
              cursor: `bg-gradient-to-r ${theme}`,
              tab: "max-w-fit px-4 h-10"
            }}
          >
            <Tab
              key="direct"
              title={
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span className="font-medium">Direct Message</span>
                </div>
              }
            >
              <Input
                placeholder="Search users..."
                startContent={<Search className="w-4 h-4 text-default-400" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4"
                classNames={{
                  input: "bg-transparent",
                  inputWrapper: "bg-default-100/50 hover:bg-default-200/50 transition-colors"
                }}
              />
              
              <div className="max-h-[400px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                {filteredUsers.map((user) => renderUserCard(user, selectedUsers.includes(user.id)))}
              </div>
            </Tab>

            <Tab
              key="group"
              title={
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Group Chat
                </div>
              }
            >
              <div className="space-y-4">
                <Input
                  label="Group Name"
                  placeholder="Enter group name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />

                <div className="flex gap-2">
                  <Button
                    variant={groupType === "private" ? "solid" : "bordered"}
                    onClick={() => setGroupType("private")}
                    startContent={<Lock className="w-4 h-4" />}
                  >
                    Private
                  </Button>
                  <Button
                    variant={groupType === "public" ? "solid" : "bordered"}
                    onClick={() => setGroupType("public")}
                    startContent={<Globe className="w-4 h-4" />}
                  >
                    Public
                  </Button>
                </div>

                <Input
                  placeholder="Search members..."
                  startContent={<Search className="w-4 h-4 text-default-400" />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                {selectedUsers.length > 0 && (
                  <div className="flex flex-wrap gap-2 my-2">
                    {selectedUsers.map((userId) => {
                      const user = users.find(u => u.id === userId);
                      return user ? (
                        <Chip
                          key={userId}
                          onClose={() => handleUserSelect(userId)}
                          variant="flat"
                        >
                          {user.name}
                        </Chip>
                      ) : null;
                    })}
                  </div>
                )}

                <div className="max-h-[200px] overflow-y-auto space-y-2">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-default-100"
                      onClick={() => handleUserSelect(user.id)}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar src={user.avatar} />
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-default-500">{user.role}</p>
                        </div>
                      </div>
                      <Checkbox
                        isSelected={selectedUsers.includes(user.id)}
                        className="pointer-events-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Tab>

            <Tab
              key="project"
              title={
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Project Chat
                </div>
              }
            >
              <div className="space-y-4">
                <Input
                  label="Project Name"
                  placeholder="Enter project name"
                  value={projectDetails.name}
                  onChange={(e) => setProjectDetails(prev => ({
                    ...prev,
                    name: e.target.value
                  }))}
                />

                <Input
                  label="Description"
                  placeholder="Enter project description"
                  value={projectDetails.description}
                  onChange={(e) => setProjectDetails(prev => ({
                    ...prev,
                    description: e.target.value
                  }))}
                />

                <Input
                  type="date"
                  label="Deadline"
                  value={projectDetails.deadline}
                  onChange={(e) => setProjectDetails(prev => ({
                    ...prev,
                    deadline: e.target.value
                  }))}
                />

                <div className="space-y-2">
                  <label className="text-sm font-medium">Team Members</label>
                  <Input
                    placeholder="Search team members..."
                    startContent={<Search className="w-4 h-4 text-default-400" />}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />

                  {selectedUsers.length > 0 && (
                    <div className="flex flex-wrap gap-2 my-2">
                      {selectedUsers.map((userId) => {
                        const user = users.find(u => u.id === userId);
                        return user ? (
                          <Chip
                            key={userId}
                            onClose={() => handleUserSelect(userId)}
                            variant="flat"
                          >
                            {user.name}
                          </Chip>
                        ) : null;
                      })}
                    </div>
                  )}

                  <div className="max-h-[200px] overflow-y-auto space-y-2">
                    {filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-default-100"
                        onClick={() => handleUserSelect(user.id)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar src={user.avatar} />
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-default-500">{user.role}</p>
                          </div>
                        </div>
                        <Checkbox
                          isSelected={selectedUsers.includes(user.id)}
                          className="pointer-events-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          <Button 
            variant="light" 
            onPress={onClose}
            className="font-medium"
          >
            Cancel
          </Button>
          <Button
            className={`bg-gradient-to-r ${theme} text-white font-medium
              shadow-lg hover:shadow-xl transition-shadow
              ${selectedUsers.length === 0 ? 'opacity-50' : ''}
            `}
            onPress={handleCreate}
            isDisabled={selectedUsers.length === 0}
            startContent={<Plus className="w-4 h-4" />}
          >
            Create {selectedTab === "direct" ? "Chat" : selectedTab === "group" ? "Group" : "Project"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};