import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
  } from "@nextui-org/navbar";
  import React, { useState } from "react";
  import { useTheme } from "next-themes";

  import { Button } from "@nextui-org/button";
  import { Link } from "@nextui-org/link";
  import { Input } from "@nextui-org/input";
  import {ReactComponent as FlexyLogo} from '/public/icons/logo.svg';
  import {ReactComponent as DarkFlexyLogo} from '/public/icons/darklogo.svg';
  import { useLogin, usePrivy, useWallets} from '@privy-io/react-auth';
  
  import { siteConfig } from "@/config/site";
  import NextLink from "next/link";
  import {Badge, Switch} from "@nextui-org/react";

  import { ThemeSwitch } from "@/components/theme-switch";
  import { Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem, Tooltip } from "@nextui-org/react";
  import { useBalance, UseBalanceReturnType } from 'wagmi'


  // Import Lucide React icons
  import { 
	Home, 
	FileText, 
	Info, 
	Settings, 
	Search, 
	User, 
	LogOutIcon,
	SettingsIcon,
	MoonIcon,
	SunIcon,
	HelpingHand,
	HelpCircle,
	AlertOctagon,
	BellDotIcon,
	Settings2Icon,
	SlidersVerticalIcon,
	LayoutDashboardIcon,
	HandCoinsIcon,
	MessageSquareCodeIcon,
	MessageCircleMoreIcon,
	PickaxeIcon
  } from 'lucide-react';
import { shortenEthAddress } from "@/lib/utils";


  export const NavbarNew = () => {

	const [isLoggingIn, setisLoggingIn] = useState(false)
	const {ready, authenticated, logout, user,} = usePrivy();
	const {login} = useLogin({
		
		onComplete: () => {
			setisLoggingIn(false)
		},
		onError: (error) => {
		  console.log(error);
		  setisLoggingIn(false)
		},
	  });
	const {wallets} = useWallets();
	const { theme } = useTheme();
	const [isChecked, setIsChecked] = useState(false)


	const disableLogin = !ready || (ready && authenticated);

	const balance =  useBalance({
			address: wallets[0]?.address as `0x${string}`,
			token: "0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582",
			chainId: 80002
			})
	const handleCheckboxChange = () => {
		setIsChecked(!isChecked)
		}

  
	// Map of icons for nav items
	const iconMap = {
	  "Dashboard": LayoutDashboardIcon,
	  "Find Work": PickaxeIcon,
	};
  
	return (
	 	<div className="flex flex-col lg:px-32 md:px-24 shadow pb-10  ">
			
			<div className="flex justify-end p-6">	<ThemeSwitch /></div>

			<NextUINavbar 
			maxWidth="sm" 
			className="space-y-4 py-12 "
			
			>
			
			<NavbarContent className="flex items-center justify-between  bg-background/50 backdrop-blur-lg border-1 border-white/20 rounded-full shadow px-6 space-x-4 space-y-4 h-16">
			{/* Center - Logo */}
						<NavbarBrand className="flex-grow-0">
						<NextLink href="/" className="flex justify-center items-center">
						{theme =='dark' ? <DarkFlexyLogo width={90} height={45} /> : <FlexyLogo width={90} height={45} />}
							{/* <FlexyLogo width={110} height={55} /> */}
						</NextLink>
						</NavbarBrand>
			</NavbarContent>

			<NavbarContent className=" items-center   bg-background/50 backdrop-blur-2xl border-1 border-white/20 rounded-full shadow px-6 py-2 hidden md:flex h-16"
			
			>
	

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

				{/* Right side - Search, Login/Avatar, ThemeSwitch */}
			<NavbarContent className="flex items-center gap-4 bg-background/50 backdrop-blur-2xl border-1 border-white/20 rounded-full shadow justify-end">
				{!authenticated ? 
					<>  
					<div className="relative group">
							<Input
							classNames={{
								base: "w-14 h-14 group-hover:w-[12rem] transition-all duration-300",
								mainWrapper: "h-full",
								input: "text-lg opacity-0 group-hover:opacity-100 transition-opacity",
								inputWrapper: "h-full font-normal text-default-500 bg-white/10 dark:bg-gray-800/30 hover:bg-white/20 dark:hover:bg-gray-800/40 transition-colors rounded-full",
							}}
						
							size="sm"
							type="search"
							/>
							<Search size={22} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 group-hover:left-3 transition-all duration-300" />
						</div>
					</> : 
					<>
					<div className="relative group">

						<Dropdown placement="bottom-end" backdrop="blur">
						<DropdownTrigger>
						<NavbarItem className=" flex">
							<Badge 
								content="52" 
								color="danger" 
								shape="circle" 
								placement="top-right"
							>
								<div className=" bg-gradient-to-tr from-pink-500 to-yellow-500 rounded-full opacity-100 hover:opacity-80 transition-opacity w-14 h-14" />
								<div className="absolute inset-0 flex items-center justify-center  p-0">
						
								<BellDotIcon size={22} className="text-white" />
							
							</div></Badge>
						</NavbarItem>
						</DropdownTrigger>
						<DropdownMenu 
							aria-label="Profile Actions" 
							variant="flat"
							className=" dark:bg-white/10 backdrop-blur-md shadow-2xl rounded-xl p-2 border dark:border-gray-700"
						>
							<DropdownItem key="profile" 
							className="gap-2"
							startContent={<User size={16} />}
							>
			
							<p className="">Profile</p>
							</DropdownItem>
				
						</DropdownMenu>
						</Dropdown>
		
					</div>
					</>}
				

				{!authenticated ? (
					<Button 
					isIconOnly
					className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-md rounded-full hover:opacity-80 transition-opacity w-14 h-14"
					variant="flat"
					
					disabled={disableLogin}
					onClick={() => {
						setisLoggingIn(true)
						login()}}
					isLoading={isLoggingIn}
					>
					<User size={22} />
					</Button>
				) : (
				<>

					<div className="relative group gap-2">
					$
					<span className="px-1">{Number(balance?.data?.formatted).toFixed(2)}</span>  
					</div>
					
					<Dropdown placement="bottom-end" backdrop="blur">
						<DropdownTrigger>
							<Avatar
							isBordered
							as="button"					  
							
							name="Jason Hughes"
							size="lg"
							src="/images/150.jfif"
							imgProps={{
									className :"!opacity-100"
								}}
							fallback={<Button 
								isIconOnly
								className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-md rounded-full hover:opacity-80 transition-opacity w-14 h-14 opacity-100"
								variant="solid"
							
								disabled={disableLogin}
								onClick={() =>{ 
									
									login()}
								}
							>
								<User size={22} />
							</Button>}

							/>
						</DropdownTrigger>
						<DropdownMenu 
							aria-label="Profile Actions" 
							variant="solid"
							className="dark:bg-white/10 shadow-2xl bg-background rounded-xl p-2 border dark:border-gray-700 "
						>
							<DropdownItem key="profile" 
							className="gap-2"
							startContent={<User size={16} />}
							>
			
							<p className="">Profile</p>
							</DropdownItem>
							<DropdownItem key="settings" startContent={<SettingsIcon size={16}/>}>Settings</DropdownItem>
					
							<DropdownItem key="help_and_feedback"
							startContent={  <HelpCircle  size={16}/> }>Support</DropdownItem>
							<DropdownItem key="logout" color="danger" className="flex bg-pink-200 !dark:bg-pink-950" onClick={() => logout()}
								startContent={  <LogOutIcon  size={16}/> }>
							
							<span>Log Out</span>
							</DropdownItem>
						</DropdownMenu>
						</Dropdown>
					</>
					
				)}
	
				
			</NavbarContent>
		
			<NavbarMenu>
				{/* ... (mobile menu items remain the same) ... */}
			</NavbarMenu>

			</NextUINavbar>

			<div className="flex flex-wrap mt-10 px-6 gap-8 justify-between">

				<div className="flex flex-col">
					<span>Welcome,</span>
					<h1 className=" font-lufga text-4xl font-medium">Faizan Asad</h1>
				</div>

				<div className="flex flex-col">
					<span>Courses</span>
					<span className="flex align-text-bottom">
						<h1 className=" font-lufga text-4xl font-medium">1,176</h1>
					<p className=" align-bottom items-baseline">total lessons</p>
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

			<div className="flex flex-wrap mt-10 px-6 gap-8 justify-between">

				<div className="flex flex-wrap gap-4">

					<Button className="rounded-full border-1 dark:hover:bg-gray-50 hover:dark:text-black"  variant="bordered"  startContent={<LayoutDashboardIcon size={18} />}>
						Dashboard
					</Button> 
					<Button className="rounded-full px-2 border-1"  variant="bordered" startContent={<HandCoinsIcon size={18} />}>
						Payments
					</Button> 
					<Button className="rounded-full p-2 border-1"  variant="bordered" startContent={<MessageCircleMoreIcon size={18} />}>
						Messages
					</Button> 
					<Button className="rounded-full p-2 border-1"  variant="bordered" startContent={<PickaxeIcon size={18} />}>
						Find Work
					</Button> 
			
				</div>

				<div className="flex flex-wrap gap-4">
			
					<Button isIconOnly className="rounded-full border-none" variant="flat" aria-label="Settings" size="md">
						<SlidersVerticalIcon size={22} />
					</Button> 
					<Button isIconOnly className="rounded-full border-none" variant="flat" aria-label="Settings" size="md">
						<SettingsIcon size={22} />
					</Button> 
				</div>


			</div>
		
		</div>

	);
  };