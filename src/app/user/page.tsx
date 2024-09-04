"use client";
import { Avatar, Badge, Progress, Tab, Tabs, Tooltip } from '@nextui-org/react'
import { BadgeCheck, BriefcaseBusiness, MapPinIcon, StarIcon, UserRound } from 'lucide-react'
import React from 'react'
import {Button} from "@nextui-org/react";

import { ExpandableCardDemo } from './components/ProjectsExpandable'
import ProfileMenu from './components/ProfileMenu';
import { StarRating } from '@/components/rating';
import ProfileSocials from './components/ProfileSocials';
import ProfileBadges from './components/ProfileBadges';
import ProfileAbout from './components/ProfileAbout';
import ProfileExperience from './components/ProfileExperience';
import { ProfileDock } from './components/ProfileDock';

const UserPage = () => {
  return (
    <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      
      <div className='flex justify-between max-w-full bg-gradient-to-r from-pink-950  to-violet-700 rounded-2xl py-2 mb-4 px-6 '>
        
        <Progress
        size="md"
        radius="md"
        classNames={{
          base: "max-w-xl",
          track: "drop-shadow-md ",
          indicator: "bg-gradient-to-r from-orange-500 to-indigo-500",
          label: "tracking-wider font-medium text-default-600",
          value: "text-foreground/60",
        }}
        label="Profile completeness"
        value={65}

        />  
    <div className='flex gap-4 content-center  items-center text-center align-middle'>
     
       <span className='text-foreground/60 content-center  items-center text-center align-middle'>65%</span>
<Button variant='flat'>Complete</Button>

    </div>
  
     </div>

      <div className='flex flex-col lg:flex-row justify-between gap-4'>
        <div className='flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full lg:w-auto'>  
          <Badge content="online" color="success" size="sm" placement="top-left" className='shadow'>
            <Avatar isBordered color="success" src="https://i.pravatar.cc/150" className="w-32 h-32 sm:w-40 sm:h-40 text-large" />
          </Badge>
          <div className='flex flex-col justify-between mt-4 sm:mt-0 text-center sm:text-left'>
            <div className='flex flex-col'> 
              <span className='flex gap-2 text-2xl sm:text-3xl font-medium align-baseline items-center justify-center sm:justify-start'>
                Faizan Asad 
                <Tooltip showArrow={true} content="ID verified" className="bg-success-50 rounded-full" placement={'top-start'}>
                  <span className='bg-success rounded-full p-[1px]'>
                    <BadgeCheck className='p-0' stroke='background'/>
                  </span>
                </Tooltip>
              </span>
              <span className='text-sm font-medium text-gray-400 pb-2 pt-0'>
                @fayzan
              </span>
              <span className='text-md'> 
                Full Stack Developer/ Blockchain Dev
              </span>
            </div>
            <div className='mt-2 flex flex-col items-center sm:items-start'>
              <StarRating isInteractive={false} size={18} initialRating={4.5}/> 
              <span className='flex gap-1 align-baseline items-center text-sm mt-2'> 
                <MapPinIcon size={18}/> Gilgit, Pakistan 
              </span>
            </div>
          </div>
        </div>

        <div className='flex flex-col flex-wrap justify-between gap-4 w-full lg:w-auto'>
          <ProfileBadges />
          <ProfileMenu />
          <ProfileSocials />
        </div>
      </div>

      <div className="flex w-full flex-wrap flex-col py-5 px-2">
      <Tabs aria-label="Options" color="primary" variant="underlined" className='flex justify-between'>
        <Tab
          key="about"
          title={
            <div className="flex items-center space-x-2 justify-center">
              <UserRound/>
              <span>About</span>
            </div>
          }
        >
<ProfileAbout />

        </Tab>
        <Tab
          key="experience"
          title={
            <div className="flex items-center space-x-2 justify-center">
              <BriefcaseBusiness/>
              <span>Experience</span>
            </div>
          }
        >   <ProfileExperience /></Tab>
        <Tab
          key="videos"
          title={
            <div className="flex items-center space-x-2">
              <StarIcon/>
              <span>Reviews</span>
            </div>
          }
        ></Tab>
      </Tabs>
    </div>  
        
      
   
      
      <ProfileDock />
    </div>
  )
}

export default UserPage