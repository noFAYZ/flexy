import React from 'react';
import Head from 'next/head';
import { Chip, Avatar, Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { 
  Crown, 
  ArrowLeft,
  Bell,
  Settings as SettingsIcon 
} from "lucide-react";

// Metadata component for SEO and document head
export const SettingsMeta = () => (
  <Head>
    <title>Settings • deFlexy</title>
    <meta name="description" content="Manage your account settings, security, notifications, and preferences on deFlexy." />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <meta property="og:title" content="Account Settings • deFlexy" />
    <meta property="og:description" content="Manage your account settings, security, notifications, and preferences on deFlexy." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
  </Head>
);

// Page header component with breadcrumbs and user info
export const SettingsHeader = ({ userName = "Sophia Rodriguez", userRole = "Pro Member" }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-8"
  >
    {/* Top Navigation Bar */}
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2 text-sm">
        <Button
          isIconOnly
          variant="light"
          radius="full"
          size="sm"
          className="text-default-500"
        >
          <ArrowLeft size={18} />
        </Button>
        <nav className="flex items-center gap-2">
          <span className="text-default-500">Account</span>
          <span className="text-default-300">/</span>
          <span className="text-primary">Settings</span>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <Button
          isIconOnly
          radius="full"
          variant="flat"
          size="sm"
          className="bg-default-100"
        >
          <Bell size={18} />
        </Button>
        <Avatar
          size="sm"
          src="https://avatar.iran.liara.run/public"
          className="ring-2 ring-primary/10"
        />
      </div>
    </div>

    {/* Page Title and Description */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <SettingsIcon size={24} className="text-primary" />
          <h1 className="text-xl font-semibold">Account Settings</h1>
          <Chip
            startContent={<Crown size={14} className="text-warning" />}
            variant="flat"
            size="sm"
            className="bg-warning/10 text-warning"
          >
            {userRole}
          </Chip>
        </div>
        <p className="text-sm text-default-500">
          Manage your account settings and preferences
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 bg-gradient-to-r from-pink-500/10 to-orange-500/10 p-2 rounded-xl"
      >
        <Avatar
          size="sm"
          src="https://avatar.iran.liara.run/public"
          className="ring-2 ring-primary/10"
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium">{userName}</span>
          <span className="text-xs text-default-500">Last updated 2 days ago</span>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

// Utils for metadata generation
export const generateSettingsMetadata = (section) => {
  const baseTitle = "Account Settings • deFlexy";
  const sectionTitles = {
    profile: "Profile Settings",
    security: "Security Settings",
    notifications: "Notification Preferences",
    appearance: "Appearance Settings",
    billing: "Billing & Payments",
  };

  return {
    title: section ? `${sectionTitles[section]} - ${baseTitle}` : baseTitle,
    description: `Manage your ${section || 'account'} settings and preferences on deFlexy.`,
  };
};

// Example usage in your SettingsPage component:
const SettingsPageWrapper = ({ children }) => {
  return (
    <>
      <SettingsMeta />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6">
          <SettingsHeader />
          {children}
        </div>
      </div>
    </>
  );
};

// Add this to your globals.css:
const styles = `
  @layer utilities {
    .gradient-header {
      @apply bg-gradient-to-br from-background via-background/80 to-background/50;
    }
    
    .header-shadow {
      @apply shadow-sm backdrop-blur-md;
    }
  }
`;

export default SettingsPageWrapper;