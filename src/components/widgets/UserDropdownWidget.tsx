import React, { useState } from 'react';
import { Button } from '@nextui-org/button';
import { Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem, Switch } from '@nextui-org/react';
import { useLogin, usePrivy } from '@privy-io/react-auth';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User,
  LogOut,
  Settings,
  HelpCircle,
  Wallet,
  Sun,
  Moon,
  Briefcase,
  UserCircle
} from 'lucide-react';
import NextLink from "next/link";
import { useTheme } from 'next-themes';
import { useOrbisStore } from '@/app/lib/orbis';

const UserDropdownWidget = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isFreelancer, setIsFreelancer] = useState(false);
  const { disconnect } = useOrbisStore();
  const { ready, authenticated, logout, user } = usePrivy();
  const { theme, setTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const { login } = useLogin({
    onComplete: () => setIsLoggingIn(false),
    onError: (error) => {
      console.error(error);
      setIsLoggingIn(false);
    },
  });

  const handleDisconnect = async () => {
    try {
      await disconnect();
      if (authenticated) await logout();
    } catch (err) {
      console.error('Failed to disconnect:', err);
    }
  };

  const handleViewSwitch = () => {
    setIsFreelancer(!isFreelancer);
  };

  const disableLogin = !ready || (ready && authenticated);

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <Dropdown
      placement="bottom-end"
      classNames={{
        base: "before:bg-default-200",
        content: "p-0 border-small border-default-200 bg-background/95 backdrop-blur-md dark:bg-default-100/50"
      }}
    >
      <DropdownTrigger>
        <div 
          className="relative cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
           whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          >
            <Avatar
              isBordered
              as="button"
              className="transition-all duration-100"
              size="lg"
              src="/images/150.jfif"
              imgProps={{ className: "object-cover opacity-100" }}
              fallback={
                <Button 
                  isIconOnly
                  className="bg-gradient-to-r from-pink-500 to-orange-600 text-white"
                  disabled={disableLogin}
                  onClick={() => login()}
                >
                  <User size={20} />
                </Button>
              }
            />
           
          </motion.div>
        </div>
      </DropdownTrigger>

      <DropdownMenu 
        aria-label="User menu"
        variant="flat"
        className="p-3 gap-2"
        itemClasses={{
          base: [
            "rounded-lg", 
            "text-default-600",
            "transition-all",
            "data-[hover=true]:bg-default-100",
            "data-[hover=true]:text-default-900",
            "dark:data-[hover=true]:bg-default-50",
            "py-3",
            "px-4"
          ]
        }}
      >
        <DropdownItem
          key="profile"
          className="h-20 gap-3"
          textValue="Profile Header"
        >
          <div className="flex gap-3 items-center">
            <Avatar
              size="md"
              src="/images/150.jfif"
              className="flex-shrink-0"
            />
            <div className="flex flex-col gap-1">
              <p className="text-small font-semibold">Jason Hughes</p>
              <p className="text-tiny text-default-500">@jason.hughes</p>
            </div>
          </div>
        </DropdownItem>

        <DropdownItem
          key="view-switcher"
          className="cursor-pointer"
          textValue="View Switcher"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              {isFreelancer ? (
                <Briefcase size={18} className="text-primary-500" />
              ) : (
                <UserCircle size={18} className="text-success-500 " />
              )}
              <span className="text-sm pr-2">
                {isFreelancer ? 'Freelancer' : 'Client'}
              </span>
            </div>
            <Switch
              size="sm"
              color={isFreelancer ? "primary" : "success"}
              isSelected={isFreelancer}
              onValueChange={handleViewSwitch}
              classNames={{
                wrapper: "group-data-[selected=true]:bg-primary-500",
              }}
            />
          </div>
        </DropdownItem>

        <DropdownItem
          key="wallet"
          startContent={<Wallet size={18} className="text-default-500" />}
          endContent={
            <span className="text-tiny text-success-500 font-medium">$2,450.00</span>
          }
          as={NextLink}
          href="/user/wallet"
        >
          Wallet
        </DropdownItem>

        <DropdownItem
          key="settings"
          as={NextLink}
          href="/user/settings"
          startContent={<Settings size={18} className="text-default-500" />}
        >
          Settings
        </DropdownItem>

        <DropdownItem
          key="theme"
          startContent={
            theme === 'dark' 
              ? <Moon size={18} className="text-default-500" />
              : <Sun size={18} className="text-default-500" />
          }
          onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </DropdownItem>

        <DropdownItem
          key="help"
          startContent={<HelpCircle size={18} className="text-default-500" />}
        >
          Help & Support
        </DropdownItem>

        <DropdownItem
          key="logout"
          onPress={handleDisconnect}
          className="text-danger group bg-danger-50 hover:bg-danger-600"
          startContent={
            <LogOut 
              size={18}
              className="text-danger group-data-[hover=true]:translate-x-1 transition-transform" 
            />
          }
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdownWidget;