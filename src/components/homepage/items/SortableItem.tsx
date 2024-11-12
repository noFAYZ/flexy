import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Check, Settings2, Pencil, Copy, Trash } from "lucide-react";

interface SortableItemProps {
  id: number | string;
  width: {
    base: string;
    sm?: string;
    md?: string;
    lg?: string;
  };
  height: {
    base: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
  children?: React.ReactNode;
  title?: string;
  className?: string;
}

export function SortableItem({ 
  id, 
  width,
  height,
  children,
  title,
  className 
}: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: width.base,
    minHeight: height.base,
    '@media (min-width: 640px)': {
      width: width.sm || width.base,
      minHeight: height.sm || height.base,
    },
    '@media (min-width: 768px)': {
      width: width.md || width.sm || width.base,
      minHeight: height.md || height.sm || height.base,
    },
    '@media (min-width: 1024px)': {
      width: width.lg || width.md || width.sm || width.base,
      minHeight: height.lg || height.md || height.sm || height.base,
    },
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        bg-background/60 shadow-none rounded-[2.5rem] border-medium border-default 
        bg-gradient-to-br from-background to-muted/50 overflow-hidden 
        hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-300
        ${className}
      `}
    >
      <div className="relative w-full h-full">
        {/* Control Buttons - Hide on mobile */}
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-10 hidden sm:flex gap-2">
          <button 
            className="p-2 rounded-xl bg-default/40 backdrop-blur-md hover:bg-default/60 
              transition-all duration-300"
            title="Edit"
          >
            <Pencil size={20} className="text-default-500" />
          </button>
          <button 
            className="p-2 rounded-xl bg-default/40 backdrop-blur-md hover:bg-default/60 
              transition-all duration-300"
            title="Duplicate"
          >
            <Copy size={20} className="text-default-500" />
          </button>
          <button 
            className="p-2 rounded-xl bg-default/40 backdrop-blur-md hover:bg-default/60 
              transition-all duration-300"
            title="Delete"
          >
            <Trash size={20} className="text-default-500" />
          </button>
        </div>

        {/* Mobile Control Button */}
        <div className="absolute top-4 right-4 z-10 sm:hidden">
          <button 
            className="p-2 rounded-xl bg-default/40 backdrop-blur-md"
            title="Options"
          >
            <Settings2 size={20} className="text-default-500" />
          </button>
        </div>

        {/* Content */}
        <div className="h-full flex flex-col">
          {title && (
            <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
            </CardHeader>
          )}
          <CardBody className="p-4 sm:p-6 flex-grow">
            {children}
          </CardBody>
        </div>
      </div>
    </Card>
  );
}