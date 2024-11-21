"use client";

import React, { useState } from "react";
import { 
  Star, 
  Clock, 
  DollarSign, 
  Calendar, 
  MessageSquare, 
  Shield, 
  Award, 
  ThumbsUp, 
  ArrowLeft,
  MapPin,
  Briefcase,
  CheckCircle,
  XCircle,
  Filter,
  ChevronDown
} from "lucide-react";
import { 
  Button, 
  Avatar, 
  Progress, 
  Chip,
  Card,
  Select,
  SelectItem,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bid, mockBids } from "../types";





export default function ProjectBidsPage({ params }: { params: { id: string } }) {
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const filteredBids = mockBids.filter(bid => 
    filterStatus === "all" ? true : bid.status === filterStatus
  );

  return (
    <div className="min-h-screen bg-background/60 p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/projects/${params.id}`}>
              <Button
                isIconOnly
                variant="flat"
                className="rounded-full"
              >
                <ArrowLeft />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Project Bids</h1>
              <p className="text-default-500">Review and manage project proposals</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Bids", value: mockBids.length, icon: Briefcase },
            { label: "Average Bid", value: "$75/hr", icon: DollarSign },
            { label: "Average Rating", value: "4.8", icon: Star },
            { label: "Response Rate", value: "85%", icon: Clock },
          ].map((stat, index) => (
            <Card key={index} className="p-4 bg-default/40">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{stat.label}</h3>
                  <p className="text-default-500">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 