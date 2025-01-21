"use client";

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from "next-themes";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import NextLink from "next/link";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  Badge,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  User,
  LayoutDashboard as LayoutDashboardIcon,
  HandCoins as HandCoinsIcon,
  MessageCircleMore as MessageCircleMoreIcon,
  Search as SearchIcon,
  Settings2,
  Settings,
} from 'lucide-react';
import {
  MingcuteUser3Fill,
  AntDesignMessageTwotone,
  LetsIconsSearchDuotone,
} from "@/components/icons/icons";
import MenuBar from "@/components/widgets/middle-menu";
import BalanceWidget from "@/components/widgets/BalanceWidget";
import NotificationWidget from "@/components/widgets/NotificationWidget";
import UserDropdownWidget from "@/components/widgets/UserDropdownWidget";
import SearchWidget from "@/components/widgets/SearchWidget";

// Assuming these are imported correctly
import { ReactComponent as FlexyLogo } from "/public/images/logo/DeFlexy-light3.svg";
import { ReactComponent as DarkFlexyLogo } from "/public/images/logo/DeFlexy.svg";
import { ReactComponent as FlexyLogoIcon } from "/public/images/logo/DeFlexy-Icon.svg";
import { ReactComponent as DarkFlexyLogoIcon } from "/public/images/logo/DeFlexy-Icon3.svg";
import PageNavigation from './widgets/PageNavButtons';
import NavProfileDropdown from './widgets/nav-profile-widget';
import NavMiddleMenu from './widgets/nav-middle-menu';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SidebarSearch from './widgets/nav-left-menu';

const HIDE_NAVBAR_ROUTES = ['/coming-soon', '/login', '/onboarding'];

const Logo = ({ theme, isMobile = false }) => {
  const LogoComponent = theme === 'dark' ? (isMobile ? FlexyLogoIcon : DarkFlexyLogo) : (isMobile ? FlexyLogoIcon : FlexyLogo);
  const width = isMobile ? 60 : 200;
  const height = isMobile ? 60 : 70;

  return (
    <NextLink href="/" className={`flex justify-center items-center rounded-full ${isMobile ? '' : 'border-0 shadow-none'}`}>
      <LogoComponent width={width} height={height} className=' antialiased' />
    </NextLink>
  );
};

/* const NavbarRight = ({ authenticated, isLoggingIn, disableLogin, login }) => (
  <div className="w-[70%] md:w-[20%] flex justify-end items-center gap-4">

    <div className="flex items-center gap-4 bg-muted backdrop-blur-2xl border-default border-medium rounded-full shadow">
      {!authenticated ? <SearchWidget /> : <NotificationWidget />}

      {!authenticated ? (
        <Button
          isIconOnly
          className="bg-gradient-to-r from-pink-500 to-orange-600 text-white shadow-md rounded-full hover:opacity-80 transition-opacity w-14 h-14"
          variant="flat"
          disabled={disableLogin}
          onClick={login}
          isLoading={isLoggingIn}
        >
          <MingcuteUser3Fill height={'1.5rem'} />
        </Button>
      ) : (
        <>
          <BalanceWidget />
          <UserDropdownWidget />
        </>
      )}
    </div>
  </div>
); */

export const NavbarNew = ({isSidebar}) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { ready, authenticated } = usePrivy();
  const { login } = useLogin({
    onComplete: () => setIsLoggingIn(false),
    onError: (error) => {
      console.error(error);
      setIsLoggingIn(false);
    },
  });

  const { theme } = useTheme();
  const pathname = usePathname();

  if (HIDE_NAVBAR_ROUTES.includes(pathname)) {
    return null;
  }

  const disableLogin = !ready || (ready && authenticated);

  const iconMap = {
    "Hire Talent": User,
    Dashboard: LayoutDashboardIcon,
    "Find Work": LetsIconsSearchDuotone,
    "Start Selling": HandCoinsIcon
  };
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5
      }
    }
  };
  
  return (
    <div className="flex flex-col mx-auto mb-5 pb-5 md:pb-5 lg:pb-5 z-40 bg-transparent">
      <NextUINavbar
        className="backdrop-filter-none bg-transparent shadow-none bg-opacity-100 backdrop-blur-0 px-6" 
        maxWidth="full"
      >
        <NavbarContent className="flex justify-between items-center w-full">
          <div className="w-[20%]">

            {!isSidebar ?  
            <><NavbarContent className="hidden xl:flex items-center justify-between space-x-4">
              <NavbarBrand className="flex-grow-0">
                <Logo theme={theme} />
              </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="xl:hidden sm:flex items-center justify-between">
              <NavbarBrand>
                <Logo theme={theme} isMobile={true} />
              </NavbarBrand>
            </NavbarContent></> 
            
            : <>
            <SidebarSearch    onSearch={(value) => console.log('Searching:', value)}
        className="h-16" />
           {/*  <PageNavigation
              backHref="/dashboard"
              nextHref="/next-page"
              backLabel=""
              nextLabel=""
            /> */}
            </>}
           



          </div>

          <div className="hidden md:flex w-[60%] flex-grow-0 justify-center">
        
             <MenuBar 
              siteConfig={authenticated ? siteConfig.navItems : siteConfig.navItemsNoLoggedIn} 
              iconMap={iconMap} 
            /> 
          </div>
          <div   className='w-[20%] flex justify-end items-center gap-4'>
            {/*  <NavMiddleMenu isloggedIn={authenticated} />*/}
    {/*       <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            >
            <div       className='flex justify-center items-center content-center bg-muted-foreground/20 rounded-[2.5rem]   '>
            <Button
            as={Link}
            variant='light'
            href='/settings'
            className='bg-transparent hover:bg-none rounded-full group text-sm font-semibold  h-20 text-gray-800 w-full px-6'
            startContent={<Settings size={24} />}
            >
        
             Setting
            </Button>
           
            </div>
            </motion.div> */}

            <NavProfileDropdown
           authenticated={authenticated}
           isLoggingIn={isLoggingIn}
           disableLogin={disableLogin}
           login={() => {
             setIsLoggingIn(true);
             login();
           }}
          />
          </div>
          

        </NavbarContent>
      </NextUINavbar>

      
    </div>
  );
};




export default NavbarNew;