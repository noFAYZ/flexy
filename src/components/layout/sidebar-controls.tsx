'use client'
// components/layout/sidebar-controls.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen } from "lucide-react";
import { useSidebarStore } from '@/store/sidebar-store';

export const SidebarControls = () => {
  const { 
    isLeftSidebarOpen, 
    isRightSidebarOpen,
    toggleLeftSidebar, 
    toggleRightSidebar 
  } = useSidebarStore();

  return (
    <div className="fixed bottom-4 left-4 flex gap-2 z-50">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleLeftSidebar}
        className=" shadow-lg"
      >
        {isLeftSidebarOpen ? 
          <PanelLeftClose className="h-4 w-4" /> : 
          <PanelLeftOpen className="h-4 w-4" />
        }
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={toggleRightSidebar}
        className="shadow-lg"
      >
        {isRightSidebarOpen ? 
          <PanelRightClose className="h-4 w-4" /> : 
          <PanelRightOpen className="h-4 w-4" />
        }
      </Button>
    </div>
  );
};