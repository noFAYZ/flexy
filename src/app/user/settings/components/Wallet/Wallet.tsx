"use client";
import React, { useState } from 'react';
import { 
  Card, CardBody, Button, Avatar, 
  Chip, Divider, Progress,
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem
} from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet, ArrowUpRight, ArrowDownLeft, 
  Plus, Send, Receipt, History,
  ChevronDown, ExternalLink, Copy,
  Clock, CheckCircle2, XCircle,
  Filter, Download, MoreVertical,
  CreditCard, Coins, Gift
} from "lucide-react";

const transactionTypes = {
  TOPUP: { icon: Plus, color: "success" },
  WITHDRAW: { icon: ArrowUpRight, color: "danger" },
  MILESTONE: { icon: CheckCircle2, color: "primary" },
  TIP: { icon: Gift, color: "secondary" },
  PROJECT: { icon: Receipt, color: "warning" },
  TRANSFER: { icon: Send, color: "default" },
  DEPOSIT: { icon: ArrowDownLeft, color: "success" }
};

const transactions = [
  {
    id: 1,
    type: "TOPUP",
    amount: 1500,
    status: "completed",
    date: "2024-03-15",
    time: "14:30",
    from: "Credit Card",
    to: "Wallet",
    reference: "TOP-123456",
    fee: 15,
    details: {
      cardLast4: "4242",
      processor: "Stripe"
    }
  },
  {
    id: 2,
    type: "MILESTONE",
    amount: 750,
    status: "pending",
    date: "2024-03-14",
    time: "09:15",
    from: "Client Name",
    to: "Project: Dashboard Design",
    reference: "MIL-789012",
    details: {
      projectName: "Dashboard Design",
      milestoneNumber: 2,
      description: "UI Implementation"
    }
  },
  // Add more transaction examples...
];

export const WalletSettings = () => {
  const [expandedTransaction, setExpandedTransaction] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="space-y-6">
      {/* Wallet Overview Card */}
      <Card className="bg-background/60 backdrop-blur-md shadow-medium rounded-[2.5rem] border-medium border-default">
        <CardBody className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Balance Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Wallet Balance</h2>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">$2,458.50</span>
                <Chip color="success" variant="flat" size="sm">+12.5%</Chip>
              </div>
              <div className="flex gap-2">
                <Button 
                  className="bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                  startContent={<Plus size={18} />}
                >
                  Add Money
                </Button>
                <Button 
                  variant="bordered"
                  startContent={<Send size={18} />}
                >
                  Send
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-default-50">
                <CardBody className="p-4">
                  <div className="flex items-center gap-2 text-success mb-1">
                    <ArrowDownLeft size={18} />
                    <span className="text-sm">Income</span>
                  </div>
                  <p className="text-xl font-semibold">$3,240.80</p>
                </CardBody>
              </Card>
              <Card className="bg-default-50">
                <CardBody className="p-4">
                  <div className="flex items-center gap-2 text-danger mb-1">
                    <ArrowUpRight size={18} />
                    <span className="text-sm">Expenses</span>
                  </div>
                  <p className="text-xl font-semibold">$782.30</p>
                </CardBody>
              </Card>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Transactions Section */}
      <Card className="bg-background/60 backdrop-blur-md shadow-medium rounded-[2.5rem] border-medium border-default">
        <CardBody className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Transactions</h3>
            <div className="flex gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    variant="flat"
                    startContent={<Filter size={18} />}
                  >
                    Filter
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  selectedKeys={[activeFilter]}
                  onSelectionChange={(keys) => setActiveFilter(String(Array.from(keys)[0]))}
                >
                  <DropdownItem key="all">All Transactions</DropdownItem>
                  <DropdownItem key="incoming">Incoming</DropdownItem>
                  <DropdownItem key="outgoing">Outgoing</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Button
                variant="flat"
                startContent={<Download size={18} />}
              >
                Export
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {transactions.map((transaction) => (
              <motion.div
                key={transaction.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card
                  className="bg-content1 cursor-pointer"
                  isPressable
                  onPress={() => setExpandedTransaction(
                    expandedTransaction === transaction.id ? null : transaction.id
                  )}
                >
                  <CardBody className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl bg-${transactionTypes[transaction.type].color}/10`}>
                        {React.createElement(transactionTypes[transaction.type].icon, {
                          size: 20,
                          className: `text-${transactionTypes[transaction.type].color}`
                        })}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{transaction.type.charAt(0) + transaction.type.slice(1).toLowerCase()}</p>
                            <p className="text-sm text-default-500">{transaction.from} → {transaction.to}</p>
                          </div>
                          <div className="text-right">
                            <p className={`font-semibold ${
                              ['WITHDRAW', 'TRANSFER'].includes(transaction.type) ? 'text-danger' : 'text-success'
                            }`}>
                              {['WITHDRAW', 'TRANSFER'].includes(transaction.type) ? '-' : '+'}
                              ${transaction.amount}
                            </p>
                            <p className="text-xs text-default-500">
                              {new Date(transaction.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedTransaction === transaction.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-4 pt-4 border-t border-divider"
                        >
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-default-500">Status</p>
                              <Chip
                                size="sm"
                                color={transaction.status === 'completed' ? 'success' : 'warning'}
                                variant="flat"
                              >
                                {transaction.status}
                              </Chip>
                            </div>
                            <div>
                              <p className="text-default-500">Reference</p>
                              <p>{transaction.reference}</p>
                            </div>
                            {transaction.fee && (
                              <div>
                                <p className="text-default-500">Fee</p>
                                <p>${transaction.fee}</p>
                              </div>
                            )}
                            {/* Render additional details based on transaction type */}
                            {Object.entries(transaction.details || {}).map(([key, value]) => (
                              <div key={key}>
                                <p className="text-default-500">
                                  {key.charAt(0).toUpperCase() + key.slice(1)}
                                </p>
                                <p>{value}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
  