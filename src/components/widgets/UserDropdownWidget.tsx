import { Button } from '@nextui-org/button'
import { Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem } from '@nextui-org/react'
import { useLogin, usePrivy } from '@privy-io/react-auth'
import { User, SettingsIcon, HelpCircle, LogOutIcon } from 'lucide-react'
import React, { useState } from 'react'

const UserDropdownWidget = () => {
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

    const disableLogin = !ready || (ready && authenticated);

  return (
    <>
        <Dropdown placement="bottom-end" >
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
								className="dark:bg-white/10 shadow-2xl bg-background rounded-xl p-2  dark:border-gray-700 "
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
  )
}

export default UserDropdownWidget