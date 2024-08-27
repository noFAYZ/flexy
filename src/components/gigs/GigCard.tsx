import React from 'react'
import {Avatar, Badge, Button, Card, CardBody, CardFooter, Chip, Image, Popover, PopoverContent, PopoverTrigger, Tooltip, User} from "@nextui-org/react";
import { ImageSwiper } from '../ImageSwiper';
import { HandCoinsIcon, MessageSquareShareIcon, StarIcon } from 'lucide-react';
import { UserPopoverCard } from '../user/UserPopover';

const GigCard = (props:{item:any, index: any}) => {



  return (
   
        <Card shadow="sm" key={props?.index} isPressable onPress={() => console.log("item pressed")} className='rounded-3xl' >
            <CardBody className="overflow-visible p-0">
            <ImageSwiper  images={[props?.item.img,"https://picsum.photos/500/500", "https://picsum.photos/500/500", "https://picsum.photos/500/500"]} />

            <div className='flex px-2 pt-3 gap-2 align-middle items-center justify-between'>

            <Popover showArrow placement="bottom">
              <PopoverTrigger>
             
               
                <User   
                  as="button"
                  name="Zoe Lang"
                  description="Product Designer"
                  className="transition-transform"
                  
                  avatarProps={{
                    src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    isBordered: true,
                    
                  }}
                /> 

              </PopoverTrigger>
              <PopoverContent className="p-1">
                <UserPopoverCard />
              </PopoverContent>
            </Popover>



              <Chip startContent={<StarIcon size={18} />} color="secondary" className='align-middle items-center'>Flexy's Choice</Chip>

            </div>

            <div className='p-2 flex text-small font-normal text-left justify-between'>
            <p>{props?.item.title}</p>
        
            </div>
         
            </CardBody>
            <CardFooter className="flex gap-1 flex-col bg-foreground/5 items-stretch">

            <div className='flex text-sm justify-end'>
              starting from
            </div>
            <div className='flex justify-between'>
                <div className='flex items-center gap-1'> 
                  <StarIcon size={18} fill='orange' stroke='orange'/>
                  <p>4.5</p>(10)
                </div>

                <div className='flex  items-center gap-2 text-sm'> 

                  <Tooltip showArrow={true} content="Contact Now!">
                    <Button   size='sm' color='warning' variant='flat' className='text-sm rounded-full'
                    startContent={ <MessageSquareShareIcon size={18} />}>
                     Discuss
                    </Button>                  
                  </Tooltip>

                  

                  <Tooltip showArrow={true} content="Order Now!">
                    <Button  size='sm' color='success' variant='flat'
                      startContent={<HandCoinsIcon size={18} />}
                      className='text-sm '
                      >
                        {props?.item.price}
                    </Button>
                  </Tooltip>

                
                
                </div>
            </div>
         
         
            </CardFooter>
        </Card>

  )
}

export default GigCard