"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {  Settings, LogOut, LayoutDashboardIcon, UsersIcon, Briefcase, HelpCircle, LogIn, UserPlus, StarIcon } from 'lucide-react';


import { useTheme } from 'next-themes';
import { Tooltip } from '@nextui-org/react';
import {AntDesignMessageTwotone, HugeiconsAnalyticsUp, LetsIconsSearchDuotone, LsiconContractOutline, PhUserDuotone, SolarHomeAngleBroken, SolarWalletBoldDuotone, StashUsersCrownDuotone} from '../icons';
const MenuItem = ({ icon: Icon, label, isActive, onClick }) => {
  const { theme } = useTheme();
  const MenuItemContent = (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center justify-center w-fit gap-1 h-14 rounded-[2rem] cursor-pointer px-3 mx-2
                  ${isActive ? 'bg-gradient-to-r from-orange-500 to-pink-500' : 'bg-transparent'}`}
      onClick={onClick}
    >
      <div className="flex gap-2 items-center">
        <Icon size={24} height="24" width="24" className={`${isActive ? 'text-white' : theme === 'dark' ? 'text-white' : 'text-gray-800'}`} />
        <span className={`text-sm font-semibold pr-2 text-nowrap
                          ${isActive ? 'text-white' : theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
         {label}
        </span>
     
      </div>
     
    </motion.div>
  );

  return (
  
      <div >
        {MenuItemContent}
     
       
      </div>
  
  );
};

const NavMiddleMenu = (isloggedIn) => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const loggedInMenuItems = [
    { icon: LayoutDashboardIcon, label: 'Dashboard' },
    { icon: LetsIconsSearchDuotone, label: 'Find Jobs' },
    { icon: AntDesignMessageTwotone, label: 'Inbox' },
    { icon: HugeiconsAnalyticsUp, label: 'Payments' },
    {icon: StashUsersCrownDuotone, label: 'Community' },
    {icon: HugeiconsAnalyticsUp, label: 'Analytics' },
    {icon: Settings, label: 'Settings' },
  ];
  const menuItems = [
    { icon: SolarHomeAngleBroken, label: 'Home', href: '/' },
    { icon: LetsIconsSearchDuotone, label: 'Find Talent', href: '/browse-jobs' },

    { icon: StarIcon, label: 'Why DeFlexy?', href: '/freelancers' },
    { icon: Briefcase, label: 'Find Work', href: '/freelancers' },
    { icon: HelpCircle, label: 'Help & Support', href: '/support' },
 
  ];

  return (
    <motion.div
      className="  bg-muted-foreground/20 rounded-full p-3 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      <div className="flex items-center justify-center">
        {(isloggedIn ? loggedInMenuItems : menuItems).map((item) => (
          <MenuItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            isActive={activeItem === item.label}
            onClick={() => setActiveItem(item.label)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default NavMiddleMenu;