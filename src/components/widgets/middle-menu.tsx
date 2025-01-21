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

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5
      }
    }
  };
  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };



  return (
    <motion.div 
    className=''
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
            <NavbarContent className=" items-center bg-gradient-to-r from-orange-700 via-orange-600 to-pink-600 gap-none border-0 rounded-full  gap-0 hidden md:flex ">
              {/* Left side - Menu icons */}
              {siteConfig.map((item, index) => {
                const IconComponent = iconMap[item?.label] || Star; // Default to Home if icon not found
                const isFirst = index === 0;
                const isLast = index === siteConfig.length - 1;
                return (
                  <Button
                    as={Link}
                    href={item.href}
                    className={`px-6 h-[4.5rem] min-w-10 text-white/90 bg-transparent
                    data-[hover=true]:bg-transparent/30 
                    transition-colors
                    ${isFirst ? 'rounded-l-full' : ''}
                    ${isLast ? 'rounded-r-full' : ''}
                    ${isActiveRoute(item.href) ? 'bg-transparent/30' : ''}
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
          </motion.div >
  );
};

export default MenuBar;