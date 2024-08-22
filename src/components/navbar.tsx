import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
  } from "@nextui-org/navbar";
  import React from "react";
  
  import { Button } from "@nextui-org/button";
  import { Link } from "@nextui-org/link";
  import { Input } from "@nextui-org/input";
  import {ReactComponent as FlexyLogo} from '/public/icons/logo.svg';
  import { usePrivy} from '@privy-io/react-auth';
  
  import { siteConfig } from "@/config/site";
  import NextLink from "next/link";
  
  import { ThemeSwitch } from "@/components/theme-switch";
  import { Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem, Tooltip } from "@nextui-org/react";
  
  // Import Lucide React icons
  import { 
	Home, 
	FileText, 
	Info, 
	Settings, 
	Search, 
	User 
  } from 'lucide-react';
  
  export const Navbar = () => {
	const {ready, authenticated, login} = usePrivy();
	const disableLogin = !ready || (ready && authenticated);
  
	// Map of icons for nav items
	const iconMap = {
	  Home: Home,
	  Docs: FileText,
	  About: Info,
	  Settings: Settings,
	};
  
	return (
	  <div className="flex justify-center items-center w-full py-4">
		<NextUINavbar 
		  maxWidth="xl" 
		  className="bg-background/50 backdrop-blur-2xl border-1 border-white/20 rounded-full shadow-xl px-6 max-w-4xl"
		>
		  <NavbarContent className="flex items-center justify-between w-full">
			{/* Left side - Menu icons */}
			<NavbarContent className="flex gap-2">
			  {siteConfig.navItems.map((item) => {
				const IconComponent = iconMap[item?.label] || Home; // Default to Home if icon not found
				return (
					<Tooltip 
					key={item.href}
					content={item.label}
					placement="bottom"
					delay={0}
					closeDelay={0}
					className="capitalize px-2"
				  >
					<Button
					  className="p-0 min-w-10 bg-transparent hover:bg-white/10 transition-colors"
					  radius="full"  
					  variant="light"
					>
					  <NavbarItem>
						<NextLink href={item.href} className="text-foreground">
						  <IconComponent size={20} className="text-gray-600 dark:text-gray-300"/>
						</NextLink>
					  </NavbarItem>
					</Button>
				  </Tooltip>
				);
			  })}
			</NavbarContent>
  
			{/* Center - Logo */}
			<NavbarBrand className="flex-grow-0">
			  <NextLink href="/" className="flex justify-center items-center">
				<FlexyLogo width={100} height={50} />
			  </NextLink>
			</NavbarBrand>
  
			{/* Right side - Search, Login/Avatar, ThemeSwitch */}
			<NavbarContent className="flex items-center gap-4">
			  <Input
				classNames={{
				  base: "max-w-[10rem] h-9",
				  mainWrapper: "h-full",
				  input: "text-small",
				  inputWrapper: "h-full font-normal text-default-500 bg-white/10 dark:bg-gray-800/30 hover:bg-white/20 dark:hover:bg-gray-800/40 transition-colors rounded-full",
				}}
				placeholder="Search..."
				size="sm"
				startContent={<Search size={16} className="text-gray-400" />}
				type="search"
			  />
  
			  {!authenticated ? (
				<Button 
				  isIconOnly
				  className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-md rounded-full hover:opacity-80 transition-opacity"
				  variant="flat"
				  disabled={disableLogin}
				  onClick={() => login()}
				>
				  <User size={18} />
				</Button>
			  ) : (
				<Dropdown placement="bottom-end">
				  <DropdownTrigger>
					<Avatar
					  isBordered
					  as="button"
					  className="transition-transform hover:scale-110"
					  color="secondary"
					  name="Jason Hughes"
					  size="sm"
					  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
					/>
				  </DropdownTrigger>
				  <DropdownMenu 
					aria-label="Profile Actions" 
					variant="flat"
					className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-2xl rounded-xl p-2 border border-gray-200 dark:border-gray-700"
				  >
					<DropdownItem key="profile" className="h-14 gap-2">
					  <p className="font-semibold">Signed in as</p>
					  <p className="font-semibold">zoey@example.com</p>
					</DropdownItem>
					<DropdownItem key="settings">My Settings</DropdownItem>
					<DropdownItem key="team_settings">Team Settings</DropdownItem>
					<DropdownItem key="analytics">Analytics</DropdownItem>
					<DropdownItem key="system">Switch<ThemeSwitch /></DropdownItem>
					<DropdownItem key="configurations">Configurations</DropdownItem>
					<DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
					<DropdownItem key="logout" color="danger">
					  Log Out
					</DropdownItem>
				  </DropdownMenu>
				</Dropdown>
			  )}
  
			  <ThemeSwitch />
			</NavbarContent>
		  </NavbarContent>
  
		  <NavbarMenu>
			{/* ... (mobile menu items remain the same) ... */}
		  </NavbarMenu>
		</NextUINavbar>
	  </div>
	);
  };