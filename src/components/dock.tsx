"use client";

import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  mobileDirection?: "top" | "bottom";
  desktopDirection?: "left" | "right";
  children: React.ReactNode;
}

const dockVariants = cva(
  "fixed p-2 flex gap-2 rounded-2xl border supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 backdrop-blur-md",
  {
    variants: {
      orientation: {
        horizontal: "w-max h-[58px]",
        vertical: "h-max w-[58px] flex-col",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

const Dock: React.FC<DockProps> = ({
  className,
  children,
  mobileDirection = "bottom",
  desktopDirection = "right",
  ...props
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const renderChildren = (orientation: "horizontal" | "vertical") => {
    return React.Children.map(children, (child: any, index) => {
      return React.cloneElement(child, {
        isHovered: index === hoveredIndex,
        onHover: () => setHoveredIndex(index),
        onLeave: () => setHoveredIndex(null),
        orientation: orientation,
      });
    });
  };

  const mobilePositionClass = mobileDirection === "top" ? "top-4" : "bottom-4";
  const desktopPositionClass = desktopDirection === "left" ? "left-4" : "right-4";

  return (
    <>
      {/* Mobile (Horizontal) Dock */}
      <div
        className={cn(
          dockVariants({ orientation: "horizontal" }),
          `md:hidden ${mobilePositionClass} left-1/2 -translate-x-1/2`,
          className
        )}
        {...props}
      >
        {renderChildren("horizontal")}
      </div>

      {/* Desktop (Vertical) Dock */}
      <div
        className={cn(
          dockVariants({ orientation: "vertical" }),
          `hidden md:flex ${desktopPositionClass} top-1/2 -translate-y-1/2`,
          className
        )}
        {...props}
      >
        {renderChildren("vertical")}
      </div>
    </>
  );
};

export interface DockIconProps {
  isHovered?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
  className?: string;
  children?: React.ReactNode;
  tooltip?: string;
  orientation?: "horizontal" | "vertical";
}

const DockIcon: React.FC<DockIconProps> = ({
  isHovered,
  onHover,
  onLeave,
  className,
  children,
  tooltip,
  orientation = "horizontal",
}) => {
  return (
    <div className="relative group">
      <motion.div
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        animate={{
          scale: isHovered ? 1.2 : 1,
          backgroundColor: isHovered ? "muted" : "#da5b22",
        }}
        className={cn(
          "flex aspect-square w-10 h-10 cursor-pointer items-center justify-center rounded-full transition-colors",
          className,
        )}
      >
        <motion.div
          animate={{
            scale: isHovered ? 1.2 : 1,
            color: isHovered ? "#ffffdf" : "#ffffff",
          }}
        >
          {children}
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {isHovered && tooltip && (
          <motion.div
            initial={{ opacity: 0, y: orientation === "horizontal" ? 10 : 0, x: orientation === "vertical" ? -10 : 0 }}
            animate={{ opacity: 1, y: orientation === "horizontal" ? -5 : 0, x: orientation === "vertical" ? -5 : 0 }}
            exit={{ opacity: 0, y: orientation === "horizontal" ? 10 : 0, x: orientation === "vertical" ? -10 : 0 }}
            className={cn(
              "absolute bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap",
              orientation === "horizontal" ? "bottom-full left-1/2 -translate-x-1/2 mb-2" : "right-full top-1/2 -translate-y-1/2 mr-2"
            )}
          >
            {tooltip}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };