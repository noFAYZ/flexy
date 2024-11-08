"use client";
import React, { useState } from 'react';
import { Card, CardBody, Avatar, Button, ScrollShadow } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Shield, Bell, Palette, CreditCard, Menu, X, ChevronRight,
  PackageIcon,
  FilePlus2,
  BugOff,
  Wallet2Icon
} from "lucide-react";

import { UserIcon } from '@/components/icons';
import { Metadata } from 'next';
import { HeroiconsOutlineStatusOffline } from '@/components/icons/icons';
import { IconCurrencyEthereum } from '@tabler/icons-react';
import { ProfileSettings } from './components/Profile/Profile';
import { SecuritySettings } from './components/Security/Security';
import { WalletSettings } from './components/Wallet/Wallet';
import { NotificationSettings } from './components/Noification/Notification';
import { AppearanceSettings } from './components/Appearance/Appearance';
import { BillingSettings } from './components/Billing/Billing';
import { FreelancerAvailabilitySettings } from './components/Availability/Availability';
import { ClientHiringSettings } from './components/Hiring/Hiring';
import { TokenGovernanceSettings } from './components/Governance/governance';

 const metadata: Metadata = {
  title: 'Account Settings',
};
const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "profile", icon: UserIcon, label: "Profile" },
    { id: "security", icon: Shield, label: "Security" },
    { id: "wallet", icon: Wallet2Icon, label: "Wallet" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "appearance", icon: Palette, label: "Appearance" },
    { id: "billing", icon: CreditCard, label: "Billing" },
    { id: "availability", icon: BugOff , label: "Availability" },
    { id: "hiring", icon: FilePlus2 , label: "Hiring" },
    { id: "governance", icon: IconCurrencyEthereum , label: "Token Governance" }
  ];

  const components = {
    profile: ProfileSettings,
    security: SecuritySettings,
    notifications: NotificationSettings,
    appearance: AppearanceSettings,
    billing: BillingSettings,
    wallet: WalletSettings,
    availability:FreelancerAvailabilitySettings,
    hiring: ClientHiringSettings,
    governance: TokenGovernanceSettings
  };

  return (
    
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:w-64">
          <Card className="bg-background/60 backdrop-blur-md shadow-medium rounded-[2.5rem] border-medium border-default sticky top-4">
            <CardBody className="p-0 overflow-hidden">
              <DesktopSidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                menuItems={menuItems}
              />
            </CardBody>
          </Card>
        </div>

        {/* Mobile Header & Content */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Mobile Header */}
          <div className="lg:hidden">
            <Card className="bg-background/60 backdrop-blur-md shadow-medium rounded-[2.5rem] border-medium border-default">
              <CardBody className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <Avatar
                      isBordered
                      src="https://avatar.iran.liara.run/public"
                      className="w-10 h-10"
                    />
                    <div>
                      <h3 className="font-semibold text-sm">Sophia Rodriguez</h3>
                      <p className="text-xs text-default-500">@sophiarodriguez</p>
                    </div>
                  </div>
                  <Button
                    isIconOnly
                    radius="full"
                    variant="light"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="bg-default-100"
                  >
                    {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                  </Button>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                  {isMobileMenuOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <ScrollShadow className="mt-4 -mx-2">
                        <div className="flex gap-2 p-2 overflow-x-auto scrollbar-hide">
                          {menuItems.map((item) => (
                            <MobileMenuItem
                              key={item.id}
                              isActive={activeSection === item.id}
                              icon={<item.icon size={16} />}
                              label={item.label}
                              onClick={() => {
                                setActiveSection(item.id);
                                setIsMobileMenuOpen(false);
                              }}
                            />
                          ))}
                        </div>
                      </ScrollShadow>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardBody>
            </Card>
          </div>

          {/* Main Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {React.createElement(components[activeSection])}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const DesktopSidebar = ({ activeSection, setActiveSection, menuItems }) => (
  <>
    <div className="p-6 text-center bg-gradient-to-r from-pink-500/10 to-orange-500/10 border-b border-divider/20">
      <Avatar
        isBordered
        src="https://avatar.iran.liara.run/public"
        className="w-16 h-16 text-large mx-auto mb-3 ring-2 ring-pink-500/20"
      />
      <h3 className="font-semibold text-base">Sophia Rodriguez</h3>
      <p className="text-xs text-default-500 mt-0.5">@sophiarodriguez</p>
    </div>
    
    <nav className="p-3">
      {menuItems.map((item) => (
        <MenuItem
          key={item.id}
          isActive={activeSection === item.id}
          icon={<item.icon size={18}  />}
          label={item.label}
          onClick={() => setActiveSection(item.id)}
        />
      ))}
    </nav>
  </>
);

const MenuItem = ({ isActive, icon, label, onClick }) => (
  <motion.button
    whileHover={{ x: 4 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`
      w-full flex items-center gap-3 px-4 py-2.5 mb-1 rounded-2xl text-sm
      transition-all duration-200 relative overflow-hidden group
      ${isActive 
        ? "text-white" 
        : "text-default-600 hover:bg-default-100"
      }
    `}
  >
    {isActive && (
      <motion.div
        layoutId="activeBg"
        className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
    )}
    <span className={`transition-colors duration-200 ${isActive ? "text-white" : "text-default-500 group-hover:text-pink-500"}`}>
      {icon}
    </span>
    <span>{label}</span>
    {isActive && (
      <motion.div
        layoutId="activeIndicator"
        className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      />
    )}
  </motion.button>
);

const MobileMenuItem = ({ isActive, icon, label, onClick }) => (
  <Button
    size="sm"
    radius="full"
    variant={isActive ? "flat" : "light"}
    onClick={onClick}
    className={`
      min-w-fit px-4 h-9
      ${isActive 
        ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white"
        : "bg-default-100"
      }
    `}
    startContent={icon}
  >
    {label}
  </Button>
);

export default SettingsPage;