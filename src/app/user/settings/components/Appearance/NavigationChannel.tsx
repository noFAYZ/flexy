import React, { useEffect, useState } from 'react';
import { Switch } from "@/components/ui/switch";
import { useSidebarStore } from '@/store/sidebar-store';
import { cn } from '@/lib/utils';
import { Layout } from 'lucide-react';

interface NavigationChannelProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  className?: string;
}

const NavigationChannel = ({ 
  icon, 
  title, 
  description, 
  className 
}: NavigationChannelProps) => {
  const { 
    navigationPreference,
    setNavigationPreference,
    setLeftSidebarOpen
  } = useSidebarStore();
  
  const [isMobile, setIsMobile] = useState(false);

  // Handle screen size detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Determine if sidebar should be enabled based on screen size
  const isSidebarEnabled = !isMobile;

  // Handle navigation preference change
  const handleToggle = (checked: boolean) => {
    const newPreference = checked ? 'sidebar' : 'navbar';
    setNavigationPreference(newPreference);
    
    // Automatically handle sidebar visibility
    if (isSidebarEnabled) {
      setLeftSidebarOpen(checked);
    }
  };

  return (
    <div className={cn(
      "flex items-center justify-between p-4",
      "bg-accent/50 backdrop-blur-sm",
      "rounded-xl border border-border/5",
      "transition-all duration-200",
      "hover:bg-accent/70",
      className
    )}>
      <div className="flex items-center gap-3">
        <div className={cn(
          "p-2 rounded-lg",
          "bg-primary/10",
          "transition-colors duration-200"
        )}>
          {React.cloneElement(icon, { 
            size: 20, 
            className: "text-primary transition-colors duration-200" 
          })}
        </div>
        <div className="flex flex-col gap-0.5">
          <h4 className="font-medium text-foreground">
            {title}
          </h4>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
          {isMobile && (
            <p className="text-xs text-primary/70 mt-1">
              Sidebar navigation is disabled on mobile devices
            </p>
          )}
        </div>
      </div>
      
      <Switch
        checked={navigationPreference === 'sidebar'}
        onCheckedChange={handleToggle}
        disabled={!isSidebarEnabled}
        className="data-[state=checked]:bg-primary"
      />
    </div>
  );
};

// Preset configuration for navigation preference
export const NavigationPreferenceChannel = () => (
  <NavigationChannel
    icon={<Layout />}
    title="Sidebar Navigation"
    description="Toggle between sidebar and navbar navigation"
  />
);

export default NavigationChannel;