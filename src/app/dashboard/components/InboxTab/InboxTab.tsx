import React, { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Input,
  Avatar,
  Chip,
  Divider,
} from "@nextui-org/react";
import {
  Search,
  Plus,
  MessageSquare,
  Users,
  Settings,
  Star,
  Archive,
  Trash2,
  CheckCheck,
  X,
} from "lucide-react";
import { ChatArea } from "./ChatArea";
import { DetailsSidebar } from "./DetailsSidebar";
import { NewChatModal } from "./NewChatModal";
import { DEMO_CHATS } from './demoData';
import { Chat } from "./types";


export const InboxTab = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDetailsSidebarOpen, setIsDetailsSidebarOpen] = useState(false);
  
  return (
    <div className="flex gap-4  p-2 md:p-4  relative">
      {/* Left Sidebar - Mobile Drawer */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-full sm:w-[320px] 
        transform transition-transform duration-300 ease-in-out
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        sm:relative sm:translate-x-0
      `}>
        <Card className="w-full h-full bg-background/60 backdrop-blur-xl shadow-medium rounded-[2.5rem] border border-default-200 overflow-hidden">
          <CardBody className="p-0 h-full flex flex-col">
            {/* Header Section - Fixed height */}
            <div className="p-4 border-b border-default-200">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                    Messages
                  </h3>
                  <p className="text-xs text-default-500">You have 3 unread messages</p>
                </div>
                <Button
                  className="bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                  size="sm"
                  radius="full"
                  startContent={<Plus size={16} />}
                  onClick={() => setIsNewChatOpen(true)}
                >
                  New
                </Button>
              </div>

              <Input
                placeholder="Search conversations..."
                startContent={<Search size={16} />}
                size="sm"
                radius="full"
                classNames={{
                  input: "bg-default-100",
                  inputWrapper: "bg-default-100 hover:bg-default-200"
                }}
              />
            </div>

            {/* Filters Section - Fixed height */}
            <div className="px-2 py-3 border-b border-default-200">
              <div className="flex gap-1 overflow-x-auto px-2 scrollbar-hide">
                <Button size="sm" variant="flat" radius="full" startContent={<MessageSquare size={14} />}>
                  All
                </Button>
                <Button size="sm" variant="flat" radius="full" startContent={<Star size={14} />}>
                  Starred
                </Button>
                <Button size="sm" variant="flat" radius="full" startContent={<Users size={14} />}>
                  Groups
                </Button>
              </div>
            </div>

            {/* Chat List - Flexible height */}
            <div className="flex-1 overflow-y-auto">
              {DEMO_CHATS.map((chat) => (
                <button
                  key={chat.id}
                  className={`w-full text-left transition-all p-4 hover:bg-default-100
                    ${selectedChat?.id === chat.id ? 'bg-default-100' : ''}
                  `}
                  onClick={() => setSelectedChat(chat)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar 
                        src={chat.avatar} 
                        size="md"
                        className="ring-2 ring-offset-2 ring-default-200"
                      />
                      {chat.isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full ring-2 ring-white" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-semibold truncate">{chat.name}</h4>
                        <span className="text-xs text-default-500 whitespace-nowrap ml-2">
                          {chat.lastMessage?.timestamp}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {chat.lastMessage?.status === 'read' && (
                          <CheckCheck className="w-3 h-3 text-success" />
                        )}
                        <p className="text-sm text-default-500 truncate">
                          {chat.lastMessage?.content}
                        </p>
                      </div>

                      {chat.unreadCount > 0 && (
                        <Chip 
                          size="sm" 
                          className="mt-1 bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                        >
                          {chat.unreadCount} new
                        </Chip>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Mobile Sidebar Toggle */}
      <Button
        isIconOnly
        className="fixed bottom-4 left-4 z-40 sm:hidden bg-background/60 backdrop-blur-xl"
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        size="lg"
        radius="full"
      >
        {isMobileSidebarOpen ? <X /> : <MessageSquare />}
      </Button>

      {/* Chat Area */}
      <Card className="flex-grow bg-background/60 backdrop-blur-xl shadow-medium rounded-[2.5rem] border border-default-200 overflow-hidden">
        <CardBody className="p-0 h-[calc(100vh-14rem)] flex flex-col">
          <ChatArea 
                      selectedChat={selectedChat}
                      messageInput={messageInput}
                      setMessageInput={setMessageInput}
                      isRecording={isRecording}
                      setIsRecording={setIsRecording}
                      recordingTime={recordingTime}
                      setRecordingTime={setRecordingTime}
                      onSendMessage={() => { } }
                      onStartRecording={() => { } }
                      onStopRecording={() => { } }
                      onCancelRecording={() => { } }
                      theme="from-pink-500 to-orange-500"
                      isFullscreen={isFullscreen}
                      setIsFullscreen={setIsFullscreen}
                      replyingTo={replyingTo}
                      setReplyingTo={setReplyingTo} onOpenDetails={function (): void {
                          throw new Error("Function not implemented.");
                      } }          />
        </CardBody>
      </Card>

      {/* Right Sidebar - Mobile Drawer */}
      {selectedChat && (
        <div className={`
          fixed inset-y-0 right-0 z-30 p-4 w-full sm:w-[300px] 
          transform transition-transform duration-300 ease-in-out
          ${isDetailsSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
          lg:relative lg:translate-x-0 lg:block
        `}>
 
              <DetailsSidebar
                selectedChat={selectedChat}
                theme="from-pink-500 to-orange-500"
              />
           
        </div>
      )}

      {/* Backdrop for mobile sidebars */}
      {(isMobileSidebarOpen || isDetailsSidebarOpen) && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => {
            setIsMobileSidebarOpen(false);
            setIsDetailsSidebarOpen(false);
          }}
        />
      )}

      <NewChatModal
        isOpen={isNewChatOpen}
        onClose={() => setIsNewChatOpen(false)}
        theme="from-pink-500 to-orange-500"
      />
    </div>
  );
};