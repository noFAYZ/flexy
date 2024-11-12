"use client";
import React from "react";
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import {
  Activity,
  BarChart3,
  Clock,
  DollarSign,
  Users,
  Briefcase,
  Star,
  TrendingUp,
} from "lucide-react";

const Overview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {/* Quick Stats Row */}
      <Card className="bg-background/60 backdrop-blur-md shadow-medium rounded-[2.5rem] border-medium border-default">
        <CardBody className="gap-2">
          <div className="flex justify-between items-center">
            <p className="text-default-500">Total Earnings</p>
            <DollarSign className="w-5 h-5 text-success" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold">$2,450</span>
            <span className="text-success text-sm">+12.5%</span>
          </div>
        </CardBody>
      </Card>

      <Card className="bg-background/60 backdrop-blur-md shadow-medium rounded-[2.5rem] border-medium border-default">
        <CardBody className="gap-2">
          <div className="flex justify-between items-center">
            <p className="text-default-500">Active Projects</p>
            <Briefcase className="w-5 h-5 text-primary" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold">8</span>
            <span className="text-primary text-sm">Active</span>
          </div>
        </CardBody>
      </Card>

      <Card className="bg-background/60 backdrop-blur-md shadow-medium rounded-[2.5rem] border-medium border-default">
        <CardBody className="gap-2">
          <div className="flex justify-between items-center">
            <p className="text-default-500">Total Hours</p>
            <Clock className="w-5 h-5 text-warning" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold">164</span>
            <span className="text-warning text-sm">This Month</span>
          </div>
        </CardBody>
      </Card>

      <Card className="bg-background/60 backdrop-blur-md shadow-medium rounded-[2.5rem] border-medium border-default">
        <CardBody className="gap-2">
          <div className="flex justify-between items-center">
            <p className="text-default-500">Client Rating</p>
            <Star className="w-5 h-5 text-danger" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold">4.9</span>
            <span className="text-danger text-sm">★★★★★</span>
          </div>
        </CardBody>
      </Card>

      {/* Feature Cards Row */}
      <Card className="md:col-span-2 bg-background/60 backdrop-blur-md shadow-medium rounded-[2.5rem] border-medium border-default">
        <CardBody className="gap-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div>
              <h3 className="text-xl font-semibold">Recent Activity</h3>
              <p className="text-default-500 text-sm">Your project updates</p>
            </div>
            <Button
              className="mt-2 sm:mt-0"
              variant="flat"
              size="sm"
              color="primary"
            >
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {/* Activity Items */}
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-xl bg-primary/10">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">New milestone completed</p>
                <p className="text-sm text-default-500">Dashboard UI Design</p>
              </div>
              <span className="text-xs text-default-500">2h ago</span>
            </div>
            {/* Add more activity items as needed */}
          </div>
        </CardBody>
      </Card>

      <Card className="md:col-span-2 bg-background/60 backdrop-blur-md shadow-medium rounded-[2.5rem] border-medium border-default">
        <CardBody className="gap-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div>
              <h3 className="text-xl font-semibold">Performance</h3>
              <p className="text-default-500 text-sm">Monthly statistics</p>
            </div>
            <Button
              className="mt-2 sm:mt-0"
              variant="flat"
              size="sm"
              color="primary"
            >
              Download Report
            </Button>
          </div>
          <div className="h-[200px] flex items-center justify-center">
            {/* Add your chart component here */}
            <BarChart3 className="w-16 h-16 text-default-300" />
          </div>
        </CardBody>
      </Card>

      {/* Bottom Row */}
      <Card className="lg:col-span-2 bg-background/60 backdrop-blur-md shadow-medium rounded-[2.5rem] border-medium border-default">
        <CardBody className="gap-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div>
              <h3 className="text-xl font-semibold">Team Members</h3>
              <p className="text-default-500 text-sm">Project collaborators</p>
            </div>
            <Button
              className="mt-2 sm:mt-0"
              variant="flat"
              size="sm"
              color="primary"
              startContent={<Users className="w-4 h-4" />}
            >
              Add Member
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Team Member Cards */}
            {/* Add your team member components here */}
          </div>
        </CardBody>
      </Card>

      <Card className="lg:col-span-2 bg-background/60 backdrop-blur-md shadow-medium rounded-[2.5rem] border-medium border-default">
        <CardBody className="gap-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div>
              <h3 className="text-xl font-semibold">Growth</h3>
              <p className="text-default-500 text-sm">Project progress</p>
            </div>
            <Button
              className="mt-2 sm:mt-0"
              variant="flat"
              size="sm"
              color="primary"
              startContent={<TrendingUp className="w-4 h-4" />}
            >
              Generate Report
            </Button>
          </div>
          <div className="h-[200px] flex items-center justify-center">
            {/* Add your growth chart component here */}
            <TrendingUp className="w-16 h-16 text-default-300" />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Overview; 