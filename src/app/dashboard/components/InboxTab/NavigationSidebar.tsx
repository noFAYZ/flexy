import { Button } from "@nextui-org/button";
import { Card, Divider, Avatar, Tooltip } from "@nextui-org/react";
import { MessageSquare, Star, Archive, Link2, Settings, File, Image } from "lucide-react";


interface NavigationSidebarProps {
    activeView: string;
    setView: (view: string) => void;
    theme: string;
    onNewChat: () => void;
    onProfile: () => void;
  }
  
  export const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
    activeView,
    setView,
    theme,
    onNewChat,
    onProfile
  }) => {
    return (
      <Card className=" p-2 flex flex-col items-center justify-between">
        <div className="space-y-4 flex flex-col">
          <Button 
            isIconOnly
            className={`bg-gradient-to-r ${theme} text-white p-3 rounded-2xl`}
            onClick={onNewChat}
          >
            <MessageSquare className="w-5 h-5" />
          </Button>
          
          <Divider />
          
          {[
            { icon: MessageSquare, label: 'Chats', value: 'chats' },
            { icon: Star, label: 'Starred', value: 'starred' },
            { icon: Archive, label: 'Archived', value: 'archived' },
            { icon: File, label: 'Files', value: 'files' },
            { icon: Link2, label: 'Links', value: 'links' },
            { icon: Image, label: 'Media', value: 'media' }
          ].map((item) => (
            <Tooltip key={item.value} content={item.label} placement="right">
              <Button
                isIconOnly
                variant="light"
                className={`
                  transition-all
                  ${activeView === item.value 
                    ? `bg-gradient-to-r ${theme} bg-opacity-10` 
                    : ''
                  }
                `}
                onClick={() => setView(item.value)}
              >
                <item.icon className="w-6 h-6" />
              </Button>
            </Tooltip>
          ))}
        </div>
        
        <div className="space-y-4">
          <Tooltip content="Settings" placement="right">
            <Button isIconOnly variant="light">
              <Settings className="w-5 h-5" />
            </Button>
          </Tooltip>
          
          <Avatar
            src="/api/placeholder/32/32"
            className="cursor-pointer hover:ring-2 hover:ring-primary transition-all"
            onClick={onProfile}
          />
        </div>
      </Card>
    );
  };