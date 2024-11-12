import { Button } from "@nextui-org/button";
import { Card, Avatar, CardBody, Progress } from "@nextui-org/react";
import { SharedMediaGrid } from "./SharedMediaGrid";
import { SharedFilesList } from "./SharedFileList";
import { MembersList } from "./MembersList";
import { ChatSettings } from "./ChatSettings";

interface DetailsSidebarProps {
    selectedChat: any;
    theme: string;
  }
  
  export const DetailsSidebar: React.FC<DetailsSidebarProps> = ({
    selectedChat,
    theme
  }) => {
    if (!selectedChat) return null;
  
    return (



      
              <div className="space-y-6">
                {/* Profile Section */}
                <div className="text-center">
                  <Avatar
                    src={selectedChat.avatar}
                    className="w-20 h-20 mx-auto mb-3"
                    isBordered
                  />
                  <h4 className="font-semibold text-lg">{selectedChat.name}</h4>
                  <p className="text-sm text-default-500">
                    {selectedChat.type === 'group' ? `${selectedChat.members.length} members` : 'Direct Message'}
                  </p>
                  <div className="flex justify-center gap-2 mt-3">
                    <Button 
                      size="sm"
                      className={`bg-gradient-to-r ${theme} text-white rounded-xl`}
                    >
                      View Profile
                    </Button>
                    <Button size="sm" variant="bordered">
                      Share
                    </Button>
                  </div>
                </div>
  
                {/* Project Details */}
                {selectedChat.project && (
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Project Details</h4>
                    <Card className="bg-default-50">
                      <CardBody className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-default-500">Deadline</span>
                          <span className="text-sm">{selectedChat.project.deadline}</span>
                        </div>
                        <div>
                          <span className="text-sm text-default-500 block mb-2">
                            Progress
                          </span>
                          <Progress
                            value={selectedChat.project.progress}
                            color="success"
                            size="sm"
                            className="mb-1"
                          />
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                )}
  
                {/* Shared Media Grid */}
                <SharedMediaGrid 
                  media={selectedChat?.media || []}
                />
  
                {/* Shared Files List */}
                <SharedFilesList 
                  files={selectedChat?.files || []}
                />
  
                {/* Group Members List */}
                {selectedChat.type === 'group' && (
                  <MembersList members={selectedChat.members} />
                )}
  
                {/* Chat Settings */}
                <ChatSettings theme={theme} />
              </div>
         
     
    );
  };