import { Button } from "@nextui-org/button";
import { Avatar, Dropdown, DropdownTrigger, DropdownItem, Badge } from "@nextui-org/react";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";

import { UserPlus, MoreVertical } from "lucide-react";

interface Member {
    id: string;
    name: string;
    avatar: string;
    role?: string;
    status: 'online' | 'offline' | 'away';
    lastSeen?: Date;
  }
  
  interface MembersListProps {
    members: Member[];
  }

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diff / 60000);
    const diffHours = Math.floor(diff / 3600000);
    const diffDays = Math.floor(diff / 86400000);

    if (diffMinutes < 1) {
      return 'Just now';
    } else if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };
  
  export const MembersList: React.FC<MembersListProps> = ({ members }) => {
    const getStatusColor = (status: string) => {
      const colors = {
        online: 'success',
        offline: 'default',
        away: 'warning'
      };
      return colors[status] || 'default';
    };
  
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold">Members</h4>
          <Button
            size="sm"
            variant="light"
            startContent={<UserPlus className="w-4 h-4" />}
          >
            Add
          </Button>
        </div>
        
        <div className="space-y-2">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-default-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Badge
                  content=""
                  color={getStatusColor(member.status)}
                  placement="bottom-right"
                >
                  <Avatar src={member.avatar} size="sm" />
                </Badge>
                <div>
                  <p className="text-sm font-medium">
                    {member.name}
                  </p>
                  <p className="text-xs text-default-500">
                    {member.role || (
                      member.status === 'offline' && member.lastSeen
                        ? `Last seen ${formatTime(new Date(member.lastSeen))}`
                        : member.status
                    )}
                  </p>
                </div>
              </div>
              
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>View Profile</DropdownItem>
                  <DropdownItem>Message</DropdownItem>
                  <DropdownItem
                    className="text-danger"
                    color="danger"
                  >
                    Remove from Group
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          ))}
        </div>
      </div>
    );
  };
  