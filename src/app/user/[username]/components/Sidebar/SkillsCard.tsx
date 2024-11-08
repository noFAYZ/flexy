"use client";

import { CardTitle } from "@/components/ui/card";
import { Button } from "@nextui-org/button";
import { useDisclosure, Card, CardHeader, CardBody, Chip, Input } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Wrench, Pencil, X, Plus, Trash2 } from "lucide-react";
import { useState } from "react";


export const SkillsCard = ({ skills, onUpdate }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editedSkills, setEditedSkills] = useState(skills);
    const [newSkill, setNewSkill] = useState('');
  
    const handleSave = () => {
      onUpdate(editedSkills);
      onClose();
    };
  
    const handleAddSkill = (e) => {
      e.preventDefault();
      if (newSkill.trim()) {
        setEditedSkills([...editedSkills, { name: newSkill.trim() }]);
        setNewSkill('');
      }
    };
  
    const handleRemoveSkill = (index) => {
      setEditedSkills(editedSkills.filter((_, i) => i !== index));
    };
  
    return (
      <>
        <Card className="bg-accent shadow backdrop-blur-0 rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50 overflow-hidden">
          <CardHeader className="flex bg-gradient-to-r from-primary/10 to-secondary/10 p-4 justify-between">
            <CardTitle className=" text-lg sm:text-xl font-semibold flex items-center ">
              <div className="flex items-center">
                <motion.div className="mr-2">
                  <Wrench size={22} className="text-primary" />
                </motion.div>
                Skills
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
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div key={index}>
                  <Chip className="font-semibold bg-gradient-to-r from-pink-500 to-orange-500 text-white">
                    {skill.name}
                  </Chip>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
  
        {/* Responsive Drawer */}
        <div
          className={`fixed inset-0 w-full h-full bg-background/95 backdrop-blur-sm transform transition-all duration-300 ease-in-out z-50 
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            sm:w-[95%] sm:max-w-xl sm:inset-y-0 sm:right-0 sm:left-auto sm:h-full sm:bg-background`}
        >
          <div className="h-full flex flex-col max-h-screen">
            {/* Drawer Header */}
            <div className="p-4 sm:p-6 border-b border-divider flex justify-between items-center sticky top-0 bg-background/95 backdrop-blur-sm">
              <h2 className="text-lg sm:text-xl font-semibold">Edit Skills</h2>
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
                {/* Add New Skill Form */}
                <form onSubmit={handleAddSkill} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80">
                      Add New Skill
                    </label>
                    <div className="flex gap-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Enter skill name"
                        className="flex-1"
                      />
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                        disabled={!newSkill.trim()}
                      >
                        <Plus size={18} className="mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </form>
  
                {/* Skills List */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">
                    Current Skills
                  </label>
                  <div className="space-y-2">
                    {editedSkills.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        No skills added. Add your first skill above.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {editedSkills.map((skill, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 rounded-full border bg-gradient-to-r from-pink-500 to-orange-500"
                          >
                            <span className="text-sm font-medium">{skill.name}</span>
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              onClick={() => handleRemoveSkill(index)}
                              className="text-white hover:text-white rounded-full bg-orange-900"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
  
            {/* Drawer Footer */}
            <div className="p-4 sm:p-6 border-t border-divider sticky bottom-0 bg-background/95 backdrop-blur-sm">
              <div className="flex justify-end gap-2">
                <Button
                  variant="light"
                  color="danger"
                  onClick={() => {
                    setEditedSkills(skills);
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