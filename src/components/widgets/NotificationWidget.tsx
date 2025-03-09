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
  CheckCheck,
  LucideBellRing
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
        <motion.li  className=' outline-none border-none list-none	'  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Badge 
            content={notifications.alerts + notifications.messages} 
            color="danger" 
            shape="circle" 
            placement="top-right"
            size="lg"
          >
            <div className="bg-gradient-to-r from-pink-500 to-orange-600 rounded-full opacity-100 hover:opacity-90 w-14 h-14 flex items-center justify-center relative overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
              <LucideBellRing height={24} className="text-white relative z-10" />
            </div>
          </Badge>
       </motion.li>
      </PopoverTrigger>

    {/* PopoverContent */}
<PopoverContent className="w-[380px]   "
>
  {/* Header with Tabs */}
  <div className="py-4 w-full border-b border-border/5">
    <div className="flex justify-evenly items-center ">
      {["Notifications", "Messages"].map((tab) => (
        <button
          key={tab}
          onClick={() => setSelectedTab(tab.toLowerCase())}
          className="relative group px-2"
        >
          <div className="flex items-center gap-2">
            <span className={cn(
              "text-sm font-medium transition-colors duration-200",
              selectedTab === tab.toLowerCase() 
                ? "text-orange-600" 
                : "text-muted-foreground hover:text-foreground"
            )}>
              {tab}
              {(tab === "Notifications" ? notifications.alerts : notifications.messages) > 0 && (
                <span className={cn(
                  "ml-1.5 px-1.5 py-0.5 text-[10px] rounded-full",
                  selectedTab === tab.toLowerCase()
                    ? "bg-orange-600 text-white"
                    : "bg-orange-600 text-white"
                )}>
                  {tab === "Notifications" ? notifications.alerts : notifications.messages}
                </span>
              )}
            </span>
          </div>
          
          {/* Active Indicator */}
          <div className={cn(
            "absolute -bottom-4 left-0 right-0 h-0.5",
            "transform scale-x-0 group-hover:scale-x-100",
            "transition-transform duration-200",
            selectedTab === tab.toLowerCase() && "scale-x-100",
            "bg-gradient-to-r from-orange-500 to-pink-500"
          )} />
        </button>
      ))}
    </div>
  </div>

  {/* Quick Actions */}
  <div className="px-2 pt-2">
    <Button
      size="sm"
      variant="ghost"
      className={cn(
        "w-full h-9 text-xs gap-2",
        "text-muted-foreground hover:text-foreground",
        "hover:bg-accent/50 rounded-2xl",
        ""
      )}
    >
      <CheckCheck className="h-3.5 w-3.5" />
      Mark all as read
    </Button>
  </div>

  {/* Notification List */}
  <div className="max-h-[450px] overflow-y-auto w-full  py-2 space-y-1">
    <AnimatePresence mode="popLayout">
      {(selectedTab === "notifications" ? notificationItems : messageItems).map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
          className={cn(
            "p-3 ",
            "group relative",
            "transition-all duration-200",
            "hover:bg-muted-foreground/20",
            "cursor-pointer"
          )}
        >
          <div className="flex gap-3">
            {selectedTab === "notifications" ? (
              // Notification Icon
              <div className={cn(
                "h-10 w-10 ",
                "bg-gradient-to-r from-orange-500 to-pink-500",
                "flex items-center justify-center",
                "group-hover:from-orange-600 group-hover:to-pink-600",
                "transition-colors duration-100 rounded-2xl"
              )}>
                <item.icon className="h-4 w-4 text-white" />
              </div>
            ) : (
              // Message Avatar
              <div className="relative">
                <Avatar
                  src={item.user.avatar}
                  className="h-10 w-10 rounded-2xl"
                />
                {item.user.online && (
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-background" />
                )}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <p className="text-sm font-medium text-foreground">
                  {selectedTab === "notifications" ? item.title : item.user.name}
                </p>
                {item.isNew && (
                  <span className={cn(
                    "px-1.5  text-[10px] rounded-full",
                    "bg-gradient-to-r from-orange-500 to-pink-500 text-white",
                    "font-medium"
                  )}>
                    New
                  </span>
                )}
              </div>
              
              <p className="text-xs text-muted-foreground mt-[1px] line-clamp-1">
                {selectedTab === "notifications" ? item.description : item.message}
              </p>
              
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-muted-foreground">
                  {item.time}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>

  {/* Footer */}
  <div className="p-2 border-t border-border/5">
    <Button
      size="sm"
      className={cn(
        "w-full h-9 rounded-2xl",
        "bg-gradient-to-r from-orange-500 to-pink-500",
        "text-white text-xs font-medium",
        "hover:opacity-90",
        "transition-opacity duration-200"
      )}
    >
      View All
    </Button>
  </div>
</PopoverContent>
    </Popover>
  );
};

export default NotificationWidget;