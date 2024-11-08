import React from 'react';
import { 
  NavbarItem, 
  Badge, 
  Popover, 
  PopoverTrigger, 
  PopoverContent,
  Button,
  Avatar,
  Chip
} from '@nextui-org/react';
import { 
  BellDotIcon, 
  MessageSquare,
  Clock,
  Briefcase,
  FileText,
  Calendar,
  CheckCheck
} from 'lucide-react';
import { AntDesignMessageTwotone, MdiBellBadge } from '../icons/icons';

const NotificationWidget = ({ authenticated = true }) => {
  const [selectedTab, setSelectedTab] = React.useState("notifications");
  const [isOpen, setIsOpen] = React.useState(false);

  const notifications = {
    alerts: 3,
    messages: 2
  };

  const notificationItems = [
    {
      id: 1,
      title: "New Project Invite",
      description: "Sarah invited you to join Design Team",
      time: "2 min ago",
      isNew: true,
      type: "project",
      icon: Briefcase
    },
    {
      id: 2,
      title: "Meeting Scheduled",
      description: "Team standup in 30 minutes",
      time: "15 min ago",
      isNew: true,
      type: "meeting",
      icon: Calendar
    },
    {
      id: 3,
      title: "Document Shared",
      description: "Jessica shared 'Q4 Planning' with you",
      time: "2 hours ago",
      isNew: false,
      type: "document",
      icon: FileText
    }
  ];

  const messageItems = [
    {
      id: 1,
      user: {
        name: "Alex Morgan",
        avatar: "/images/150.jfif",
        online: true
      },
      message: "Hey, can you review the latest designs?",
      time: "Just now",
      isNew: true
    },
    {
      id: 2,
      user: {
        name: "Sarah Wilson",
        avatar: "/images/150.jfif",
        online: true
      },
      message: "The client approved the proposal!",
      time: "5 min ago",
      isNew: true
    }
  ];

  return (
    <Popover 
      showArrow 
      placement="bottom-end" 
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      offset={12}
      classNames={{
        base: "before:bg-default-200",
        content: "p-0 border-small border-default-200 bg-background/95 backdrop-blur-md dark:bg-default-100/50"
      }}
    >
      <PopoverTrigger>
        <NavbarItem>
          <Badge 
            content={notifications.alerts + notifications.messages} 
            color="danger" 
            shape="circle" 
            placement="top-right"
            size="lg"
          >
            <div className="bg-gradient-to-r from-pink-500 to-orange-600 rounded-full opacity-100 hover:opacity-90 w-14 h-14 flex items-center justify-center relative overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
              <AntDesignMessageTwotone height={20} className="text-white relative z-10" />
            </div>
          </Badge>
        </NavbarItem>
      </PopoverTrigger>

      <PopoverContent className="w-[340px] p-0">
        {/* Minimal Tab Navigation */}
        <div className="flex items-center gap-6 px-4 py-3 border-b">
          <button
            onClick={() => setSelectedTab("notifications")}
            className="relative group"
          >
            <div className="flex items-center gap-2">
              <span className={`text-sm transition-colors ${
                selectedTab === "notifications" 
                  ? "text-orange-500 font-medium" 
                  : "text-default-500"
              }`}>
                Notifications
              </span>
              {notifications.alerts > 0 && (
                <Badge
                  size="sm"
                  className={`${
                    selectedTab === "notifications"
                      ? "bg-violet-100 text-orange-500"
                      : "bg-default-100 text-default-500"
                  }`}
                >
                  {notifications.alerts}
                </Badge>
              )}
            </div>
            {selectedTab === "notifications" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-orange-600 rounded-full -mb-3" />
            )}
          </button>

          <button
            onClick={() => setSelectedTab("messages")}
            className="relative group"
          >
            <div className="flex items-center gap-2">
              <span className={`text-sm transition-colors ${
                selectedTab === "messages" 
                  ? "text-orange-500 font-medium" 
                  : "text-default-500"
              }`}>
                Messages
              </span>
              {notifications.messages > 0 && (
                <Badge
                  size="sm"
                  className={`${
                    selectedTab === "messages"
                      ? "bg-fuchsia-100 text-orange-500"
                      : "bg-default-100 text-default-500"
                  }`}
                >
                  {notifications.messages}
                </Badge>
              )}
            </div>
            {selectedTab === "messages" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-orange-600 rounded-full -mb-3" />
            )}
          </button>
        </div>

        <div className="p-3">
          {/* Quick Actions Row */}
          <div className="flex gap-2 mb-2">
            <Button
              size="sm"
              variant="flat"
              className="w-full h-8 text-xs"
              startContent={<CheckCheck className="h-3.5 w-3.5" />}
            >
              Mark all read
            </Button>
          </div>

          {/* Dynamic Content */}
          <div className="max-h-[380px] overflow-y-auto">
            {selectedTab === "notifications" ? (
              <div className="space-y-1">
                {notificationItems.map((item) => (
                  <div 
                    key={item.id}
                    className="p-3 rounded-2xl hover:bg-default-100 transition-colors cursor-pointer relative group"
                  >
                    <div className="flex gap-3">
                      <div className={`h-9 w-9 rounded-lg bg-gradient-to-r from-pink-500 to-orange-600 flex items-center text-bold justify-center flex-shrink-0 ${
                        item.isNew ? "text-white-500" : "text-gray-400"
                      }`}>
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{item.title}</p>
                          {item.isNew && (
                            <Chip size="sm" className="h-4 px-1 text-[10px] bg-orange-600 text-gray-200">
                              New
                            </Chip>
                          )}
                        </div>
                        <p className="text-xs text-default-500 mt-0.5 line-clamp-1">
                          {item.description}
                        </p>
                        <span className="text-[10px] text-default-400 mt-1 block">
                          {item.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                {messageItems.map((item) => (
                  <div 
                    key={item.id}
                    className="p-3 rounded-2xl hover:rounded-2xl hover:bg-default-100 transition-colors cursor-pointer relative group"
                  >
                    <div className="flex gap-3">
                      <div className="relative">
                        <Avatar
                          src={item.user.avatar}
                          className="h-9 w-9"
                        />
                        {item.user.online && (
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success-500 rounded-full ring-2 ring-background" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{item.user.name}</p>
                          {item.isNew && (
                            <Chip size="sm" className="h-4 px-1 text-[10px] bg-orange-600 text-gray-200">
                              New
                            </Chip>
                          )}
                        </div>
                        <p className="text-xs text-default-500 mt-0.5 line-clamp-1">
                          {item.message}
                        </p>
                        <span className="text-[10px] text-default-400 mt-1 block">
                          {item.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-2 border-t">
          <Button
            size="sm"
            className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-orange-600 text-white"
          >
            View All
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationWidget;