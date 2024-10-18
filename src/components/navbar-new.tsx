"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import React, { useState } from "react";
import { useTheme } from "next-themes";

import { Button } from "@nextui-org/button";

import { ReactComponent as FlexyLogo } from "/public/images/logo/DeFlexy-dark.svg";
import { ReactComponent as DarkFlexyLogo } from "/public/images/logo/DeFlexy.svg";
import { ReactComponent as FlexyLogoIcon } from "/public/images/logo/DeFlexy-Icon.svg";
import { ReactComponent as DarkFlexyLogoIcon } from "/public/images/logo/DeFlexy-Icon3.svg";



import { useLogin, usePrivy, useWallets } from "@privy-io/react-auth";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import {
  Badge,
  Link,
  Navbar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
} from "@nextui-org/react";

import { ThemeSwitch } from "@/components/theme-switch";
import { Tooltip } from "@nextui-org/react";

// Import Lucide React icons
import {
  User,
  SettingsIcon,
  SlidersVerticalIcon,
  LayoutDashboardIcon,
  HandCoinsIcon,
  MessageCircleMoreIcon,
  PickaxeIcon,
  Search,
  CircleGauge,
  MessageCircle,
  SearchIcon,
  Store,
} from "lucide-react";
import BalanceWidget from "./widgets/BalanceWidget";
import NotificationWidget from "./widgets/NotificationWidget";
import UserDropdownWidget from "./widgets/UserDropdownWidget";
import SearchWidget from "./widgets/SearchWidget";
import { FancySwitch } from "@omit/react-fancy-switch";
import { useRouter, usePathname } from "next/navigation";
import MenuBar from "./widgets/middle-menu";
import { AntDesignMessageTwotone, IconParkTwotoneSearch, LetsIconsSearchDuotone, MageMessageDotsRound, MageMessageDotsRoundFill, MageMessageRound, MajesticonsDoorEnter, MingcuteUser3Fill, MingcuteUserSearchFill, SolarCardSearchBoldDuotone, SolarShopBold, TablerLayoutDashboardFilled } from "./icons/icons";
import { motion } from "framer-motion";

