import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@nextui-org/react";





import UserDropdownWidget from './UserDropdownWidget';
import BalanceWidget from './BalanceWidget';
import NotificationWidget from './NotificationWidget';
import SearchWidget from './SearchWidget';
import { MingcuteUser3Fill } from '../icons/icons';

export default function NavProfileDropdown({ authenticated, isLoggingIn, disableLogin, login }) {

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
      <motion.div 

        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div       className='flex items-center content-center bg-muted-foreground/20 rounded-[2.5rem] border-default border-medium gap-2 p-2'>
              {!authenticated ? <SearchWidget /> : <NotificationWidget />}
    {/*     <ThemeSwitch /> */}
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
        )}</div>
      </motion.div>
    );
  }


  