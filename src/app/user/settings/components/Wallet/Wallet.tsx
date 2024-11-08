"use client";
import React from 'react';
import { Card, CardBody, Chip, Button, Input, Tabs, Tab, Progress, Modal, ModalContent, ModalHeader, ModalBody,  ModalFooter, RadioGroup, Select, SelectItem } from "@nextui-org/react";
import {
  CreditCard,
  DollarSign,
  Plus,
  ExternalLink,
  ArrowDownLeft,
  ArrowUpRight,
  PiggyBankIcon,
  Radio,
  Calendar,
  Filter,
  PieChart,
  TrendingDown,
  TrendingUp
} from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';



export const WalletSettings = () => {
    // Previous state variables remain...
    const [selectedTab, setSelectedTab] = React.useState("balance");
    const [analyticsPeriod, setAnalyticsPeriod] = React.useState("1m");
    const [selectedMetric, setSelectedMetric] = React.useState("balance");
    const [isTopUpModalOpen, setTopUpModalOpen] = React.useState(false);
    const [isWithdrawModalOpen, setWithdrawModalOpen] = React.useState(false);
    const [topUpAmount, setTopUpAmount] = React.useState("");
    const [withdrawAmount, setWithdrawAmount] = React.useState("");
    const [paymentMethod, setPaymentMethod] = React.useState("card");
    const [withdrawMethod, setWithdrawMethod] = React.useState("bank");
  
    const handleTopUp = () => {
      // Handle top-up logic here
      setTopUpModalOpen(false);
      setTopUpAmount("");
    };
  
    const handleWithdraw = () => {
      // Handle withdraw logic here
      setWithdrawModalOpen(false);
      setWithdrawAmount("");
    };
  
    const calculateFee = (amount, method) => {
      if (method === "card") return (amount * 0.025).toFixed(2);
      return "0.00";
    };
  
    // Sample data for charts
    const balanceHistory = [
      { date: '1 Oct', balance: 1200 },
      { date: '5 Oct', balance: 1850 },
      { date: '10 Oct', balance: 1650 },
      { date: '15 Oct', balance: 2100 },
      { date: '20 Oct', balance: 1950 },
      { date: '25 Oct', balance: 2300 },
      { date: '30 Oct', balance: 2458 },
    ];
  
    const transactionData = [
      { month: 'Sep', income: 3200, expenses: 1800 },
      { month: 'Oct', income: 4100, expenses: 2300 },
      { month: 'Nov', income: 3800, expenses: 2100 },
      { month: 'Dec', income: 4500, expenses: 2600 },
    ];
  
    const categoryData = [
      { name: 'Project Income', value: 65, color: '#0ea5e9' },
      { name: 'Referrals', value: 15, color: '#f97316' },
      { name: 'Tips', value: 10, color: '#8b5cf6' },
      { name: 'Other', value: 10, color: '#06b6d4' },
    ];
  
    return (
      <>
        <Card className="bg-background shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50">
          <CardBody className="p-6 space-y-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
              Wallet
            </h2>
            <p className="text-foreground/60">
              Manage your wallet balance and transactions
            </p>
          </div>

          {/* Balance Card */}
          <div className="bg-content2 rounded-xl p-6">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="space-y-1">
                <p className="text-sm text-foreground/60">Available Balance</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">$2,458.20</span>
                  <span className="text-success text-sm">+12.5%</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  className="bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                  startContent={<Plus size={18} />}
                  onPress={() => setTopUpModalOpen(true)}
                >
                  Top Up
                </Button>
                <Button
                  variant="bordered"
                  startContent={<ArrowUpRight size={18} />}
                  onPress={() => setWithdrawModalOpen(true)}
                >
                  Withdraw
                </Button>
              </div>
            </div>
          </div>
            
            
  
            <Tabs 
              onSelectionChange={(key) => setSelectedTab(key.toString())}
             
              variant="light"
              classNames={{
                tabList: "gap-4",
                cursor: "bg-gradient-to-r from-pink-500 to-orange-500",
                tab: "max-w-fit px-4 h-10",
                tabContent: "group-data-[selected=true]:text-white"
              }}
            >
              <Tab key="balance" title="Balance History">
              <div className="pt-4 space-y-4">
              <TransactionItem
                type="credit"
                amount="850.00"
                description="Project Payment"
                date="Today, 2:30 PM"
                status="Completed"
              />
              <TransactionItem
                type="debit"
                amount="150.00"
                description="Withdrawal to Bank"
                date="Yesterday, 4:15 PM"
                status="Completed"
              />
              <TransactionItem
                type="credit"
                amount="1,200.00"
                description="Client Payment"
                date="Oct 15, 2023"
                status="Completed"
              />
            </div>
              </Tab>
              <Tab key="topup" title="Top Up Methods">
              <div className="pt-4 grid gap-4 grid-cols-1 md:grid-cols-2">
              <TopUpMethod
                    icon={<CreditCard size={24} />}
                    title="Credit Card"
                    description="Instant top-up using your card"
                    fee="2.5%" onPress={undefined}              />
              <TopUpMethod
                    icon={<PiggyBankIcon size={24} />}
                    title="Bank Transfer"
                    description="1-3 business days processing"
                    fee="Free" onPress={undefined}              />
            </div>
              </Tab>
              <Tab key="analytics" title="Analytics">
                <div className="pt-4 space-y-6">
                  {/* Time Period Selector */}
                  <div className="flex justify-between items-center">
                    <Select 
                      labelPlacement="outside"
                      value={analyticsPeriod}
                      onChange={(e) => setAnalyticsPeriod(e.target.value)}
                      className="w-40"
                      startContent={<Calendar size={16} />}
                    >
                      <SelectItem key="1w" value="1w">Last Week</SelectItem>
                      <SelectItem key="1m" value="1m">Last Month</SelectItem>
                      <SelectItem key="3m" value="3m">Last 3 Months</SelectItem>
                      <SelectItem key="1y" value="1y">Last Year</SelectItem>
                    </Select>
  
                    <Select
                      labelPlacement="outside"
                      value={selectedMetric}
                      onChange={(e) => setSelectedMetric(e.target.value)}
                      className="w-40"
                      startContent={<Filter size={16} />}
                    >
                      <SelectItem key="balance" value="balance">Balance</SelectItem>
                      <SelectItem key="transactions" value="transactions">Transactions</SelectItem>
                      <SelectItem key="categories" value="categories">Categories</SelectItem>
                    </Select>
                  </div>
  
                  {/* Analytics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <MetricCard
                      title="Total Income"
                      value="$12,458"
                      change="+15.3%"
                      trend="up"
                    />
                    <MetricCard
                      title="Total Spending"
                      value="$4,385"
                      change="-8.2%"
                      trend="down"
                    />
                    <MetricCard
                      title="Net Flow"
                      value="$8,073"
                      change="+23.1%"
                      trend="up"
                    />
                  </div>
  
                  {/* Main Chart */}
                  <Card className="bg-content2 p-4">
                    <div className="h-[400px]">
                      {selectedMetric === "balance" && (
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={balanceHistory}>
                            <defs>
                              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Area 
                              type="monotone" 
                              dataKey="balance" 
                              stroke="#ec4899"
                              fill="url(#colorBalance)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      )}
  
                      {selectedMetric === "transactions" && (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={transactionData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="income" fill="#22c55e" />
                            <Bar dataKey="expenses" fill="#ef4444" />
                          </BarChart>
                        </ResponsiveContainer>
                      )}
  
                      {selectedMetric === "categories" && (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={categoryData}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              outerRadius={150}
                              label
                            >
                              {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </Card>
  
                  {/* Transaction Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-content2 p-4">
                      <h4 className="font-medium mb-4">Top Transactions</h4>
                      <div className="space-y-3">
                        {[
                          { description: 'Project Payment', amount: 2500, type: 'credit' },
                          { description: 'Withdrawal', amount: 1200, type: 'debit' },
                          { description: 'Referral Bonus', amount: 500, type: 'credit' }
                        ].map((tx, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm">{tx.description}</span>
                            <span className={tx.type === 'credit' ? 'text-success' : 'text-danger'}>
                              {tx.type === 'credit' ? '+' : '-'}${tx.amount}
                            </span>
                          </div>
                        ))}
                      </div>
                    </Card>
  
                    <Card className="bg-content2 p-4">
                      <h4 className="font-medium mb-4">Quick Stats</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Average Transaction</span>
                            <span>$845</span>
                          </div>
                          <Progress 
                            value={60} 
                            className="h-2"
                            classNames={{
                              indicator: "bg-gradient-to-r from-pink-500 to-orange-500"
                            }}
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Success Rate</span>
                            <span>98.5%</span>
                          </div>
                          <Progress 
                            value={98.5} 
                            className="h-2"
                            classNames={{
                              indicator: "bg-gradient-to-r from-pink-500 to-orange-500"
                            }}
                          />
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
  
          {/* Top Up Modal */}
      <Modal 
        isOpen={isTopUpModalOpen} 
        onOpenChange={setTopUpModalOpen}
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-content1",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Top Up Wallet</ModalHeader>
              <ModalBody>
                <Input
                  type="number"
                  label="Amount"
                  placeholder="0.00"
                  startContent={<DollarSign size={18} />}
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                />
                
                <RadioGroup
                  label="Payment Method"
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                >
                  <Radio values="card">
                    <div className="flex items-center gap-2">
                      <CreditCard size={18} />
                      Credit Card (2.5% fee)
                    </div>
                  </Radio>
                  <Radio values="bank">
                    <div className="flex items-center gap-2">
                      <PiggyBankIcon size={18} />
                      Bank Transfer (Free)
                    </div>
                  </Radio>
                </RadioGroup>

                {topUpAmount && (
                  <div className="bg-content2 p-4 rounded-xl space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Amount:</span>
                      <span>${topUpAmount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Fee:</span>
                      <span>${calculateFee(topUpAmount, paymentMethod)}</span>
                    </div>
                    <div className="flex justify-between font-medium pt-2 border-t">
                      <span>Total:</span>
                      <span>${(Number(topUpAmount) + Number(calculateFee(topUpAmount, paymentMethod))).toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button 
                  className="bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                  onPress={handleTopUp}
                  isDisabled={!topUpAmount}
                >
                  Confirm Top Up
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Withdraw Modal */}
      <Modal 
        isOpen={isWithdrawModalOpen} 
        onOpenChange={setWithdrawModalOpen}
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-content1",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Withdraw Funds</ModalHeader>
              <ModalBody>
                <Input
                  type="number"
                  label="Amount"
                  placeholder="0.00"
                  startContent={<DollarSign size={18} />}
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  description="Available balance: $2,458.20"
                />

                <Select
                  label="Withdraw to"
                  value={withdrawMethod}
                  onChange={(e) => setWithdrawMethod(e.target.value)}
                >
                  <SelectItem key="bank" value="bank" startContent={<PiggyBankIcon size={18} />}>
                    Bank Account (1-3 business days)
                  </SelectItem>
                  <SelectItem key="card" value="card" startContent={<CreditCard size={18} />}>
                    Credit Card (Instant)
                  </SelectItem>
                </Select>

                {withdrawAmount && (
                  <div className="bg-content2 p-4 rounded-xl space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Amount:</span>
                      <span>${withdrawAmount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Processing Time:</span>
                      <span>{withdrawMethod === 'bank' ? '1-3 business days' : 'Instant'}</span>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button 
                  className="bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                  onPress={handleWithdraw}
                  isDisabled={!withdrawAmount || Number(withdrawAmount) > 2458.20}
                >
                  Confirm Withdrawal
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      </>
    );
  };
  
  const MetricCard = ({ title, value, change, trend }) => (
    <Card className="bg-content2">
      <CardBody className="p-4">
        <p className="text-sm text-default-500">{title}</p>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-2xl font-semibold">{value}</span>
          <span className={`text-sm ${trend === 'up' ? 'text-success' : 'text-danger'} flex items-center gap-1`}>
            {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {change}
          </span>
        </div>
      </CardBody>
    </Card>
  );
  
  // Existing components remain the same
  const TransactionItem = ({ type, amount, description, date, status }) => (
    <div className="flex items-center justify-between p-4 bg-content3 rounded-xl">
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-lg ${
          type === 'credit' ? 'bg-success/10' : 'bg-danger/10'
        }`}>
          {type === 'credit' ? (
            <ArrowDownLeft size={20} className="text-success" />
          ) : (
            <ArrowUpRight size={20} className="text-danger" />
          )}
        </div>
        <div>
          <p className="font-medium">{description}</p>
          <p className="text-sm text-foreground/60">{date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-medium ${
          type === 'credit' ? 'text-success' : 'text-danger'
        }`}>
          {type === 'credit' ? '+' : '-'}${amount}
        </p>
        <Chip
          size="sm"
          variant="flat"
          color="success"
        >
          {status}
        </Chip>
      </div>
    </div>
  );
  
  const TopUpMethod = ({ icon, title, description, fee, onPress }) => (
    <div className="flex items-start gap-4 p-4 bg-content3 rounded-xl">
      <div className="p-2 rounded-lg bg-primary/10">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-medium">{title}</h4>
          <Chip size="sm" variant="flat">
            Fee: {fee}
          </Chip>
        </div>
        <p className="text-sm text-foreground/60 mb-3">{description}</p>
        <Button
          size="sm"
          className="bg-gradient-to-r from-pink-500 to-orange-500 text-white"
          endContent={<ExternalLink size={16} />}
          onPress={onPress}
        >
          Top Up Now
        </Button>
      </div>
    </div>
  );
  