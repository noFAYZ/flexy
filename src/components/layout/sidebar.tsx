import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Sparkles, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import NextLink from "next/link";
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from "framer-motion";
import {
  SiDashboardDuotone,
  LetsIconsSearchDuotone,
  LsiconContractOutline,
  SolarWalletBoldDuotone,
  StashUsersCrownDuotone,
  AntDesignMessageTwotone,
  HugeiconsAnalyticsUp
} from '../icons';
// Assuming these are imported correctly
import { ReactComponent as FlexyLogo } from "/public/images/logo/DeFlexy-light3.svg";
import { ReactComponent as DarkFlexyLogo } from "/public/images/logo/DeFlexy.svg";
import { ReactComponent as FlexyLogoIcon } from "/public/images/logo/DeFlexy-Icon.svg";
import { ReactComponent as DarkFlexyLogoIcon } from "/public/images/logo/DeFlexy-Icon3.svg";

const Logo = ({ theme, isMobile = false }) => {
  const LogoComponent = theme === 'dark' ? 
    (isMobile ? DarkFlexyLogoIcon : DarkFlexyLogo) : 
    (isMobile ? FlexyLogoIcon : FlexyLogo);
  
  return (
    <NextLink href="/" className="flex justify-center items-center">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <LogoComponent 
          width={isMobile ? 60 : 200} 
          height={isMobile ? 60 : 105} 
          className="relative z-10" 
        />
      </motion.div>
    </NextLink>
  );
};

