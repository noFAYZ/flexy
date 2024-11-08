
"use client"
import { useDrawer } from "@/app/hooks/useDrawer";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { Button } from "@nextui-org/button";
import { useDisclosure, Card, CardBody } from "@nextui-org/react";
import { Pencil, Globe, Briefcase, Trophy, Coffee } from "lucide-react";
import { useState } from "react";
import { QuickFactsEditor } from "./QuickFactEditor";
import { QuickFact } from "./QuickFact";

export const AboutMeCard = ({ aboutData, onUpdate }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editData, setEditData] = useState(aboutData);
    const { openDrawer } = useDrawer();
 
    const handleSave = () => {
      console.log(aboutData);
      onUpdate(editData);
    
    };


   
  
    const handleEditClick = () => {
      openDrawer({
        content: (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground/80 mb-2 block">
                Bio
              </label>
              <MinimalTiptapEditor
                value={aboutData.bio}
                onChange={(e) => setEditData({ ...editData, bio: e })}
                className="w-full"
                editorContentClassName="p-3 sm:p-5"
                output="html"
                placeholder="Type your description here..."
                autofocus={true}
                editable={true}
                editorClassName="focus:outline-none"
              />
            </div>
            <QuickFactsEditor quickFacts={aboutData.quickFacts} onChange={(newQuickFacts) => setEditData({ ...editData, quickFacts: newQuickFacts })} />
          </div>
        ),
        title: "Edit About Me",
        width: "full",
        onSave: () => onUpdate(editData)
      });
    };
  
    return (
      <>
        <Card className="mb-6 bg-background shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50 overflow-hidden">
          <CardBody className="p-4 sm:p-6">
            <div className="space-y-4 sm:space-y-6">
              {/* Header with Edit Button */}
              <div className="flex justify-between items-start">
                <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 text-foreground flex items-center">
                  <span className="bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
                    About Me
                  </span>
                </h2>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onClick={handleEditClick}
                  className="text-default-500 hover:text-primary"
                >
                  <Pencil size={18} />
                </Button>
              </div>
  
              {/* Main Bio Section */}
              <div>
                <p className="text-sm sm:text-md text-foreground/70 leading-relaxed mb-4">
                  {aboutData.bio}
                </p>
              </div>
  
              {/* Quick Facts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <QuickFact
                  icon={<Globe />}
                  title="Location"
                  value={aboutData.location}
                />
                <QuickFact
                  icon={<Briefcase />}
                  title="Experience"
                  value={`${aboutData.yearsOfExperience}+ Years`}
                />
                <QuickFact
                  icon={<Trophy />}
                  title="Projects Completed"
                  value={aboutData.projectsCompleted}
                />
                <QuickFact
                  icon={<Coffee />}
                  title="Coffee Consumed"
                  value={`${aboutData.coffeeCount}+ Cups`}
                />
              </div>
            </div>
          </CardBody>
        </Card>
  
  
      </>
    );
};