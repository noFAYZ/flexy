"use client";
import React, { useState } from "react";
import { Card, CardBody, Button, Chip, Avatar, Progress, Input } from "@nextui-org/react";
import { 
  ArrowUpRight, 
  ArrowDownLeft,
  Wallet,
  CreditCard,
  Clock,
  DollarSign,
  BarChart2,
  ArrowRight,
  Plus,
  ChevronDown,
  ChevronUp,
  Search
} from "lucide-react";
import Link from "next/link";
import { SortableItem } from "@/components/homepage/items/SortableItem";

const getStatusChipClass = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-success/10 text-success';
    case 'pending':
      return 'bg-warning/10 text-warning';
    default:
      return 'bg-default/10 text-default-500';
  }
};

export const PaymentsTab = () => {
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedTransactionId, setExpandedTransactionId] = useState<number | null>(null);

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedTransactions = showAllTransactions 
    ? filteredTransactions 
    : filteredTransactions.slice(0, 5);

  const getStatusChipClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-success/10 text-success';
      case 'pending':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-default/10 text-default-500';
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-4">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-background/60 shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50">
          <CardBody className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-success/10">
                <ArrowUpRight size={22} className="text-success" />
              </div>
              <div>
                <p className="text-default-500">Total Income</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-semibold">$45,200</p>
                  <Chip size="sm" className="bg-success/10 text-success">+12.5%</Chip>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-background/60 shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50">
          <CardBody className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-danger/10">
                <ArrowDownLeft size={22} className="text-danger" />
              </div>
              <div>
                <p className="text-default-500">Total Spent</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-semibold">$32,150</p>
                  <Chip size="sm" className="bg-danger/10 text-danger">-8.3%</Chip>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-background/60 shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50">
          <CardBody className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Wallet size={22} className="text-primary" />
              </div>
              <div>
                <p className="text-default-500">Available Balance</p>
                <p className="text-2xl font-semibold">$13,050</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-background/60 shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50">
          <CardBody className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-secondary/10">
                <CreditCard size={22} className="text-secondary" />
              </div>
              <div>
                <p className="text-default-500">Active Cards</p>
                <p className="text-2xl font-semibold">3</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <Card className="lg:col-span-2 bg-background/60 shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50">
          <CardBody className="p-6">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Recent Transactions</h3>
                <div className="flex gap-2">
                  <Input
                    className="w-48"
                    placeholder="Search transactions..."
                    startContent={<Search size={18} />}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    size="sm"
                  />
                  <Button
                    className="bg-primary/20 backdrop-blur-md hover:bg-primary/30 text-primary"
                    size="sm"
                    startContent={<Plus size={16} />}
                  >
                    New
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {displayedTransactions.map((transaction) => (
                  <div 
                    key={transaction.id} 
                    className="rounded-3xl bg-default/40 backdrop-blur-md hover:bg-default/60 
                      transition-all duration-300 overflow-hidden"
                  >
                    <div 
                      className="flex items-center justify-between p-4 cursor-pointer"
                      onClick={() => setExpandedTransactionId(
                        expandedTransactionId === transaction.id ? null : transaction.id
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <Avatar
                          src={transaction.avatar}
                          name={transaction.name}
                          size="sm"
                        />
                        <div>
                          <p className="font-medium">{transaction.name}</p>
                          <div className="flex items-center gap-2 text-sm text-default-500">
                            <Clock size={14} />
                            {transaction.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className={`font-semibold ${
                            transaction.type === 'income' 
                              ? 'text-success' 
                              : 'text-danger'
                          }`}>
                            {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                          </p>
                          <Chip 
                            size="sm" 
                            className={getStatusChipClass(transaction.status)}
                          >
                            {transaction.status}
                          </Chip>
                        </div>
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform ${
                            expandedTransactionId === transaction.id ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {expandedTransactionId === transaction.id && (
                      <div className="p-4 pt-0 border-t border-default-200/50">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-default-500">Transaction ID</p>
                            <p className="font-medium">#{transaction.id.toString().padStart(6, '0')}</p>
                          </div>
                          <div>
                            <p className="text-default-500">Category</p>
                            <p className="font-medium">{transaction.category || 'General'}</p>
                          </div>
                          <div>
                            <p className="text-default-500">Payment Method</p>
                            <p className="font-medium">{transaction.paymentMethod || 'Card ending in 4242'}</p>
                          </div>
                          <div>
                            <p className="text-default-500">Description</p>
                            <p className="font-medium">{transaction.description || 'No description provided'}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {filteredTransactions.length > 5 && (
                  <Button
                    className="w-full bg-default/40 backdrop-blur-md hover:bg-default/60"
                    endContent={showAllTransactions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    onClick={() => setShowAllTransactions(!showAllTransactions)}
                  >
                    {showAllTransactions ? 'Show Less' : `Show ${filteredTransactions.length - 5} More`}
                  </Button>
                )}

                {filteredTransactions.length === 0 && (
                  <div className="text-center text-default-500 py-4">
                    No transactions found
                  </div>
                )}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Payment Methods */}
        <Card className="bg-background/60 shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50">
          <CardBody className="p-6">
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div 
                  key={method.id} 
                  className="p-4 rounded-xl bg-default/40 backdrop-blur-md 
                    hover:bg-default/60 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {method.icon}
                      <span className="font-medium">{method.name}</span>
                    </div>
                    <Chip size="sm" className="bg-primary/10 text-primary">
                      {method.default ? 'Default' : 'Active'}
                    </Chip>
                  </div>
                  <p className="text-sm text-default-500">
                    {method.number}
                  </p>
                </div>
              ))}
              
              <Button
                className="w-full bg-primary/20 backdrop-blur-md hover:bg-primary/30 text-primary"
                startContent={<Plus size={16} />}
              >
                Add New Payment Method
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

// Sample data with more transactions
const transactions = [
  {
    id: 1,
    name: "Wallet Top-up",
    avatar: "https://i.pravatar.cc/150?u=1",
    amount: 5000,
    type: "income",
    status: "Completed",
    date: "Today, 2:30 PM",
    category: "Top-up",
    paymentMethod: "Bank Transfer",
    description: "Added funds to platform wallet"
  },
  {
    id: 2,
    name: "Project Milestone",
    avatar: "https://i.pravatar.cc/150?u=2",
    amount: 2500,
    type: "income",
    status: "Completed",
    date: "Today, 1:15 PM",
    category: "Milestone Payment",
    paymentMethod: "Platform Escrow",
    description: "Frontend Development Phase 1 - E-commerce Project"
  },
  {
    id: 3,
    name: "Withdrawal to Bank",
    avatar: "https://i.pravatar.cc/150?u=3",
    amount: 3000,
    type: "expense",
    status: "Pending",
    date: "Yesterday, 4:45 PM",
    category: "Withdrawal",
    paymentMethod: "Bank Transfer",
    description: "Monthly withdrawal to connected bank account"
  },
  {
    id: 4,
    name: "Client Tip",
    avatar: "https://i.pravatar.cc/150?u=4",
    amount: 200,
    type: "income",
    status: "Completed",
    date: "Yesterday, 2:30 PM",
    category: "Tip",
    paymentMethod: "Direct Transfer",
    description: "Bonus for early project completion"
  },
  {
    id: 5,
    name: "Platform Fee",
    avatar: "/platform-logo.png",
    amount: 125,
    type: "expense",
    status: "Completed",
    date: "Yesterday, 2:30 PM",
    category: "Fee",
    paymentMethod: "Platform Wallet",
    description: "5% platform fee for milestone payment"
  },
  {
    id: 6,
    name: "Project Escrow",
    avatar: "https://i.pravatar.cc/150?u=6",
    amount: 4000,
    type: "pending",
    status: "Pending",
    date: "2 days ago",
    category: "Escrow",
    paymentMethod: "Platform Escrow",
    description: "Mobile App Development - Initial Milestone"
  },
  {
    id: 7,
    name: "Crypto Exchange",
    avatar: "/crypto-icon.png",
    amount: 1500,
    type: "expense",
    status: "Completed",
    date: "2 days ago",
    category: "Exchange",
    paymentMethod: "ETH Wallet",
    description: "Converted USDT to ETH"
  },
  {
    id: 8,
    name: "Team Payment",
    avatar: "https://i.pravatar.cc/150?u=8",
    amount: 800,
    type: "expense",
    status: "Completed",
    date: "3 days ago",
    category: "Transfer",
    paymentMethod: "Internal Transfer",
    description: "Payment to team member for UI design work"
  },
  {
    id: 9,
    name: "Dispute Resolution",
    avatar: "/platform-logo.png",
    amount: 750,
    type: "income",
    status: "Completed",
    date: "4 days ago",
    category: "Dispute",
    paymentMethod: "Platform Escrow",
    description: "Resolved dispute in favor of freelancer"
  },
  {
    id: 10,
    name: "Smart Contract Deploy",
    avatar: "/eth-icon.png",
    amount: 50,
    type: "expense",
    status: "Completed",
    date: "4 days ago",
    category: "Gas Fee",
    paymentMethod: "ETH Wallet",
    description: "Gas fee for contract deployment"
  },
  {
    id: 11,
    name: "Referral Bonus",
    avatar: "/platform-logo.png",
    amount: 300,
    type: "income",
    status: "Completed",
    date: "5 days ago",
    category: "Referral",
    paymentMethod: "Platform Wallet",
    description: "Bonus for referring new client"
  },
  {
    id: 12,
    name: "NFT Certificate",
    avatar: "/nft-icon.png",
    amount: 100,
    type: "expense",
    status: "Pending",
    date: "5 days ago",
    category: "Certificate",
    paymentMethod: "ETH Wallet",
    description: "Minting project completion NFT certificate"
  }
];

const paymentMethods = [
  {
    id: 1,
    name: "Visa Card",
    icon: <CreditCard size={20} className="text-primary" />,
    number: "**** **** **** 4242",
    default: true
  },
  {
    id: 2,
    name: "Mastercard",
    icon: <CreditCard size={20} className="text-secondary" />,
    number: "**** **** **** 5678",
    default: false
  },
  // Add 2-3 more payment methods...
];

export default PaymentsTab;