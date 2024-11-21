import React from "react";
import { X } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@nextui-org/react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";


// Dynamically import the NewJobPage component
const NewJobPage = dynamic(() => import("@/app/jobs/new/page"), {
  loading: () => <div>Loading...</div>,
});

interface NewProjectDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewProjectDrawer = ({ isOpen, onClose }: NewProjectDrawerProps) => {
  return (   
    <Drawer open={isOpen} onClose={onClose} direction="right">
   
      <DrawerContent className="h-full w-full ">
        <DrawerHeader className="flex justify-between border-b border-border/40 px-4">
          <DrawerTitle>Create New Project</DrawerTitle>
          <DrawerClose asChild>
            <Button
              isIconOnly
              variant="light"
              onPress={onClose}
            >
              <X size={24} />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="h-full  overflow-y-auto px-4"><ScrollArea>
          <NewJobPage /></ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
}; 