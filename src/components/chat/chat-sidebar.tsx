"use client";

import Link from "next/link";
import { Inbox, MoreHorizontal, SearchIcon, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import { Message } from "@/config/chatData";
import { Avatar, Input } from "@nextui-org/react";
import { useState } from "react";


interface SidebarProps {
  isCollapsed: boolean;
  links: {
    name: string;
    messages: Message[];
    avatar: string;
    variant: "link" | "ghost";
  }[];
  onClick?: () => void;
  isMobile: boolean;
}

export function Sidebar({ links, isCollapsed, isMobile }: SidebarProps) {

  const [isActive, setIsActive] = useState(false);


  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full gap-4 p-2 w-full "
    >
      {!isCollapsed && (<>  
  

        <div className="flex justify-between  items-center">
          
          <div className="flex gap-2 items-center text-2xl px-4">
          
           <Inbox size={24} />
            
          </div>
        

          <div>
            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9 rounded-full"
              )}
            >
              <MoreHorizontal size={20} />
            </Link>

            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9"
              )}
            >
              <SquarePen size={20} />
            </Link>
          </div>
        </div>
            <div>
              <Input
          
                isClearable
                radius="lg"
                classNames={{
                  label: "text-black/50 dark:text-white/90",
                  input: [
                    "bg-transparent",
                    "text-black/90 dark:text-white/90",
                    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    
                  ],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
               ,
                    "bg-default-200/50",
                    "dark:bg-default/60",
              
                    "hover:bg-default-200/70",
                    "dark:hover:bg-default/70",
                    "group-data-[focus=true]:bg-default-200/50",
                    "dark:group-data-[focus=true]:bg-default/60",
                    "!cursor-text",
                  ],
                }}
                placeholder="Search Inbox..."
                startContent={
                  <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                }
              />
          </div>
        </>
      )}
      <nav className="grid gap-1  group-[[data-collapsed=true]]:justify-center ">
      
      {isCollapsed &&  (<div className="flex gap-2 items-center text-center text-2xl px-5 py-6">
          
          <Inbox size={28} />
           
         </div>
) }
      
        {links.map((link, index) =>
          isCollapsed ? (
            <TooltipProvider key={index}>
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className={cn(
                      buttonVariants({ variant: link.variant, size: "icon" }),
                      "h-11 w-11 md:h-16 md:w-16 rounded-full ",
                      link.variant === "link" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    ,'px-0',
                      isActive ? "bg-muted " : "hover:bg-muted hover:text-white",
                  )}
                  onClick={() => setIsActive(!isActive)}
                    
                  >
               
                    <Avatar className="flex justify-center items-center w-10 h-10"
                        src={link.avatar}>
                 
                    </Avatar>{" "}
                    <span className="sr-only">{link.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link
              key={index}
              href="#"
              className={cn(
                buttonVariants({ variant: link.variant, size: "lg" }),
                link.variant === "link" &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink",
                "justify-start gap-4 rounded-full px-4 my-2 hover:bg-muted "
              )}
            >
              <Avatar className="flex justify-center items-center w-10 h-10 "
              src={link.avatar}
              imgProps={{ className: "opacity-100" }}
              >
              
              </Avatar>
              <div className="flex flex-col max-w-28">
                <span>{link.name}</span>
                {link.messages.length > 0 && (
                  <span className="text-zinc-300 text-xs truncate ">
                    {link.messages[link.messages.length - 1].name.split(" ")[0]}
                    : {link.messages[link.messages.length - 1].message}
                  </span>
                )}
              </div>
            </Link>
          )
        )}
      </nav>
    </div>
  );
}