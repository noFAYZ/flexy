"use client"
import React, { useState } from 'react';
import { Navbar, NavbarContent, Button, Tooltip, NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from 'next/navigation';
import { Star } from 'lucide-react';

const MenuBar = ({ siteConfig, iconMap }) => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState(null);

  const getIconComponent = (label) => {
    const IconComponent = iconMap[label] || iconMap.Default;
    if (!IconComponent) {
      console.error(`Icon not found for label: ${label}`);
      return null;
    }
    return IconComponent;
  };

  const centerIndex = Math.floor(siteConfig.length / 2);

  return (
    <div>
            <NavbarContent className=" items-center bg-gradient-to-r from-pink-600 to-orange-600 gap-none border-0 rounded-full  gap-0 hidden md:flex  ">
              {/* Left side - Menu icons */}
              {siteConfig.map((item, index) => {
                const IconComponent = iconMap[item?.label] || Star; // Default to Home if icon not found
                const isFirst = index === 0;
                const isLast = index === siteConfig.length - 1;
                return (
                  <Button
                    as={Link}
                    href={item.href}
                    className={`px-6 h-16 min-w-10 text-white/90 bg-transparent
                    data-[hover=true]:bg-transparent/30 
                    transition-colors
                    ${isFirst ? 'rounded-l-full' : ''}
                    ${isLast ? 'rounded-r-full' : ''}
                    group`}
                  
                  
                    variant="light"
                    key={item.href}
                    startContent={<IconComponent  />}
                  >
                    <NavbarItem isActive>
                      
                        {item?.label}
                 
                    </NavbarItem>
                  </Button>
                );
              })}
            </NavbarContent>
          </div>
  );
};

export default MenuBar;