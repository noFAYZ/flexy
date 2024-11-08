import { TwitterIcon } from '@/components/icons'
import { Button } from '@nextui-org/button'
import { Facebook, GlobeIcon, Instagram } from 'lucide-react'
import React from 'react'

const ProfileSocials = () => {
  return (

    <div className='flex justify-center  w-full'> 
    <div className='flex gap-2'>
         <Button  isIconOnly className='rounded-3xl p-1 bg-blue-500 hover:bg-blue-800 text-white'> <TwitterIcon size={16}/></Button>
        <Button  isIconOnly className='rounded-3xl p-1 bg-red-500 hover:bg-red-800 text-white'> <Instagram  size={16}/></Button>
        <Button isIconOnly className='rounded-3xl p-1 bg-blue-600 hover:bg-blue-800 text-white'> <Facebook size={16}/></Button>
        <Button  isIconOnly className='rounded-3xl p-1'> <GlobeIcon size={16}/></Button>
    </div>
       
    </div>
  )
}

export default ProfileSocials