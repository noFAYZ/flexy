"use client";

import { Accordion, AccordionItem, Button, Card, CardBody, Chip, Input, Link, } from '@nextui-org/react'
import { Bot, ClipboardListIcon, InfoIcon, MessageSquare, ReceiptText } from 'lucide-react'
import React from 'react'

const ChatSidebarNav= () => {

  const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-medium",
    trigger: "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
    indicator: "text-medium",
    content: "text-small px-2",
  };

  const defaultContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";



  return (
    <div className="flex w-full flex-col">
   <Accordion
      showDivider={false}
      className="p-2 flex flex-col gap-1 w-full "
      variant="bordered"
      itemClasses={itemClasses}
    >
      <AccordionItem
        key="1"
        aria-label="Active Orders"
        startContent={<ClipboardListIcon className="text-primary" />}
        subtitle={
          <p className="flex">
            2 new orders <span className="text-primary ml-1">check now</span>
          </p>
        }
        title="Active Orders"
      >
        {defaultContent}
      </AccordionItem>

      <AccordionItem
        key="2"
        aria-label="Cancelled"
        classNames={{ subtitle: "text-danger" }}
        startContent={<ReceiptText className="text-danger" />}
        subtitle="Please, update now"
        title={
          <p className="flex gap-1 items-center">
            Cancelled
            <span className="text-default-400 text-xs">  <Chip
              size="sm"
              color="danger"
            >
              3
            </Chip>
            </span>
          </p>
        }
      >
        {defaultContent}
      </AccordionItem>
    </Accordion>
  </div>  
  )
}

export default ChatSidebarNav