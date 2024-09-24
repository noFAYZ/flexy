import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Chip, Avatar, Tooltip } from "@nextui-org/react";
import { CalendarDays, DollarSign, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const RecentBids = ({ bids }) => {
  // Demo recent bids data
  const demoRecentBids = [
    {
      id: 1,
      jobTitle: "React Native Developer",
      amount: 500,
      date: "2024-09-10",
      status: "pending",
      clientAvatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: 2,
      jobTitle: "Blockchain Smart Contract Audit",
      amount: 1000,
      date: "2024-09-09",
      status: "accepted",
      clientAvatar: "https://i.pravatar.cc/150?img=2"
    },
    {
      id: 3,
      jobTitle: "UI/UX Designer for Web3 App",
      amount: 750,
      date: "2024-09-08",
      status: "rejected",
      clientAvatar: "https://i.pravatar.cc/150?img=3"
    },
    {
      id: 4,
      jobTitle: "Solidity Developer for DeFi Project",
      amount: 1200,
      date: "2024-09-07",
      status: "pending",
      clientAvatar: "https://i.pravatar.cc/150?img=4"
    },
    {
      id: 5,
      jobTitle: "Full Stack Web3 Developer",
      amount: 900,
      date: "2024-09-06",
      status: "accepted",
      clientAvatar: "https://i.pravatar.cc/150?img=5"
    }
  ];

  // Use provided bids or fall back to demo data
  const displayBids = bids || demoRecentBids;

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'success';
      case 'rejected': return 'danger';
      default: return 'warning';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted': return <TrendingUp size={14} />;
      case 'rejected': return <TrendingDown size={14} />;
      default: return <Minus size={14} />;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="px-2 sm:px-4 md:px-6 lg:px-8">
      <Card className="border-medium border-default rounded-3xl bg-gradient-to-br from-background to-muted/50 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
          <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
            <motion.div
        
              className="mr-2"
            >
              <TrendingUp size={24} className="text-primary" />
            </motion.div>
            Recent Bids
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <AnimatePresence>
            {displayBids.length > 0 ? (
              <motion.ul className="space-y-4">
                {displayBids.map((bid, index) => (
                  <motion.li
                    key={bid.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-3 hover:bg-primary/5 rounded-xl transition-colors duration-200"
                  >
                    <Avatar
                      src={bid.clientAvatar}
                      size="md"
                      className="hidden sm:block"
                      isBordered
                      color={getStatusColor(bid.status)}
                    />
                    <div className="flex-grow min-w-0">
                      <Tooltip content={bid.jobTitle}>
                        <p className="text-sm font-medium truncate">{bid.jobTitle}</p>
                      </Tooltip>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <CalendarDays size={12} className="mr-1" />
                        <span>{formatDate(bid.date)}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Chip
                        variant="flat"
                        color={getStatusColor(bid.status)}
                        size="sm"
                        startContent={getStatusIcon(bid.status)}
                      >
                        {bid.status}
                      </Chip>
                      <motion.div
                        className="flex items-center text-sm font-semibold"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <DollarSign size={14} className="mr-1 text-green-500" />
                        {bid.amount}
                      </motion.div>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-muted-foreground text-center py-4"
              >
                No recent bids. Start bidding to see your activity here!
              </motion.p>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentBids;