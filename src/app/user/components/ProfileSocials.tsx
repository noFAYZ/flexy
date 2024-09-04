import { TwitterIcon } from '@/components/icons'
import { Button } from '@nextui-org/button'
import { Facebook, GlobeIcon, Instagram } from 'lucide-react'
import React from 'react'

const ProfileSocials = () => {
  return (

    <div className='flex justify-end w-full'> 
    <div className='flex gap-2'>
         <Button variant='ghost' isIconOnly className='rounded-full p-1'> <TwitterIcon size={16}/></Button>
        <Button variant='ghost' isIconOnly className='rounded-full p-1'> <Instagram  size={16}/></Button>
        <Button variant='ghost' isIconOnly className='rounded-full p-1'> <Facebook size={16}/></Button>
        <Button variant='ghost' isIconOnly className='rounded-full p-1'> <GlobeIcon size={16}/></Button>
    </div>
       
    </div>
  )
}

export default ProfileSocials