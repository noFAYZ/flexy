import { Chip } from '@nextui-org/react'
import { BellRing, CrownIcon, MonitorSmartphoneIcon } from 'lucide-react'
import React from 'react'

const ProfileBadges = () => {
  return (
    <div className='flex flex-wrap justify-center  md:justify-end w-full'>
        <div className='flex  gap-4'>
      <Chip
        startContent={<BellRing size={18} />}
        variant="shadow"
      classNames={{
        base: "bg-gradient-to-br from-violet-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
        content: "drop-shadow shadow-black text-white",
      }}
        className='px-2'
      >
        Available
      </Chip>

      <Chip
        startContent={<MonitorSmartphoneIcon size={18} />}
        variant="shadow"
      classNames={{
        base: "bg-gradient-to-br from-lime-700 to-teal-700 border-small border-white/50 shadow-pink-500/30",
        content: "drop-shadow shadow-black text-white",
      }}
        className='px-2'
      >
        Online
      </Chip>

      <Chip
        startContent={<CrownIcon size={18} />}
        variant="shadow"
      classNames={{
        base: "bg-gradient-to-br from-amber-500 to-rose-700 border-small border-white/50 shadow-pink-500/30",
        content: "drop-shadow shadow-black text-white",
      }}
        className='px-2'
      >
        Top Rated Plus
      </Chip>

        </div>

  
        
    </div>
  )
}

export default ProfileBadges