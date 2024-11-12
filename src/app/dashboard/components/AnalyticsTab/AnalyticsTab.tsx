import React, { useState } from "react";
import { Card, Button, Progress, Select, SelectItem, Tab, Tabs } from "@nextui-org/react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from "recharts";
import { ArrowUpRight, TrendingUp, Users, Wallet, Clock, Award, ArrowDown, ArrowUp, DollarSign, Briefcase, Star, Target,  } from "lucide-react";
import { motion } from "framer-motion";

interface MetricCardProps {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: React.ElementType;
  description: string;
  theme?: string;
}

export const AnalyticsTab = () => {
  const [viewType, setViewType] = useState("client");

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Analytics Dashboard</h2>
          <p className="text-default-500">Track your platform metrics and performance</p>
        </div>
        <Tabs 
          selectedKey={viewType} 
          onSelectionChange={(key) => setViewType(key.toString())}
          classNames={{
            tabList: "gap-4 p-2",
            cursor: "bg-gradient-to-r from-pink-500 to-orange-600",
            tab: "max-w-fit px-4 h-10"
          }}
        >
          <Tab 
            key="client" 
            title={
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>Client View</span>
              </div>
            }
          />
          <Tab 
            key="freelancer" 
            title={
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Freelancer View</span>
              </div>
            }
          />
        </Tabs>
      </div>

      {viewType === "client" ? <ClientAnalytics /> : <FreelancerAnalytics />}
    </motion.div>
  );
};

