import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles, Settings, LayoutDashboardIcon } from "lucide-react";
import NextLink from "next/link";
import { useTheme } from 'next-themes';
import {
  SiDashboardDuotone,
  LetsIconsSearchDuotone,
  LsiconContractOutline,
  SolarWalletBoldDuotone,
  StashUsersCrownDuotone,
  AntDesignMessageTwotone,
  HugeiconsAnalyticsUp
} from '../icons';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactComponent as FlexyLogo } from "/public/images/logo/DeFlexy-light3.svg";
import { ReactComponent as DarkFlexyLogo } from "/public/images/logo/DeFlexy.svg";
import { ReactComponent as FlexyLogoIcon } from "/public/images/logo/DeFlexy-Icon.svg";
import { ReactComponent as DarkFlexyLogoIcon } from "/public/images/logo/DeFlexy-Icon3.svg";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const Logo = ({ theme, isMobile = false }) => {
  const LogoComponent = theme === 'dark' ? 
    (isMobile ? FlexyLogoIcon : DarkFlexyLogo) : 
    (isMobile ? FlexyLogoIcon : FlexyLogo);
  
  const width = isMobile ? 50 : 200;
  const height = isMobile ? 50 : 70;

  return (
    <NextLink href="/" className={`flex justify-center items-center rounded-full ${isMobile ? '' : 'border-0 shadow-none'}`}>
      <LogoComponent width={width} height={height} className="antialiased" />
    </NextLink>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = React.useState('home');
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboardIcon, label: 'Dashboard' },
    { id: 'jobs', icon: LetsIconsSearchDuotone, label: 'Find Jobs' },
    { id: 'contracts', icon: LsiconContractOutline, label: 'Contracts' },
    { id: 'wallet', icon: SolarWalletBoldDuotone, label: 'Wallet' },
    { id: 'community', icon: StashUsersCrownDuotone, label: 'Community' },
    { id: 'messages', icon: AntDesignMessageTwotone, label: 'Messages' },
    { id: 'analytics', icon: HugeiconsAnalyticsUp, label: 'Analytics' },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={cn(
      "sticky flex flex-col h-screen bg-background border-r-[0.1em] transition-all duration-100 py-12 md:py-12 top-0 z-10",
      isCollapsed ? "w-20 py-20" : "w-[340px]"
    )}>
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="absolute -right-3 top-10 z-50 h-6 w-6 rounded-full border bg-background"
      >
        {isCollapsed ? 
          <ChevronRight className="h-4 w-4" /> : 
          <ChevronLeft className="h-4 w-4" />
        }
      </Button>

      <div className="flex flex-col flex-1 px-3">
        {/* Logo Area */}
        <div className={cn(
          "flex items-center mb-8 px-2",
          isCollapsed ? "justify-center" : "gap-2"
        )}>
          {isCollapsed ? (
             <Logo theme={theme} isMobile={true} />
          ) : (
            <Logo theme={theme} />
          )}
        </div>

        {/* Main Menu */}
        <nav className="flex-1 space-y-2 py-10">
          {menuItems.map((item) => (
            <TooltipProvider key={item.id} delayDuration={50}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full transition-all duration-0 group rounded-[1.25rem] antialiased border-none",
                isCollapsed ? "justify-center px-2" : "justify-start px-3",
                "h-12",
                activeTab === item.id ? 
                  "bg-gradient-to-r from-orange-700/90 via-orange-500/90 to-pink-400/90 text-orange-600 backdrop:blur-sm" : 
                  "hover:bg-muted"
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className={cn(
                "transition-all duration-100",
                "w-[26px] h-[26px]",
                activeTab === item.id ? 
                  "text-white" : 
                  "text-foreground hover:text-foreground/80"
              )} />
              {!isCollapsed && (
                <span className={cn(
                  "ml-4 text-base",
                  activeTab === item.id ? 
                    "bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-white font-bold" : 
                    "text-foreground font-[400]"
                )}>
                  {item.label}
                </span>
              )}
                </Button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right" className="font-medium">
                  {item.label}
                </TooltipContent>
              )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="border-t border-gray-200 pt-2 space-y-1">
          <Button
            variant="ghost"
            className={cn(
              "w-full h-12 transition-all duration-300 hover:bg-muted group rounded-[1.25rem] antialiased border-none",
              isCollapsed ? "justify-center px-2" : "justify-start px-3"
            )}
          >
            <Settings className="w-6 h-6 text-gray-100" />
            {!isCollapsed && (
              <span className="ml-4 font-medium text-md text-gray-100">Settings</span>
            )}
          </Button>
          {!isCollapsed && (
            <div className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-white p-0.5">
                    <img
                      src="/api/placeholder/100/100"
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-800">Alex Johnson</p>
                  <p className="text-xs text-gray-500">@alexjohnson</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;