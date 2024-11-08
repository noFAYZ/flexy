"use client";
import React, { useState } from 'react';
import { Card, CardBody, Avatar, Switch, Chip, Button, Input, Tabs, Tab, Progress, Modal, ModalContent, ModalHeader, ModalBody,  ModalFooter, RadioGroup, Select, SelectItem } from "@nextui-org/react";
import {
  Settings,
  User,
  Shield,
  Bell,
  Palette,
  CreditCard,
  Key,
  Globe,
  Mail,
  MessageSquare,
  DollarSign,
  Lock,
  Activity,
  Eye,
  X,
  Check,
  Save,
  Download,
  Trash2,
  Plus,
  Pencil,
  Clock,
  Star,
  Code,
  Award,
  Briefcase,
  ExternalLink,
  ArrowDownLeft,
  ArrowUpRight,
  PiggyBankIcon,
  Radio,
  BanknoteIcon,
  Calendar,
  Filter,

  PieChart,
  TrendingDown,
  TrendingUp
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { RangeSlider } from '@/components/RangeSlider';
import { useTheme } from 'next-themes';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';



const SidebarItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 
      ${active 
        ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white" 
        : "hover:bg-foreground/10"
      }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);








  

  
  // ClientHiringSettings.jsx

  
  // TokenGovernanceSettings.jsx



  
  export const AchievementCard = ({ icon, title, description }) => (
    <Card className="bg-default-50 hover:bg-default-100 transition-colors">
      <CardBody className="p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            {React.cloneElement(icon, { size: 20, className: "text-primary" })}
          </div>
          <div>
            <h4 className="font-medium">{title}</h4>
            <p className="text-sm text-default-500">{description}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
  


  

  
  // Animation wrapper for cards
  export const AnimatedCard = ({ children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
  
  // Section Header component
  export const SectionHeader = ({ title, description }) => (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-semibold bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
        {title}
      </h2>
      <p className="text-foreground/60">{description}</p>
    </div>
  );
  
  // Save Changes Button Group
  export const SaveChangesButtons = () => (
    <div className="flex justify-end gap-2">
      <Button
        size="sm"
        variant="light"
        color="danger"
        startContent={<X size={16} />}
      >
        Cancel
      </Button>
      <Button
        size="sm"
        className="bg-gradient-to-r from-pink-500 to-orange-500 text-white"
        startContent={<Save size={16} />}
      >
        Save Changes
      </Button>
    </div>
  );

export {

  };

function useDropzone(arg0: { accept: string; onDrop: (files: any) => void; }): { getRootProps: any; getInputProps: any; isDragActive: any; } {
    throw new Error('Function not implemented.');
  }