export const NavbarNew = () => {
  const [isLoggingIn, setisLoggingIn] = useState(false);
  const { ready, authenticated } = usePrivy();
  const { login } = useLogin({
    onComplete: () => {
      setisLoggingIn(false);
    },
    onError: (error) => {
      console.log(error);
      setisLoggingIn(false);
    },
  });

  const { theme } = useTheme();
  const pathname = usePathname();

  const disableLogin = !ready || (ready && authenticated);

  // Map of icons for nav items
  const iconMap = {
    "Hire Talent": MingcuteUserSearchFill,
    Dashboard: TablerLayoutDashboardFilled,
    "Find Work": IconParkTwotoneSearch,
    "Start Selling": SolarShopBold
  };
  const dashboardTypes: string[] = ["Buyer", "Seller"];
  const [dashboardType, setdashboardType] = useState<string>();

  return (
  
<>
       {pathname == "/coming-soon" ? <>
        <div className=" absolute w-full flex flex-col lg:px-24 md:px-6  bg-transparent">
       
       <NextUINavbar
         className="py-2 md:py-12  backdrop-filter-none bg-transparent shadow-none bg-opacity-100 backdrop-blur-0 justify-between"
         maxWidth="full"
        
       >
       
           {/* Left side - Logo */}
           <div className="w-[20%]">
             <NavbarContent className="hidden lg:flex items-center justify-between    space-x-4  ">
               <NavbarBrand className="flex-grow-0 ">
                 <NextLink href="/" className="flex justify-center items-center   rounded-full  border-0 shadow-none ">
                   {theme == "dark" ? (
                     <DarkFlexyLogo width={200} height={105} />
                   ) : (
                     <FlexyLogo width={200} height={105} />
                   )}
                 </NextLink>
               </NavbarBrand>
             </NavbarContent>
             <NavbarContent className="lg:hidden sm:flex items-center justify-between  ">
               <NavbarBrand className="">
                 <NextLink href="/" className="flex justify-center items-center backdrop-blur-lg  rounded-full shadow-lg  h-14">
                   {theme == "dark" ? (
                     <DarkFlexyLogo width={100} height={65} />
                   ) : (
                     <FlexyLogo width={100} height={65} />
                   )}
                 </NextLink>
               </NavbarBrand>
             </NavbarContent>
           </div>
 
           {/* Center - Menu */}
           <div className="hidden md:flex w-[60%] flex-grow-0 justify-center">
            
              {/*  <MenuBar siteConfig={siteConfig.navItems} iconMap={iconMap} /> */}
           
           </div>
 
           {/* Right side - Search, Login/Avatar, ThemeSwitch */}
           <div className="   flex justify-end items-center gap-4">
         
             <div className="flex items-center gap-4 bg-muted backdrop-blur-2xl border-default border-medium rounded-full shadow">
               {/*     <div className="relative">
               <motion.span
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.12 }}
                    className="flex items-center justify-center"
                  >
                <Button
           
                  className="h-12 px-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-start transition-all duration-500 ease-in-out text-md font-semibold "
                >
             
                    <MajesticonsDoorEnter width="24" color="white" />
                
                
                    Join Waitlist
                 
                </Button>
             </motion.span>
            </div>
         <ThemeSwitch />
              
                 <Button
                   isIconOnly
                   className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-md rounded-full hover:opacity-80 transition-opacity w-14 h-14"
                   variant="flat"
                   disabled={disableLogin}
                   onClick={() => {
                     setisLoggingIn(true);
                     login();
                   }}
                   isLoading={isLoggingIn}
                 >
                   <MingcuteUser3Fill height={'1.5rem'} />
                 </Button>
               */}
           
             </div>
           </div>
       
       </NextUINavbar>
 
       </div>
       
       </>  : 
       
       <>
  <div className="flex flex-col lg:px-24 md:px-6 mb-5 pb-5 md:pb-5 lg:pb-5 z-40 bg-transparent">
       
      <NextUINavbar
        className="py-2 md:py-12  backdrop-filter-none bg-transparent shadow-none bg-opacity-100 backdrop-blur-0"
        maxWidth="full"
      >
        <NavbarContent className="flex justify-between items-center w-full">
          {/* Left side - Logo */}
          <div className="w-[20%]">
            <NavbarContent className="hidden lg:flex items-center justify-between    space-x-4  ">
              <NavbarBrand className="flex-grow-0 ">
                <NextLink href="/" className="flex justify-center items-center   rounded-full  border-0 shadow-none ">
                  {theme == "dark" ? (
                    <DarkFlexyLogo width={200} height={105} />
                  ) : (
                    <FlexyLogo width={200} height={105} />
                  )}
                </NextLink>
              </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="lg:hidden sm:flex items-center justify-between  ">
              <NavbarBrand className="">
                <NextLink href="/" className="flex justify-center items-center bg-gradient-to-r from-pink-600 to-orange-600 backdrop-blur-lg  rounded-full shadow-lg px-4 h-14">
                  {theme == "dark" ? (
                    <DarkFlexyLogoIcon width={40} height={45} />
                  ) : (
                    <FlexyLogoIcon width={40} height={45} />
                  )}
                </NextLink>
              </NavbarBrand>
            </NavbarContent>
          </div>

          {/* Center - Menu */}
          <div className="hidden md:flex w-[60%] flex-grow-0 justify-center">
            {!authenticated ? (
              <MenuBar siteConfig={siteConfig.navItemsNoLoggedIn} iconMap={iconMap} />
            ) : (
              <MenuBar siteConfig={siteConfig.navItems} iconMap={iconMap} />
            )}
          </div>

          {/* Right side - Search, Login/Avatar, ThemeSwitch */}
          <div className=" w-[70%] md:w-[20%]  flex justify-end items-center gap-4">
            {authenticated && (
              <Popover showArrow placement="bottom" className="hidden md:flex">
                <PopoverTrigger className="hidden lg:flex">
                  <NavbarItem>
                    <Badge 
                      content="52" 
                      color="danger" 
                      shape="circle" 
                      placement="top-right"
                    >
                      <div className="bg-gradient-to-tr from-pink-500 to-yellow-500 rounded-full opacity-100 hover:opacity-80 w-14 h-14 flex items-center justify-center">
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
                  className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-md rounded-full hover:opacity-80 transition-opacity w-14 h-14"
                  variant="flat"
                  disabled={disableLogin}
                  onClick={() => {
                    setisLoggingIn(true);
                    login();
                  }}
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
        </NavbarContent>
      </NextUINavbar>

      {authenticated ? (
        <>
          {pathname == "/dashboard" ? (
            <>
              <div className="flex flex-wrap mt-10 px-6 gap-8 justify-between">
                <div className="flex flex-col">
                  <span>Welcome,</span>
                  <h1 className=" font-lufga text-4xl font-medium">
                    Faizan Asad
                  </h1>
                </div>

                <div className="flex flex-col">
                  <span>Courses</span>
                  <span className="flex align-text-bottom">
                    <h1 className=" font-lufga text-4xl font-medium">1,176</h1>
                    <p className=" align-bottom items-baseline">
                      total lessons
                    </p>
                  </span>
                </div>

                <div className="flex flex-col">
                  <span>Courses</span>
                  <h1 className=" font-lufga text-4xl font-medium">1,176</h1>
                </div>

                <div className="flex flex-col pr-10">
                  <span>Net Income</span>
                  <h1 className=" font-lufga text-4xl font-medium">$12,176</h1>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}

          {pathname == "/dashboard" ? (
          <div className="flex flex-wrap mt-10 px-6 gap-8 justify-between">
            <div className="flex justify-center md:justify-start">
              <div className="flex gap-4 align-middle items-center">
                <NextUINavbar
                  className="h-auto items-center"
                  classNames={{
                    wrapper: "px-0",
                  }}
                >
                  <div className="flex flex-wrap gap-3">
                    <NavbarItem>
                      <NextLink href="/" className="font-medium">
                        <div className="flex gap-2 h-12 align-middle items-center rounded-full p-6 border-medium border-default hover:bg-muted/95 hover:text-foreground">
                          {" "}
                          <LayoutDashboardIcon size={18} />
                          Dashboard
                        </div>
                      </NextLink>
                    </NavbarItem>

                    <NavbarItem>
                      <NextLink href="/inbox" className="font-medium">
                        <div className="flex gap-2 h-12 align-middle items-center rounded-full p-6 border-medium border-default hover:bg-muted/95 hover:text-foreground">
                          {" "}
                          <HandCoinsIcon size={18} />
                          Payments
                        </div>
                      </NextLink>
                    </NavbarItem>

                    <Badge content="5200" color="danger">
                      <NavbarItem className="flex gap-2">
                        <NextLink href="/inbox" className="font-medium">
                          <div className="flex gap-2 h-12 align-middle items-center rounded-full p-6 border-medium border-default hover:bg-muted/95 hover:text-foreground">
                            {" "}
                            <MessageCircleMoreIcon size={18} />
                            Messages
                          </div>
                        </NextLink>
                      </NavbarItem>
                    </Badge>

                    <NavbarItem className="flex gap-2">
                      <NextLink href="/inbox" className="font-medium">
                        <div className="flex gap-2 h-12 align-middle items-center rounded-full p-6 border-medium border-default hover:bg-muted/95 hover:text-foreground">
                          {" "}
                          <SearchIcon size={18} />
                          Find Work
                        </div>
                      </NextLink>
                    </NavbarItem>
                  </div>
                </NextUINavbar>
              </div>
            </div>
            <div className=" ">
              <div className=" flex flex-wrap gap-4 h-12 w-full justify-center items-center">
                <FancySwitch
                  value={"Buyer"}
                  onChange={(value: any) => setdashboardType(value)}
                  options={dashboardTypes}
                  defaultValue={"Buyer"}
                  className="flex rounded-full bg-muted p-2 border-medium border-default"
                  highlighterClassName="bg-primary rounded-full"
                  radioClassName={
                    "relative mx-2 flex focus:outline-none h-9 cursor-pointer items-center justify-center rounded-full px-3.5 text-sm font-medium transition-colors data-[checked]:text-primary-foreground "
                  }
                  highlighterIncludeMargin={true}
                />
                <Tooltip showArrow={true} content="Profile Setting">
                  <Button
                    isIconOnly
                    className="w-12 h-12 rounded-full border-none"
                    variant="flat"
                    aria-label="Settings"
                    size="md"
                  >
                    <SlidersVerticalIcon size={22} />
                  </Button>
                </Tooltip>

                <Popover placement="bottom">
                  <Tooltip showArrow={true} content="Settings">
                    <PopoverTrigger>
                      <Button
                        isIconOnly
                        className="w-12 h-12 rounded-full border-none"
                        variant="flat"
                        aria-label="Settings"
                        size="md"
                      >
                        <SettingsIcon size={22} />
                      </Button>
                    </PopoverTrigger>
                  </Tooltip>
                  <PopoverContent>
                    <div className="flex flex-col gap-4 py-2 px-2">
                      <span className="flex justify-between px-2 pt-4">
                        Switch Theme <ThemeSwitch />
                      </span>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>) : <></>}


        </>
      ) : (<>  </>)}
      </div>
      </>}


</>
    
  );
};
