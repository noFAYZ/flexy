import { Avatar, Progress, Chip, Badge } from "@nextui-org/react";
import { CheckCheck } from "lucide-react";
import { getRelativeTimeString } from "./utils/dateFormatters";
import { Chat } from './types';

interface ChatListItemProps {
  chat: Chat;
  isSelected: boolean;
  onSelect: () => void;
  theme: string;
}

const ChatListItem: React.FC<ChatListItemProps> = ({
  chat,
  isSelected,
  onSelect,
  theme
}) => {
  const participant = chat.participants[0];

  return (
    <div
      onClick={onSelect}
      className={`
        p-3 rounded-xl cursor-pointer transition-all
        ${isSelected 
          ? `bg-gradient-to-r ${theme} bg-opacity-10` 
          : 'hover:bg-default-100'
        }
      `}
    >
      <div className="flex items-center gap-3">
        {/* Avatar with status */}
        <div className="relative">
          <Badge
            content=""
            color="success"
            placement="bottom-right"
            isInvisible={!chat.isOnline}
          >
            <Avatar
              src={participant.avatar}
              className="w-10 h-10"
            />
          </Badge>
        </div>

        {/* Chat info */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium truncate">
              {chat.name}
            </span>
            <span className="text-xs text-default-500">
              {getRelativeTimeString(new Date(chat.lastMessage.timestamp))}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {chat.lastMessage.status === 'read' && (
              <CheckCheck className="w-3 h-3 text-success" />
            )}
            <p className="text-sm text-default-500 truncate">
              {chat.lastMessage.content}
            </p>
          </div>

          {/* Project progress (if applicable) */}
          {chat.project && (
            <div className="mt-2">
              <Progress
                size="sm"
                value={chat.project.progress}
                className="max-w-[100px]"
                color="success"
              />
              <div className="flex gap-1 mt-1">
                <Chip size="sm" variant="flat">
                  {chat.project.name}
                </Chip>
                <Chip size="sm" variant="flat">
                  {chat.project.status}
                </Chip>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;