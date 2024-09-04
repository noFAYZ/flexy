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

import { ReactComponent as FlexyLogo } from "/public/icons/logo.svg";
import { ReactComponent as DarkFlexyLogo } from "/public/icons/darklogo.svg";
import { ReactComponent as FlexyLogoIcon } from "/public/images/logo/flexyicon.svg";
import { ReactComponent as DarkFlexyLogoIcon } from "/public/images/logo/flexyicondark.svg";

import { useLogin, usePrivy, useWallets } from "@privy-io/react-auth";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import {
  Badge,
  Link,
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
} from "lucide-react";
import BalanceWidget from "./widgets/BalanceWidget";
import NotificationWidget from "./widgets/NotificationWidget";
import UserDropdownWidget from "./widgets/UserDropdownWidget";
import SearchWidget from "./widgets/SearchWidget";
import { FancySwitch } from "@omit/react-fancy-switch";
import { useRouter, usePathname } from "next/navigation";

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
    Dashboard: LayoutDashboardIcon,
    "Find Work": PickaxeIcon,
  };
  const dashboardTypes: string[] = ["Buyer", "Seller"];
  const [dashboardType, setdashboardType] = useState<string>();

  return (
    <div className="flex flex-col lg:px-24 md:px-6 shadow mb-5 pb-5 md:pb-5 lg:pb-10 z-40 ">
      <div className="sm:hidden z-50 flex justify-between px-6 pt-6">
        <NextUINavbar className="z-50  backdrop-blur-none bg-transparent backdrop-filter-none">
          <NavbarContent className="sm:hidden z-50">
            <NavbarMenuToggle />
          </NavbarContent>

          <NavbarMenu className="z-50">
            {siteConfig?.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={index}>
                <Link
                  className="w-full"
                  color={
                    index === 2
                      ? "warning"
                      : index === siteConfig?.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                  }
                  href="#"
                  size="lg"
                >
                  {item?.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </NextUINavbar>
      </div>

      <NextUINavbar
        className="flex relative justify-between  py-2 md:py-12 backdrop-blur-none bg-transparent backdrop-filter-none"
        maxWidth="full"
      >
        <div>
          <NavbarContent className="hidden lg:flex items-center justify-between  backdrop-blur-lg border-1 border-white/20 rounded-full shadow px-6 space-x-4 space-y-4 h-16">
            {/* Center - Logo */}
            <NavbarBrand className="flex-grow-0">
              <NextLink href="/" className="flex justify-center items-center">
                {theme == "dark" ? (
                  <DarkFlexyLogo width={90} height={45} />
                ) : (
                  <FlexyLogo width={90} height={45} />
                )}
                {/* <FlexyLogo width={110} height={55} /> */}
              </NextLink>
            </NavbarBrand>
          </NavbarContent>
          <NavbarContent className=" lg:hidden sm:flex items-center justify-between  backdrop-blur-lg border-1 border-white/20 rounded-full shadow px-4 space-x-4 space-y-4 h-16">
            {/* Center - Logo */}
            <NavbarBrand className="flex-grow-0">
              <NextLink href="/" className="flex justify-center items-center">
                {theme == "dark" ? (
                  <DarkFlexyLogoIcon width={40} height={45} />
                ) : (
                  <FlexyLogoIcon width={40} height={45} />
                )}
                {/* <FlexyLogo width={110} height={55} /> */}
              </NextLink>
            </NavbarBrand>
          </NavbarContent>
        </div>

        <div>
          <NavbarContent className=" items-center   bg-background/50 backdrop-blur-2xl border-1 border-white/20 rounded-full shadow px-6 py-2 hidden md:flex h-16">
            {/* Left side - Menu icons */}
            {siteConfig.navItems.map((item) => {
              const IconComponent = iconMap[item?.label] || LayoutDashboardIcon; // Default to Home if icon not found
              return (
                <Button
                  className="px-4 min-w-10 bg-transparent hover:bg-white/10 transition-colors"
                  radius="full"
                  variant="light"
                  key={item.href}
                  startContent={<IconComponent />}
                >
                  <NavbarItem isActive>
                    <NextLink href={item.href} className="text-foreground">
                      {item?.label}
                    </NextLink>
                  </NavbarItem>
                </Button>
              );
            })}
          </NavbarContent>
        </div>
        {/* Right side - Search, Login/Avatar, ThemeSwitch */}
        <div>
          <NavbarContent className="flex items-center gap-4 bg-background/50 backdrop-blur-2xl border-1 border-white/20 rounded-full shadow justify-end">
            {!authenticated ? <SearchWidget /> : <NotificationWidget />}

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
                <User size={22} />
              </Button>
            ) : (
              <>
                <BalanceWidget />
                <UserDropdownWidget />
              </>
            )}
          </NavbarContent>
        </div>
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
                  className="h-auto"
                  classNames={{
                    wrapper: "px-0",
                  }}
                >
                  <div className="flex flex-wrap gap-3">
                    <NavbarItem>
                      <NextLink href="/" className="font-medium">
                        <div className="flex gap-2 h-12 align-middle items-center rounded-full px-4 border-1 hover:bg-muted/95 hover:text-foreground">
                          {" "}
                          <LayoutDashboardIcon size={18} />
                          Dashboard
                        </div>
                      </NextLink>
                    </NavbarItem>

                    <NavbarItem>
                      <NextLink href="/inbox" className="font-medium">
                        <div className="flex gap-2 h-12 align-middle items-center rounded-full px-4 border-1 hover:bg-muted/95 hover:text-foreground">
                          {" "}
                          <HandCoinsIcon size={18} />
                          Payments
                        </div>
                      </NextLink>
                    </NavbarItem>

                    <Badge content="5200" color="danger">
                      <NavbarItem className="flex gap-2">
                        <NextLink href="/inbox" className="font-medium">
                          <div className="flex gap-2 h-12 align-middle items-center rounded-full px-4 border-1 hover:bg-muted/95 hover:text-foreground">
                            {" "}
                            <MessageCircleMoreIcon size={18} />
                            Messages
                          </div>
                        </NextLink>
                      </NavbarItem>
                    </Badge>

                    <NavbarItem className="flex gap-2">
                      <NextLink href="/inbox" className="font-medium">
                        <div className="flex gap-2 h-12 align-middle items-center rounded-full px-4 border-1 hover:bg-muted/95 hover:text-foreground">
                          {" "}
                          <PickaxeIcon size={18} />
                          Find Work
                        </div>
                      </NextLink>
                    </NavbarItem>
                  </div>
                </NextUINavbar>
              </div>
            </div>
            <div className=" ">
              <div className=" flex flex-wrap gap-4 h-12 w-full justify-center">
                <FancySwitch
                  value={"Buyer"}
                  onChange={(value: any) => setdashboardType(value)}
                  options={dashboardTypes}
                  defaultValue={"Buyer"}
                  className="flex rounded-full bg-muted p-2"
                  highlighterClassName="bg-primary rounded-full"
                  radioClassName={
                    "relative mx-2 flex focus:outline-none h-9 cursor-pointer items-center justify-center rounded-full px-3.5 text-sm font-medium transition-colors data-[checked]:text-primary-foreground"
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
      ) : (
        <>
      
        </>
      )}
    </div>
  );
};
