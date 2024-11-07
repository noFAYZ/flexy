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
} from 'lucide-react';
import {
  MingcuteUser3Fill,
  AntDesignMessageTwotone,
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

const HIDE_NAVBAR_ROUTES = ['/coming-soon', '/login', '/onboarding'];

const Logo = ({ theme, isMobile = false }) => {
  const LogoComponent = theme === 'dark' ? (isMobile ? FlexyLogoIcon : DarkFlexyLogo) : (isMobile ? FlexyLogoIcon : FlexyLogo);
  const width = isMobile ? 60 : 200;
  const height = isMobile ? 60 : 105;

  return (
    <NextLink href="/" className={`flex justify-center items-center rounded-full ${isMobile ? '' : 'border-0 shadow-none'}`}>
      <LogoComponent width={width} height={height} className=' antialiased' />
    </NextLink>
  );
};

const NavbarRight = ({ authenticated, isLoggingIn, disableLogin, login }) => (
  <div className="w-[70%] md:w-[20%] flex justify-end items-center gap-4">
    {authenticated && (
      <Popover showArrow placement="bottom" className="hidden md:flex">
        <PopoverTrigger className="hidden lg:flex">
          <NavbarItem>
            <Badge content="52" color="danger" shape="circle" placement="top-right">
              <div className="bg-gradient-to-r from-pink-500 to-orange-600 rounded-full opacity-100 hover:opacity-80 w-14 h-14 flex items-center justify-center">
                <AntDesignMessageTwotone height={22} width={22} className="text-white" />
              </div>
            </Badge>
          </NavbarItem>
        </PopoverTrigger>
        <PopoverContent className="px-4 py-2 gap-2 flex flex-col">
          <p>Hello new message</p>
          <p>Hello new message</p>
          <p>Hello new message</p>
        </PopoverContent>
      </Popover>
    )}
    <div className="flex items-center gap-4 bg-muted backdrop-blur-2xl border-default border-medium rounded-full shadow">
      {!authenticated ? <SearchWidget /> : <NotificationWidget />}
      <ThemeSwitch />
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
);

export const NavbarNew = () => {
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
    "Find Work": SearchIcon,
    "Start Selling": HandCoinsIcon
  };

  return (
    <div className="flex flex-col xl:px-24 md:px-6 mb-5 pb-5 md:pb-5 lg:pb-5 z-40 bg-transparent">
      <NextUINavbar
        className="py-2 md:py-12 backdrop-filter-none bg-transparent shadow-none bg-opacity-100 backdrop-blur-0"
        maxWidth="full"
      >
        <NavbarContent className="flex justify-between items-center w-full">
          <div className="w-[20%]">
            <NavbarContent className="hidden xl:flex items-center justify-between space-x-4">
              <NavbarBrand className="flex-grow-0">
                <Logo theme={theme} />
              </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="xl:hidden sm:flex items-center justify-between">
              <NavbarBrand>
                <Logo theme={theme} isMobile={true} />
              </NavbarBrand>
            </NavbarContent>
          </div>

          <div className="hidden md:flex w-[60%] flex-grow-0 justify-center">
            <MenuBar 
              siteConfig={authenticated ? siteConfig.navItems : siteConfig.navItemsNoLoggedIn} 
              iconMap={iconMap} 
            />
          </div>

          <NavbarRight 
            authenticated={authenticated}
            isLoggingIn={isLoggingIn}
            disableLogin={disableLogin}
            login={() => {
              setIsLoggingIn(true);
              login();
            }}
          />
        </NavbarContent>
      </NextUINavbar>

      {authenticated && pathname === "/dashboard" && <DashboardHeader />}
    </div>
  );
};

const DashboardHeader = () => (
  <>
    <div className="flex flex-wrap mt-10 px-6 gap-8 justify-between">
      <WelcomeSection />
      <StatSection title="Courses" value="1,176" subtext="total lessons" />
      <StatSection title="Courses" value="1,176" />
      <StatSection title="Net Income" value="$12,176" />
    </div>
    <DashboardMenu />
  </>
);

const WelcomeSection = () => (
  <div className="flex flex-col">
    <span>Welcome,</span>
    <h1 className="font-lufga text-4xl font-medium">Faizan Asad</h1>
  </div>
);

const StatSection = ({ title, value, subtext }) => (
  <div className="flex flex-col">
    <span>{title}</span>
    <span className="flex align-text-bottom">
      <h1 className="font-lufga text-4xl font-medium">{value}</h1>
      {subtext && <p className="align-bottom items-baseline">{subtext}</p>}
    </span>
  </div>
);

const DashboardMenu = () => {
  const menuItems = [
    { icon: LayoutDashboardIcon, text: "Dashboard", link: "/" },
    { icon: HandCoinsIcon, text: "Payments", link: "/inbox" },
    { icon: MessageCircleMoreIcon, text: "Messages", link: "/inbox", badge: "5200" },
    { icon: SearchIcon, text: "Find Work", link: "/inbox" },
  ];

  return (
    <div className="flex flex-wrap mt-10 px-6 gap-8 justify-between">
      <div className="flex justify-center md:justify-start">
        <div className="flex gap-4 align-middle items-center">
          <NextUINavbar className="h-auto items-center" classNames={{ wrapper: "px-0" }}>
            <div className="flex flex-wrap gap-3">
              {menuItems.map((item, index) => (
                <NavbarItem key={index}>
                  <NextLink href={item.link} className="font-medium">
                    <div className="flex gap-2 h-12 align-middle items-center rounded-full p-6 border-medium border-default hover:bg-muted/95 hover:text-foreground">
                      <item.icon size={18} />
                      {item.text}
                    </div>
                  </NextLink>
                </NavbarItem>
              ))}
            </div>
          </NextUINavbar>
        </div>
      </div>
    </div>
  );
};

export default NavbarNew;