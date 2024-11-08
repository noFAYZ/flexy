"use client";

import { MynauiBriefcase } from "@/components/icons/icons";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@nextui-org/button";
import { useDisclosure, Card, CardHeader, CardBody, Chip, Input, Textarea } from "@nextui-org/react";
import { Pencil, X, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import  Image  from "next/image";


export const WorkHistoryCard = ({ workHistory, onUpdate }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editedHistory, setEditedHistory] = useState(workHistory);
  
    const handleSave = () => {
      onUpdate(editedHistory);
      onClose();
    };
  
    return (
      <>
        <Card className="bg-accent shadow backdrop-blur-0 rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 flex items-center justify-between">
            <CardTitle className="text-lg sm:text-xl font-semibold ">
              <div className="flex items-center">
                <MynauiBriefcase height={24} className="text-primary mr-2" />
                Work History
              </div>
      
            </CardTitle>        
            <Button
                isIconOnly
                size="sm"
                variant="light"
                onClick={onOpen}
                className="text-default-500 hover:text-primary"
              >
                <Pencil size={18} />
              </Button>
          </CardHeader>
          <CardBody className="p-4">
            <div className="relative">
              {workHistory.map((work, index) => (
                <WorkHistoryItem
                  key={index}
                  work={work}
                  isLast={index === workHistory.length - 1}
                />
              ))}
            </div>
          </CardBody>
        </Card>
  
        {/* Responsive Drawer */}
        <div
          className={`fixed inset-0 w-full h-full bg-background/95 backdrop-blur-sm transform transition-all duration-300 ease-in-out z-50 
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            sm:w-1/2  sm:inset-y-0 sm:right-0 sm:left-auto sm:h-full sm:bg-background`}
        >
          <div className="h-full flex flex-col max-h-screen">
            {/* Drawer Header */}
            <div className="p-4 sm:p-6 border-b border-divider flex justify-between items-center sticky top-0 bg-background/95 backdrop-blur-sm">
              <h2 className="text-lg sm:text-xl font-semibold">Edit Work History</h2>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onClick={onClose}
                className="text-default-500"
              >
                <X size={20} />
              </Button>
            </div>
  
            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="space-y-6">
                <Button
                  onClick={() => setEditedHistory([
                    { title: '', company: '', period: '', description: '' },
                    ...editedHistory
                  ])}
                  className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                >
                  <Plus size={18} className="mr-2" />
                  Add New Position
                </Button>
  
                <div className="grid grid-cols-2 gap-4">
                {editedHistory.map((work, index) => (
                  <WorkHistoryEditor
                    key={index}
                    work={work}
                    onUpdate={(updatedWork) => {
                      const newHistory = [...editedHistory];
                      newHistory[index] = updatedWork;
                      setEditedHistory(newHistory);
                    }}
                    onDelete={() => {
                      setEditedHistory(editedHistory.filter((_, i) => i !== index));
                    }}
                  />
                ))}

                </div>
  
                {editedHistory.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No work history added. Add your first position above.
                  </div>
                )}
              </div>
            </div>
  
            {/* Drawer Footer */}
            <div className="p-4 sm:p-6 border-t border-divider sticky bottom-0 bg-background/95 backdrop-blur-sm">
              <div className="flex justify-end gap-2">
                <Button
                  variant="light"
                  color="danger"
                  onClick={() => {
                    setEditedHistory(workHistory);
                    onClose();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };


  const WorkHistoryItem = ({ work, isLast }) => (
    <div className="flex items-start space-x-4 mb-4 relative">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src={`https://avatar.iran.liara.run/public/`}
              alt={`${work.company} logo`}
              width={40}
              height={40}
              className="rounded-full bg-white p-1 shadow-md"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${work.company}&background=random`;
              }}
            />
            <div>
              <h3 className="font-semibold text-sm">{work.title}</h3>
              <p className="text-xs">{work.company}</p>
            </div>
          </div>
          <Chip className="text-xs">{work.period}</Chip>
        </div>
        <p className="text-sm text-gray-500 mt-2">{work.description}</p>
      </div>
    </div>
  );

  const WorkHistoryEditor = ({ work, onUpdate, onDelete }) => {
    const handleChange = (field, value) => {
      onUpdate({ ...work, [field]: value });
    };
  
    return (
      <div className="p-4 border rounded-lg bg-card space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 flex-1">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-muted-foreground">
                  Job Title
                </label>
                <Input
                  value={work.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="e.g. Senior Developer"
                  className="mt-1"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-muted-foreground">
                  Company
                </label>
                <Input
                  value={work.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  placeholder="e.g. Tech Corp"
                  className="mt-1"
                />
              </div>
            </div>
  
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Period
              </label>
              <Input
                value={work.period}
                onChange={(e) => handleChange('period', e.target.value)}
                placeholder="e.g. 2020 - Present"
                className="mt-1"
              />
            </div>
  
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Description
              </label>
              <Textarea
                value={work.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe your role and achievements..."
                className="mt-1"
                rows={3}
              />
            </div>
          </div>
  
          <Button
            isIconOnly
            variant="light"
            size="sm"
            onClick={onDelete}
            className="text-destructive hover:text-destructive/90 ml-2"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    );
  };
  