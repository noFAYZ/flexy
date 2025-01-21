import React from 'react';
import { cn } from "@/lib/utils";

export const PageContainer = ({ 
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(
      "flex-1 min-w-0 overflow-y-auto pt-12 ",
      className
    )}>
      {children}
    </div>
  );
};