const ClientAnalytics = () => {
  const spendingData = [
    { month: "Jan", amount: 12000 },
    { month: "Feb", amount: 19000 },
    { month: "Mar", amount: 15000 },
    { month: "Apr", amount: 25000 },
    { month: "May", amount: 32000 },
    { month: "Jun", amount: 28000 },
  ];

  const projectDistribution = [
    { name: "Completed", value: 45 },
    { name: "In Progress", value: 35 },
    { name: "Planning", value: 20 },
  ];

  return (
    <>
      {/* Client Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Spend"
          value="$125,400"
          trend="+12.5%"
          trendUp={true}
          icon={DollarSign}
          description="Total project spending"
          theme="default"
        />
        <MetricCard 
          title="Active Projects"
          value="8"
          trend="+2"
          trendUp={true}
          icon={Briefcase}
          description="Currently running"
          theme="default"
        />
        <MetricCard 
          title="Talent Hired"
          value="24"
          trend="+5"
          trendUp={true}
          icon={Users}
          description="Active contractors"
          theme="default"
        />
        <MetricCard 
          title="Average Rating"
          value="4.8"
          trend="+0.3"
          trendUp={true}
          icon={Star}
          description="As an employer"
          theme="default"
        />
      </div>

      {/* Client Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Project Spending</h3>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <AreaChart data={spendingData}>
                <defs>
                  <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0070F3" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0070F3" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'rgba(0, 0, 0, 0.8)', border: 'none' }} />
                <Area type="monotone" dataKey="amount" stroke="#0070F3" fill="url(#colorSpending)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Project Status Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={projectDistribution}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projectDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#0070F3', '#7928CA', '#FF0080'][index]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'rgba(0, 0, 0, 0.8)', border: 'none' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Client Additional Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Top Hired Skills</h3>
          <div className="space-y-4">
            <SkillBar skill="Blockchain Development" value={85} />
            <SkillBar skill="Smart Contracts" value={78} />
            <SkillBar skill="Frontend Development" value={72} />
            <SkillBar skill="UI/UX Design" value={65} />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Project Metrics</h3>
          <div className="space-y-4">
            <MetricRow 
              label="On-time Delivery Rate"
              value="92%"
              trend="+5.2%"
              trendUp={true}
            />
            <MetricRow 
              label="Budget Adherence"
              value="88%"
              trend="+3.8%"
              trendUp={true}
            />
            <MetricRow 
              label="Satisfaction Rate"
              value="4.8/5"
              trend="+0.2"
              trendUp={true}
            />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Talent Insights</h3>
          <div className="space-y-4">
            <MetricRow 
              label="Avg. Response Time"
              value="2.4h"
              trend="-18.5%"
              trendUp={true}
            />
            <MetricRow 
              label="Interview Success Rate"
              value="78%"
              trend="+12.3%"
              trendUp={true}
            />
            <MetricRow 
              label="Retention Rate"
              value="85%"
              trend="+5.4%"
              trendUp={true}
            />
          </div>
        </Card>
      </div>
    </>
  );
};

const FreelancerAnalytics = () => {
  const earningsData = [
    { month: "Jan", amount: 4500 },
    { month: "Feb", amount: 5200 },
    { month: "Mar", amount: 4800 },
    { month: "Apr", amount: 6500 },
    { month: "May", amount: 7200 },
    { month: "Jun", amount: 6800 },
  ];

  const projectTypes = [
    { name: "Fixed Price", value: 60 },
    { name: "Hourly", value: 30 },
    { name: "Milestone", value: 10 },
  ];

  return (
    <>
      {/* Freelancer Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Earnings"
          value="$34,800"
          trend="+18.5%"
          trendUp={true}
          icon={DollarSign}
          description="Last 30 days"
          theme="default"
        />
        <MetricCard 
          title="Active Contracts"
          value="5"
          trend="+2"
          trendUp={true}
          icon={Briefcase}
          description="Currently working"
          theme="default"
        />
        <MetricCard 
          title="Success Rate"
          value="96%"
          trend="+2.5%"
          trendUp={true}
          icon={Target}
          description="Project completion"
          theme="default"
        />
        <MetricCard 
          title="Client Rating"
          value="4.9"
          trend="+0.2"
          trendUp={true}
          icon={Star}
          description="Average rating"
          theme="default"
        />
      </div>

      {/* Freelancer Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Earnings Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <AreaChart data={earningsData}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7928CA" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#7928CA" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'rgba(0, 0, 0, 0.8)', border: 'none' }} />
                <Area type="monotone" dataKey="amount" stroke="#7928CA" fill="url(#colorEarnings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Work Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={projectTypes}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projectTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#7928CA', '#FF0080', '#0070F3'][index]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'rgba(0, 0, 0, 0.8)', border: 'none' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Freelancer Additional Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Skill Performance</h3>
          <div className="space-y-4">
            <SkillBar skill="Smart Contracts" value={92} />
            <SkillBar skill="DeFi Development" value={88} />
            <SkillBar skill="Web3" value={85} />
            <SkillBar skill="React" value={90} />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <MetricRow 
              label="Response Rate"
              value="98%"
              trend="+2.2%"
              trendUp={true}
            />
            <MetricRow 
              label="On-time Delivery"
              value="95%"
              trend="+4.8%"
              trendUp={true}
            />
            <MetricRow 
              label="Client Satisfaction"
              value="4.9/5"
              trend="+0.3"
              trendUp={true}
            />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Availability</h3>
          <div className="space-y-4">
            <MetricRow 
              label="Weekly Hours"
              value="38h"
              trend="+5h"
              trendUp={true}
            />
            <MetricRow 
              label="Profile Views"
              value="156"
              trend="+22%"
              trendUp={true}
            />
            <MetricRow 
              label="Interview Requests"
              value="12"
              trend="+4"
              trendUp={true}
            />
          </div>
        </Card>
      </div>
    </>
  );
};

const MetricCard = ({ title, value, trend, trendUp, icon: Icon, description, theme }: MetricCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="p-4 bg-background/60 backdrop-blur-md shadow-medium rounded-[1.25rem] border-medium border-default hover:shadow-lg transition-all">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <span className="text-default-500">{title}</span>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-semibold">{value}</h3>
            <span className={`text-sm flex items-center gap-1 ${trendUp ? 'text-success' : 'text-danger'}`}>
              {trendUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {trend}
            </span>
          </div>
          <p className="text-xs text-default-400">{description}</p>
        </div>
        <div className={`p-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-600`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </Card>
  </motion.div>
);

const ChartCard = ({ title, children }) => (
  <Card className="p-6 bg-background/60 backdrop-blur-md shadow-medium rounded-[1.25rem] border-medium border-default">
    <h3 className="text-lg font-semibold mb-6">{title}</h3>
    <div className="h-[300px]">
      {children}
    </div>
  </Card>
);

// Component for metric rows
const MetricRow = ({ label, value, trend, trendUp }) => (
  <div className="flex justify-between items-center">
    <span className="text-default-500">{label}</span>
    <div className="flex items-center gap-2">
      <span className="font-medium">{value}</span>
      <span className={`text-sm ${trendUp ? 'text-success' : 'text-danger'}`}>
        {trend}
      </span>
    </div>
  </div>
);

// Component for skill bars
const SkillBar = ({ skill, value }) => (
  <div className="space-y-2">
    <div className="flex justify-between">
      <span className="text-sm">{skill}</span>
      <span className="text-sm text-default-500">{value}%</span>
    </div>
    <Progress 
      value={value}
      className="h-2"
      color={value > 75 ? "success" : value > 50 ? "primary" : "warning"}
    />
  </div>
);

// Updated color scheme for better visibility
const COLORS = ['#FF5733', '#33FF57', '#3357FF', '#F333FF'].map(color => `${color}CC`); // Added transparency

// Custom tooltip styles
const customTooltipStyle = {
  background: 'rgba(0, 0, 0, 0.8)',
  border: 'none',
  borderRadius: '8px',
  padding: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  color: '#fff'
};