import { Building2Icon, ThumbsUpIcon, Users2Icon } from 'lucide-react'
import React from 'react'

const ProfileAbout = () => {
  return (
    <div className='flex flex-wrap py-5 gap-4 '>
       
        <div className='pb-10 text-lg  '>
                 Experienced blockchain developer with 5+ years of expertise in creating decentralized applications (dApps) and smart contracts. Proficient in Solidity, Ethereum, and various blockchain protocols. Passionate about leveraging blockchain technology to solve real-world problems and drive innovation.
                 
            <div className="space-y-6 lg:spat-10 pt-10 ">
              {/* Icon Block */}
              <div className="flex">
                <Building2Icon className="flex-shrink-0 mt-2 h-6 w-6" />
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-medium">
                    High quality Co-Living spaces
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    Our fully furnished spaces are designed and purpose-built
                    with Co-Living in mind, featuring high-end finishes and
                    amenities that go far beyond traditional apartment
                    buildings.
                  </p>
                </div>
              </div>
              {/* End Icon Block */}
              {/* Icon Block */}
              <div className="flex">
                <Users2Icon className="flex-shrink-0 mt-2 h-6 w-6" />
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-medium">
                    Fostering vibrant communities
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    Our passion is bringing people together. Beyond creating
                    beautiful spaces, we provide shared experiences.
                  </p>
                </div>
              </div>
              {/* End Icon Block */}
              {/* Icon Block */}
              <div className="flex">
                <ThumbsUpIcon className="flex-shrink-0 mt-2 h-6 w-6" />
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-medium">
                    Simple and all-inclusive
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    We worry about the details so that our residents don&apos;t
                    have to. From our online application process to simple,
                    all-inclusive billing we aim to make the living experience
                    as effortless as possible.
                  </p>
                </div>
              </div>
              {/* End Icon Block */}
            </div>
        </div>
   
        
    </div>
  )
}

export default ProfileAbout