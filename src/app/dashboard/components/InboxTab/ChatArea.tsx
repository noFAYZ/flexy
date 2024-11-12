import { Button } from "@nextui-org/button";
import { Card, Avatar, Input, CardHeader, CardBody, Popover, PopoverTrigger, PopoverContent, Tooltip, Divider } from "@nextui-org/react";
import { Phone, Video, Search, Minimize2, Maximize2, X, Plus, Smile, Paperclip, Send, Mic, MessageSquare, Settings, Reply, Image, Camera, FileText, Music, MapPin, Contact2, Calendar, ImagePlusIcon, PlusCircle } from "lucide-react";
import { MessageList } from "./MessageList";
import { Message, Chat } from "./types";
import { DEMO_CHAT, DEMO_USERS } from './demoData';
import { useState } from 'react';
import { Textarea } from "@nextui-org/react";
import { IconGif } from "@tabler/icons-react";
import { PlusCircledIcon } from "@radix-ui/react-icons";

interface ChatAreaProps {
    selectedChat: any;
    messageInput: string;
    setMessageInput: (value: string) => void;
    isRecording: boolean;
    setIsRecording: (value: boolean) => void;
    recordingTime: number;
    setRecordingTime: (value: number) => void;
    onSendMessage: () => void;
    onStartRecording: () => void;
    onStopRecording: () => void;
    onCancelRecording: () => void;
    theme: string;
    isFullscreen: boolean;
    setIsFullscreen: (value: boolean) => void;
    replyingTo: Message | null;
    setReplyingTo: (value: Message | null) => void;
    onOpenDetails: () => void;
  }
  
  export const ChatArea: React.FC<ChatAreaProps> = ({
    selectedChat,
    messageInput,
    setMessageInput,
    isRecording,
    setIsRecording,
    recordingTime,
    setRecordingTime,
    onSendMessage,
    onStartRecording,
    onStopRecording,
    onCancelRecording,
    theme,
    isFullscreen,
    setIsFullscreen,
    replyingTo,
    setReplyingTo,
    onOpenDetails
  }) => {
    const [messages, setMessages] = useState(selectedChat?.messages || []);
    const [isTyping, setIsTyping] = useState(false);
    const [attachmentType, setAttachmentType] = useState<"image" | "file" | "voice" | null>(null);

    if (!selectedChat) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-default-500">
          <div className="text-center space-y-4">
            <div className="relative">
              <MessageSquare className="w-16 h-16 mx-auto opacity-25" />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 blur-2xl opacity-10" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium">Select a Conversation</p>
              <p className="text-sm text-default-400">Choose a chat to start messaging</p>
            </div>
          </div>
        </div>
      );
    }

    const handleSendMessage = () => {
      if (!messageInput.trim()) return;

      const newMessage: Message = {
        id: Date.now().toString(),
        content: messageInput,
        senderId: DEMO_USERS.current.id,
        timestamp: new Date().toISOString(),
        status: 'sent',
        attachment: attachmentType && (attachmentType === "image" || attachmentType === "file" || attachmentType === "voice") ? { 
          id: Date.now().toString(),
          type: attachmentType,
          url: '#' 
        } : undefined,
      };

      setMessages([...messages, newMessage]);
      setMessageInput('');
      setIsTyping(false);
      setReplyingTo(null);
      setAttachmentType(null);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    };

    function handleReply(message: Message): void {
      throw new Error("Function not implemented.");
    }

    function handleEdit(message: Message): void {
      throw new Error("Function not implemented.");
    }

    function handleDelete(messageId: string): void {
      throw new Error("Function not implemented.");
    }

    function handleReact(messageId: string, emoji: string): void {
      throw new Error("Function not implemented.");
    }

    function handleRetry(messageId: string): void {
      throw new Error("Function not implemented.");
    }

    function handleDownload(attachment: any): void {
      throw new Error("Function not implemented.");
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setMessageInput(e.target.value);
      setIsTyping(e.target.value.length > 0);
    };

    return (
      <div className="flex flex-col h-full">
        {/* Chat Header */}
        <div className="shrink-0 p-2 sm:p-4 border-b border-default-200 bg-background/60 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <Avatar 
                src={selectedChat?.avatar} 
                size="md"
                className="hidden sm:block"
                fallback={<span className="font-semibold text-lg">{selectedChat?.name?.[0]}</span>}
              />
              <Avatar 
                src={selectedChat?.avatar} 
                size="sm"
                className="block sm:hidden"
                fallback={<span className="font-semibold">{selectedChat?.name?.[0]}</span>}
              />
              <div>
                <h3 className="font-semibold text-sm sm:text-base">{selectedChat?.name}</h3>
                <div className="flex items-center gap-2 text-xs">
                  <span className="flex items-center gap-1 text-success">
                    <span className="w-1.5 h-1.5 rounded-full bg-success" />
                    <span className="hidden sm:inline">Online</span>
                  </span>
                  <span className="text-default-500 hidden sm:inline">Last active: 2m ago</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-0.5 sm:gap-1">
              {/* Desktop Actions */}
              <div className="hidden sm:flex items-center gap-1">
                <Button 
                  variant="flat" 
                  size="sm" 
                  radius="full"
                  startContent={<Phone className="w-4 h-4" />}
                >
                  Call
                </Button>
                <Button 
                  variant="flat" 
                  size="sm" 
                  radius="full"
                  startContent={<Video className="w-4 h-4" />}
                >
                  Video
                </Button>
              </div>

              {/* Mobile Actions */}
              <div className="flex sm:hidden">
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  radius="full"
                >
                  <Phone className="w-4 h-4" />
                </Button>
              </div>

              {/* Common Actions */}
              <Button 
                isIconOnly 
                variant="light" 
                size="sm"
                radius="full"
                className="hidden sm:flex"
              >
                <Search className="w-4 h-4" />
              </Button>
              <Button
                isIconOnly
                variant="light"
                size="sm"
                radius="full"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="hidden sm:flex"
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </Button>
              <Button 
                isIconOnly 
                variant="light" 
                size="sm"
                radius="full"
                className="lg:hidden"
                onClick={onOpenDetails}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
  
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-2 sm:p-4 space-y-4">
            <MessageList
              messages={messages}
              currentUserId={DEMO_USERS.current.id}
              onReply={setReplyingTo}
              onEdit={() => {}}
              onDelete={() => {}}
              onReact={() => {}}
              onRetry={() => {}}
              onDownload={() => {}}
              theme={theme}
            />
          </div>
        </div>
  
        {/* Message Input Area */}
        <div className="shrink-0 mt-auto border-t border-default-200 bg-background/60 backdrop-blur-xl">
          {/* Reply UI */}
          {replyingTo && (
            <div className="p-2 mx-4 mt-3 bg-default-100 rounded-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-1 h-12 rounded-full bg-gradient-to-r ${theme}`} />
                  <div>
                    <span className="text-xs font-medium flex items-center gap-1">
                      <Reply className="w-3 h-3" /> Replying to {replyingTo.sender}
                    </span>
                    <p className="text-sm text-default-500 truncate max-w-[200px]">
                      {replyingTo.content}
                    </p>
                  </div>
                </div>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  radius="full"
                  onClick={() => setReplyingTo(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Attachment Preview */}
          {attachmentType && (
            <div className="p-3 mx-4 mt-3 bg-default-100 rounded-2xl">
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2">
                  {attachmentType === 'image' && <Image className="w-4 h-4" />}
                  {attachmentType === 'file' && <FileText className="w-4 h-4" />}
                  {attachmentType === 'voice' && <Music className="w-4 h-4" />}
                  Selected {attachmentType}
                </span>
                <Button
                  size="sm"
                  variant="light"
                  radius="full"
                  onClick={() => setAttachmentType(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="p-4">
            <div className="flex  gap-2 relative rounded-3xl bg-default-100 p-2 content-center items-center align-middle">
              {/* Left Side Actions */}
              <div className="flex gap-1">
                <Popover placement="top">
                  <PopoverTrigger>
                    <Button
                      isIconOnly
                      variant="light"
                      radius="full"
                      className="text-default-500"
                    >
                      <PlusCircle className="w-6 h-6" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-2">
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { icon: Image, label: "Photo", type: "image" },
                        { icon: Camera, label: "Camera", type: "camera" },
                        { icon: FileText, label: "File", type: "file" },
                        { icon: Music, label: "Audio", type: "audio" },
                        { icon: MapPin, label: "Location", type: "location" },
                        { icon: Contact2, label: "Contact", type: "contact" },
                        { icon: Calendar, label: "Schedule", type: "schedule" },
                        { icon: IconGif, label: "GIF", type: "gif" },
                      ].map((item) => (
                        <Tooltip content={item.label} key={item.type}>
                          <Button
                            isIconOnly
                            variant="light"
                            radius="full"
                            className="w-8 h-8"
                            onClick={() => setAttachmentType(item.type as "image" | "file" | "voice")}
                          >
                            <item.icon className="w-4 h-4" />
                          </Button>
                        </Tooltip>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Textarea */}
              <div className="flex-1">
                <Textarea
                  minRows={1}
                  maxRows={4}
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  classNames={{
                    base: "max-w-full",
                    input: "resize-none py-2 text-sm",
                    inputWrapper: "bg-transparent shadow-none hover:bg-transparent",
                  }}
                />
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-1">
                <Tooltip content="Emoji">
                  <Button
                    isIconOnly
                    variant="light"
                    radius="full"
                    className="text-default-500"
                  >
                    <Smile className="w-6 h-6" />
                  </Button>
                </Tooltip>

                <Button
                  isIconOnly
                  
                  className={`${
                    messageInput.trim()
                      ? `bg-gradient-to-r ${theme} text-white`
                      : isRecording
                      ? "bg-danger text-white"
                      : "bg-default-200 text-default-500"
                  } transition-all duration-200 rounded-2xl`}
                  onClick={() => {
                    if (messageInput.trim()) {
                      handleSendMessage();
                    } else if (!isRecording) {
                      onStartRecording();
                    } else {
                      onStopRecording();
                    }
                  }}
                >
                  {messageInput.trim() ? (
                    <Send className="w-4 h-4 " />
                  ) : isRecording ? (
                    <div className="w-2 h-2 rounded-2xl bg-white animate-pulse" />
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Recording Time Indicator */}
            {isRecording && (
              <div className="text-center mt-2 text-xs text-danger animate-pulse">
                Recording {recordingTime}s
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };