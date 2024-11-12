import React, { useRef, useEffect } from "react";
import { Avatar, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { MoreVertical, Reply, Edit3, Trash2, Smile, Download, AlertCircle, CheckCheck, Bookmark, Copy, Forward } from "lucide-react";
import { formatDateTime, isSameDay } from "./utils/dateFormatters";
import { Message, MessageAttachment } from "./types";

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  onReply: (message: Message) => void;
  onEdit: (message: Message) => void;
  onDelete: (messageId: string) => void;
  onReact: (messageId: string, emoji: string) => void;
  onRetry: (messageId: string) => void;
  onDownload: (attachment: MessageAttachment) => void;
  theme: string;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
  onReply,
  onEdit,
  onDelete,
  onReact,
  onRetry,
  onDownload,
  theme
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const renderAttachment = (attachment: MessageAttachment) => {
    switch (attachment.type) {
      case 'image':
        return (
          <div className="relative max-w-[240px] rounded-lg overflow-hidden">
            <img src={attachment.url} alt={attachment.name || 'attachment'} className="w-full h-auto" />
            <Button
              size="sm"
              variant="flat"
              className="absolute bottom-2 right-2"
              onClick={() => onDownload(attachment)}
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        );
      case 'file':
        return (
          <Button
            size="sm"
            variant="flat"
            className="gap-2"
            onClick={() => onDownload(attachment)}
          >
            <Download className="w-4 h-4" />
            {attachment.name} ({attachment.size})
          </Button>
        );
      case 'voice':
        return (
          <Button
            size="sm"
            variant="flat"
            className="gap-2"
            onClick={() => onDownload(attachment)}
          >
            <Download className="w-4 h-4" />
            Voice Message
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {messages.map((message, index) => {
        const isOwn = message.senderId === currentUserId;
        const showDate = index === 0 || !isSameDay(messages[index - 1].timestamp, message.timestamp);

        return (
          <div key={message.id}>
            {showDate && (
              <div className="flex justify-center my-4">
                <span className="text-xs bg-default-100 rounded-full px-3 py-1">
                  {formatDateTime(new Date(message.timestamp))}
                </span>
              </div>
            )}
            <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`
                flex gap-3 max-w-[70%] group relative
                ${isOwn ? 'flex-row-reverse' : 'flex-row'}
              `}>
                <Avatar
                  src={`https://i.pravatar.cc/150?u=${message.senderId}`}
                  size="sm"
                  className={isOwn ? 'order-2' : 'order-1'}
                />
                
                <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
                  <div className={`
                    rounded-3xl px-3 py-1  break-words
                    ${isOwn ? `bg-gradient-to-r ${theme} text-white` : 'bg-default-100'}
                  `}>
                    {message.content}
                    {message.attachment && renderAttachment(message.attachment)}
                  </div>

                  <div className="flex items-center gap-1 mt-1 text-xs text-default-400">
                    {message.edited && <span>(edited)</span>}
                    {isOwn && message.status && (
                      <CheckCheck className={`
                        w-4 h-4
                        ${message.status === 'read' ? 'text-success' : ''}
                      `} />
                    )}
                  </div>
                </div>

                <MessageActions
                  message={message}
                  isOwn={isOwn}
                  onReply={onReply}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onReact={onReact}
                  onRetry={onRetry}
                />
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

const MessageActions: React.FC<{
  message: Message;
  isOwn: boolean;
  onReply: (message: Message) => void;
  onEdit: (message: Message) => void;
  onDelete: (messageId: string) => void;
  onReact: (messageId: string, emoji: string) => void;
  onRetry: (messageId: string) => void;
}> = ({
  message,
  isOwn,
  onReply,
  onEdit,
  onDelete,
  onReact,
  onRetry
}) => {
  return (
    <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 -translate-y-full mb-1">
      <Button
        size="sm"
        isIconOnly
        variant="flat"
        onClick={() => onReply(message)}
      >
        <Reply className="w-4 h-4" />
      </Button>
      {isOwn && (
        <Button
          size="sm"
          isIconOnly
          variant="flat"
          onClick={() => onEdit(message)}
        >
          <Edit3 className="w-4 h-4" />
        </Button>
      )}
      <Dropdown>
        <DropdownTrigger>
          <Button
            size="sm"
            isIconOnly
            variant="flat"
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem
            startContent={<Copy className="w-4 h-4" />}
            onClick={() => navigator.clipboard.writeText(message.content)}
          >
            Copy Text
          </DropdownItem>
          <DropdownItem
            startContent={<Forward className="w-4 h-4" />}
          >
            Forward
          </DropdownItem>
          <DropdownItem
            startContent={<Bookmark className="w-4 h-4" />}
          >
            Save Message
          </DropdownItem>
          <DropdownItem
            startContent={<Trash2 className="w-4 h-4" />}
            className="text-danger"
            color="danger"
            onClick={() => onDelete(message.id)}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};