const MenuButton = ({ item, isActive, isCollapsed, onClick }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative">
            <motion.div
              className={cn(
                "absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20",
                "rounded-[1.25rem] blur-lg",
                isActive ? "opacity-100" : "opacity-0"
              )}
              animate={isActive ? {
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <Button
              variant="ghost"
              onClick={onClick}
              className={cn(
                "w-full relative group",
                "transition-all duration-500",
                "rounded-[1.25rem] border-none",
                isCollapsed ? "justify-center px-2" : "justify-start px-6",
                "h-14 my-1",
                "overflow-hidden backdrop-blur-sm",
                isActive 
                  ? "bg-gradient-to-r from-orange-700/90 via-orange-500/90 to-pink-400/90" 
                  : "hover:bg-background/40 hover:shadow-lg"
              )}
            >
              {/* Animated background gradient */}
              <div
                className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-100",
                  "transition-opacity duration-500",
                  "bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-orange-500/10",
                  "bg-[length:200%_100%]",
                  "animate-gradient-x"
                )}
              />

              {/* Icon wrapper with orbital animation */}
              <div className="relative">
                <motion.div
                  className={cn(
                    "absolute inset-0 rounded-full",
                    isActive ? "bg-white/20" : "bg-transparent"
                  )}
                  animate={isActive ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                  } : {}}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <item.icon className={cn(
                  "transition-all duration-300",
                  "w-[26px] h-[26px]",
                  isActive ? "text-white scale-110" : "text-foreground group-hover:text-foreground/80",
                  "relative z-10"
                )} />
              </div>

              {/* Label with slide animation */}
              {!isCollapsed && (
                <motion.span
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className={cn(
                    "ml-4 text-base",
                    isActive ? "text-white font-bold" : "text-foreground/90",
                    "group-hover:text-foreground"
                  )}
                >
                  {item.label}
                </motion.span>
              )}

              {/* Active indicator dots */}
              {isActive && (
                <div className="absolute right-4 flex gap-1">
                  <motion.div
                    className="w-1 h-1 rounded-full bg-white"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                  <motion.div
                    className="w-1 h-1 rounded-full bg-white"
                    animate={{
                      scale: [1.5, 1, 1.5],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                </div>
              )}
            </Button>
          </div>
        </TooltipTrigger>
        {isCollapsed && (
          <TooltipContent side="right" sideOffset={20} className="font-medium">
            {item.label}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { id: 'dashboard', icon: SiDashboardDuotone, label: 'Dashboard' },
    { id: 'jobs', icon: LetsIconsSearchDuotone, label: 'Find Jobs' },
    { id: 'contracts', icon: LsiconContractOutline, label: 'Contracts' },
    { id: 'wallet', icon: SolarWalletBoldDuotone, label: 'Wallet' },
    { id: 'community', icon: StashUsersCrownDuotone, label: 'Community' },
    { id: 'messages', icon: AntDesignMessageTwotone, label: 'Messages' },
    { id: 'analytics', icon: HugeiconsAnalyticsUp, label: 'Analytics' },
  ];

  return (
    <motion.div
      initial={false}
      animate={{ 
        width: isCollapsed ? 80 : 340,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "relative flex flex-col h-screen",
        "bg-background/80 backdrop-blur-xl",
        "border-r border-r-foreground/5",
        "py-6"
      )}
    >
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-pink-500/5" />
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      {/* Toggle Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute -right-3 top-12 z-50"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "h-6 w-6 rounded-full",
            "bg-orange-500/20 backdrop-blur-md",
            "border border-orange-500/30",
            "shadow-lg shadow-orange-500/20",
            "transition-all duration-300",
            "hover:bg-orange-500/30",
            isCollapsed ? "rotate-180" : ""
          )}
        >
          <ChevronLeft className="h-4 w-4 text-orange-500" />
        </Button>
      </motion.div>

      <div className="relative flex flex-col flex-1 px-3 gap-4">
        {/* Logo Area */}
        <motion.div
          className={cn(
            "flex items-center px-2 mb-8",
            isCollapsed ? "justify-center" : "gap-2"
          )}
        >
          <AnimatePresence mode="wait">
            {isCollapsed ? (
              <motion.div
                key="collapsed"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Sparkles className="w-8 h-8 text-orange-500" />
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Logo theme={theme} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Main Menu */}
        <nav className="relative flex-1 space-y-1 py-4">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MenuButton
                item={item}
                isActive={activeTab === item.id}
                isCollapsed={isCollapsed}
                onClick={() => setActiveTab(item.id)}
              />
            </motion.div>
          ))}
        </nav>

        {/* Bottom Actions */}
        <motion.div
          className="mt-auto border-t border-foreground/5 pt-4 space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full group relative",
                    "rounded-[1.25rem] border-none",
                    isCollapsed ? "justify-center px-2" : "justify-start px-6",
                    "h-14 hover:bg-background/40",
                    "overflow-hidden backdrop-blur-sm"
                  )}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100"
                  />
                  <Settings className="w-6 h-6 text-foreground/80 group-hover:rotate-90 transition-transform duration-300" />
                  {!isCollapsed && (
                    <span className="ml-4 font-medium text-md text-foreground/80">Settings</span>
                  )}
                </Button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right" sideOffset={20} className="font-medium">
                  Settings
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>

          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative p-4 rounded-xl hover:bg-background/40 cursor-pointer group"
            >
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  scale: [1, 1.02, 1],
                  rotate: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <div className="relative flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 p-0.5 transform rotate-3">
                    <div className="w-full h-full rounded-xl bg-background p-0.5 overflow-hidden transform -rotate-3">
                      <motion.img
                        src="/api/placeholder/100/100"
                        alt="Profile"
                        className="w-full h-full rounded-xl object-cover"
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                  {/* Online status indicator with pulse animation */}
                  <motion.div
                    className="absolute -bottom-1 -right-1 w-4 h-4"
                    initial={false}
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-green-500 border-2 border-background" />
                    <div className="absolute inset-0 rounded-full bg-green-500 blur-sm opacity-50" />
                  </motion.div>
                </motion.div>

                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="relative">
                    <motion.p
                      className="font-medium text-base text-foreground group-hover:text-foreground/90"
                      whileHover={{ x: 2 }}
                    >
                      Alex Johnson
                    </motion.p>
                    <motion.div
                      className="absolute -top-4 -right-4 text-xs text-orange-500"
                      animate={{
                        opacity: [0, 1, 0],
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      ✨ Pro
                    </motion.div>
                  </div>
                  <motion.p
                    className="text-sm text-foreground/60"
                    whileHover={{ x: 2 }}
                  >
                    @alexjohnson
                  </motion.p>
                  
                  {/* Interactive status message */}
                  <motion.div
                    className="mt-2 text-xs text-foreground/40 flex items-center gap-1"
                    whileHover={{ x: 2 }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span>Available for projects</span>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Add keyframes for gradient animation
const styles = `
  @keyframes gradient-x {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .animate-gradient-x {
    animation: gradient-x 15s ease infinite;
  }
`;

// Add styles to document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default Sidebar;