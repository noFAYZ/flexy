"use client";
import { HugeiconsNoteDone } from "@/components/icons/icons";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@nextui-org/button";
import { useDisclosure, Card, CardHeader, CardBody, Chip, Avatar } from "@nextui-org/react";
import { ChevronRight, Star } from "lucide-react";
import { useState } from "react";
import { DetailedReviewModal } from "./ReviewModal";


export const ReviewsCard = ({ completedWork, inProgressWork }) => {
    const [activeTab, setActiveTab] = useState("completed");
    const [selectedWork, setSelectedWork] = useState(null);
    const [visibleCount, setVisibleCount] = useState(4);
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const currentWork =
      activeTab === "completed" ? completedWork : inProgressWork;
    const displayedWork = currentWork.slice(0, visibleCount);
  
    const handleWorkClick = (work) => {
      setSelectedWork(work);
      onOpen();
    };
  
    const handleViewMore = () => {
      setVisibleCount((prevCount) => Math.min(prevCount + 2, currentWork.length));
    };
  
    return (
      <Card className="mb-6 bg-background shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 flex flex-wrap  gap-4 justify-between sm:gap-0">
          <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
            <HugeiconsNoteDone size={22} className="text-primary mr-2" />
            Recent Work
          </CardTitle>
          <div className="antialiased flex border-medium border-default bg-muted rounded-full p-1">
            <TabButton
              isActive={activeTab === "completed"}
              onClick={() => {
                setActiveTab("completed");
                setVisibleCount(4); // Reset visible count when switching tabs
              }}
            >
              <span className="flex gap-1">
                Completed ({completedWork.length})
              </span>
            </TabButton>
            <TabButton
              isActive={activeTab === "inProgress"}
              onClick={() => {
                setActiveTab("inProgress");
                setVisibleCount(4); // Reset visible count when switching tabs
              }}
            >
              <span className="flex gap-1">
                In Progress ({inProgressWork.length})
              </span>
            </TabButton>
          </div>
        </CardHeader>
        <CardBody className="p-4">
          <div className="space-y-2">
            {displayedWork.map((work, index) => (
              <RecentWorkItem
                key={index}
                work={work}
                onClick={() => handleWorkClick(work)}
              />
            ))}
          </div>
          {visibleCount < currentWork.length && (
            <div className="mt-4 text-center rounded-3xl">
              <Button
                size="sm"
                className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold rounded-full 
                transition-all duration-100 transform hover:scale-105"
                endContent={<ChevronRight size={16} />}
                onClick={handleViewMore}
              >
                View more! ({currentWork.length - visibleCount} remaining)
              </Button>
            </div>
          )}
        </CardBody>
        <DetailedReviewModal
          work={selectedWork}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Card>
    );
  };

const TabButton = ({ isActive, onClick, children }) => (
    <button
      className={`flex py-2 px-4 text-xs rounded-full transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white"
          : "text-gray-600 hover:text-gray-100"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );

const RecentWorkItem = ({ work, onClick }) => {
    return (
      <div
        className="p-4 border-b-2 cursor-pointer hover:bg-muted transition-colors duration-200"
        onClick={onClick}
      >
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-lg">{work.title}</h3>
          </div>
          <Chip
            variant="flat"
            className="text-sm bg-gradient-to-r from-pink-500 to-orange-500 text-white"
          >
            {work.amount}
          </Chip>
        </div>
        <p className="text-sm mb-3 line-clamp-2">{work.review}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Avatar src={work.clientAvatar} size="sm" className="mr-2" />
            <p className="text-xs mr-4">{work.clientName}</p>
            <span className="text-xs">
              {new Date(work.date).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center mb-2">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < work.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm font-medium">
                {work?.rating?.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };