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
  import { usePrivy, useWallets} from '@privy-io/react-auth';
  
  import { siteConfig } from "@/config/site";
  import NextLink from "next/link";
  import {Switch} from "@nextui-org/react";

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
	SunIcon
  } from 'lucide-react';
import { shortenEthAddress } from "@/lib/utils";


  export const NavbarNew = () => {
	const {ready, authenticated, login, logout, user} = usePrivy();
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
	  Home: Home,
	  Docs: FileText,
	  About: Info,
	  Settings: Settings,
	};
  
	return (
	 
		<NextUINavbar 
		  maxWidth="sm" 
		  className="space-y-4 py-20 "
		 
		>
		  <NavbarContent className="flex items-center justify-between  bg-background/50 backdrop-blur-sm border-1 border-white/20 rounded-full shadow px-6 space-x-4 space-y-4">
        {/* Center - Logo */}
                    <NavbarBrand className="flex-grow-0">
                    <NextLink href="/" className="flex justify-center items-center">
					{theme =='dark' ? <DarkFlexyLogo width={110} height={55} /> : <FlexyLogo width={110} height={55} />}
                        {/* <FlexyLogo width={110} height={55} /> */}
                    </NextLink>
                    </NavbarBrand>
		  </NavbarContent>

          <NavbarContent className=" items-center   bg-background/50 backdrop-blur-2xl border-1 border-white/20 rounded-full shadow px-6 py-2 hidden md:flex"
		
		>
  

			{/* Left side - Menu icons */}

			  {siteConfig.navItems.map((item) => {
				const IconComponent = iconMap[item?.label] || Home; // Default to Home if icon not found
				return (
			
					<Button
					  className="px-4 min-w-10 bg-transparent hover:bg-white/10 transition-colors"
					  radius="full"  
					  variant="light"
                      key={item.href}
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

              
				<label className=' shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-full dark:bg-background/20 border-1 border-white/20  p-1'>
        <input
          type='checkbox'
          className='sr-only'
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`flex items-center space-x-[6px] rounded-full py-2 px-[18px] text-sm font-medium ${
            !isChecked ? 'text-primary light:bg-[#f4f7ff] dark:bg-[#000512]' : 'text-body-color'
          }`}
        >
         
          Light
        </span>
        <span
          className={`flex items-center space-x-[6px] rounded-full py-2 px-[18px] text-sm font-medium ${
            isChecked ? 'text-primary light:bg-[#f4f7ff] dark:bg-[#000512]' : 'text-body-color'
          }`}
        >
        
          Dark
        </span>
      </label>

				<div className="relative group gap-2">
                   $
				 <span className="px-1">{Number(balance?.data?.formatted).toFixed(2)}</span>  
                </div>

			  {!authenticated ? (
				<Button 
				  isIconOnly
				  className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-md rounded-full hover:opacity-80 transition-opacity w-14 h-14"
				  variant="flat"
                
				  disabled={disableLogin}
				  onClick={() => login()}
				>
				  <User size={22} />
				</Button>
			  ) : (
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
						variant="flat"
					  
						disabled={disableLogin}
						onClick={() => login()}
					  >
						<User size={22} />
					  </Button>}

					/>
				  </DropdownTrigger>
				  <DropdownMenu 
					aria-label="Profile Actions" 
					variant="flat"
					className=" dark:bg-white/10 backdrop-blur-md shadow-2xl rounded-xl p-2 border dark:border-gray-700"
				  >
					<DropdownItem key="profile" 
					className="h-14 gap-2"
					 startContent={<User size={16} />}
					 >
	
					  <p className="">{shortenEthAddress(user?.wallet?.address || '')}</p>
					</DropdownItem>
					<DropdownItem key="settings" startContent={<SettingsIcon size={16}/>}>Settings</DropdownItem>
					<DropdownItem key="system"
					 startContent={<ThemeSwitch />}
					>Switch</DropdownItem>
					<DropdownItem key="configurations">Configurations</DropdownItem>
					<DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
					<DropdownItem key="logout" color="danger" className="flex " onClick={() => logout()}>
					  <LogOutIcon /> 
					  <span>Log Out</span>
					</DropdownItem>
				  </DropdownMenu>
				</Dropdown>
			  )}
  
			 
			</NavbarContent>
  
		  <NavbarMenu>
			{/* ... (mobile menu items remain the same) ... */}
		  </NavbarMenu>
		</NextUINavbar>

	);
  };