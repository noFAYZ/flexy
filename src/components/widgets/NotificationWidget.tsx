import { Dropdown, DropdownTrigger, NavbarItem, DropdownMenu, DropdownItem, Badge, Popover, PopoverTrigger, PopoverContent, Button } from '@nextui-org/react'
import {  BellDotIcon, User } from 'lucide-react'
import React from 'react'

const NotificationWidget = () => {
  return (
    <>
        <div className="flex relative group">

        <Popover showArrow placement="bottom">
        <PopoverTrigger>
        <NavbarItem className=" flex">
                <Badge 
                    content="52" 
                    color="danger" 
                    shape="circle" 
                    placement="top-right"
                >
                    <div className=" bg-gradient-to-tr from-pink-500 to-yellow-500 rounded-full opacity-100 hover:opacity-80  w-14 h-14" />
                    <div className="absolute inset-0 flex items-center justify-center  p-0">

                    <BellDotIcon size={22} className="text-white" />
                
                </div></Badge>
            </NavbarItem>
        </PopoverTrigger>
        <PopoverContent className="px-4 py-2 gap-2 flex flex-col">
            <p>Hello new message </p>
            <p>Hello new message </p>
            <p>Hello new message </p>
        </PopoverContent>
        </Popover>

            
            </div>
    </>
  )
}

export default NotificationWidget