import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/react";
import { IconColorPicker } from "@tabler/icons-react";
import { Bell, Archive, Trash2, Settings } from "lucide-react";

interface ChatSettingsProps {
    theme: string;
  }
  
  export const ChatSettings: React.FC<ChatSettingsProps> = ({ theme }) => {
    const settings = [
      {
        icon: Bell,
        label: 'Notifications',
        description: 'Customize notification settings'
      },
      {
        icon: IconColorPicker,
        label: 'Media Visibility',
        description: 'Show media in gallery'
      },

    ];
  
    const dangerActions = [
      {
        icon: Archive,
        label: 'Archive Chat',
        description: 'Move to archive'
      },
      {
        icon: Trash2,
        label: 'Delete Chat',
        description: 'Delete permanently',
        danger: true
      }
    ];
  
    return (
      <div>
        <h4 className="font-semibold mb-3">Settings</h4>
        
        <div className="space-y-2">
          {settings.map((setting) => (
            <Button
              key={setting.label}
              className="w-full justify-start p-3 h-auto"
              variant="light"
            >
              <div className="flex items-center gap-3">
                <div className={`
                  p-2 rounded-lg
                  ${setting.label === 'Theme'
                    ? `bg-gradient-to-r ${theme} text-white`
                    : 'bg-default-100'
                  }
                `}>
                  <Settings className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="font-medium">{setting.label}</p>
                  <p className="text-xs text-default-500">
                    {setting.description}
                  </p>
                </div>
              </div>
            </Button>
          ))}
  
          <Divider className="my-4" />
  
          {dangerActions.map((action) => (
            <Button
              key={action.label}
              className="w-full justify-start p-3 h-auto"
              variant="light"
              color={action.danger ? "danger" : "default"}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-default-100">
                  <action.icon className={`
                    w-4 h-4
                    ${action.danger ? 'text-danger' : ''}
                  `} />
                </div>
                <div className="text-left">
                  <p className="font-medium">{action.label}</p>
                  <p className="text-xs text-default-500">
                    {action.description}
                  </p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    );
  };