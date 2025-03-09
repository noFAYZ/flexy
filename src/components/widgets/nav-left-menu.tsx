import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Search, Command, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command as CommandPrimitive,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { LetsIconsSearchDuotone } from '../icons/icons';

interface CreativeSearchProps {
  onSearch?: (value: string) => void;
  className?: string;
}

const CreativeSearch = ({
  onSearch,
  className
}: CreativeSearchProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Search Trigger Button */}
      <Button
        onClick={() => setOpen(true)}
        variant="ghost"
        className={cn(
          "w-full group relative",
          "h-16 px-4",
          "bg-muted-foreground/20",
          "hover:bg-muted-foreground/30",
          "rounded-full",
          "flex items-center justify-between",
          "transition-all duration-100",
          className
        )}
      >
        {/* Left side content */}
        <div className="flex items-center gap-3">
          <div className="relative">
           
            <LetsIconsSearchDuotone className=" text-muted-foreground relative" />
          </div>
          <span className="text-medium text-muted-foreground">Search...</span>
        </div>

        {/* Right side content */}
        <div className="flex items-center gap-2">
          <kbd className="hidden md:inline-flex h-7 select-none items-center gap-1 rounded-md border bg-background p-1.5 font-mono text-[10px] font-medium opacity-100 hover:opacity-100">
            <span className="text-sm">⌘</span>K
          </kbd>
          <div className="h-7 w-[1px] bg-border/50 hidden md:block" />
          <ArrowRight className="w-4 h-4 text-muted-foreground opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
        </div>
      </Button>

      {/* Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Quick Actions">
            <div className="grid grid-cols-2 gap-2 p-2">
              {[
                { icon: Command, label: "Command Palette" },
                { icon: Sparkles, label: "New Project" },
              ].map((action, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  className={cn(
                    "h-24 flex-col justify-center items-center gap-2",
                    "rounded-xl border border-border/5",
                    "hover:bg-accent/50 hover:border-border/10",
                    "group"
                  )}
                >
                  <div className="relative">
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
                    <action.icon className="w-6 h-6 text-muted-foreground group-hover:text-orange-500 transition-colors duration-200" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
                    {action.label}
                  </span>
                </Button>
              ))}
            </div>
          </CommandGroup>

          <CommandSeparator />
          
          <CommandGroup heading="Recent Searches">
            {["Dashboard", "Analytics", "Settings"].map((item, i) => (
              <CommandItem
                key={i}
                onSelect={() => {
                  onSearch?.(item);
                  setOpen(false);
                }}
              >
                <Search className="w-4 h-4 mr-2" />
                {item}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CreativeSearch;