import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Chip, Avatar } from "@nextui-org/react";
import { CalendarDays, DollarSign } from 'lucide-react';

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

const RecentBids = ({ bids = demoRecentBids }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'success';
      case 'rejected': return 'danger';
      default: return 'warning';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="px-2 sm:px-4 md:px-6 lg:px-8">
      <Card className='border-medium border-default rounded-3xl bg-muted'>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl font-semibold">Recent Bids</CardTitle>
        </CardHeader>
        <CardContent>
          {bids.length > 0 ? (
            <ul className="space-y-2 sm:space-y-4">
              {bids.map((bid) => (
                <li key={bid.id} className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 p-2 hover:bg-secondary/50 rounded-lg transition-colors duration-200">
                  <Avatar src={bid.clientAvatar} size="sm" className="mb-2 sm:mb-0" />
                  <div className="flex-grow">
                    <p className="text-sm font-medium truncate">{bid.jobTitle}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <CalendarDays size={12} className="mr-1" />
                      <span>{formatDate(bid.date)}</span>
                    </div>
                  </div>
                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto">
                    <Chip
                      variant="flat"
                      color={getStatusColor(bid.status)}
                      size="sm"
                      className="mb-0 sm:mb-1"
                    >
                      {bid.status}
                    </Chip>
                    <div className="flex items-center text-sm font-semibold mt-1 sm:mt-0">
                      <DollarSign size={14} className="mr-1 text-green-500" />
                      {bid.amount}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No recent bids.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentBids;