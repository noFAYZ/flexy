"use client";
import React from 'react';
import { Card, CardBody,  Switch,  Button, } from "@nextui-org/react";
import {
  Lock,
  Activity,
  Eye,
} from "lucide-react";



export const SecuritySettings = () => (
    <Card className="bg-background shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50">
      <CardBody className="p-6 space-y-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
            Security Settings
          </h2>
          <p className="text-foreground/60">
            Manage your account security and authentication methods
          </p>
        </div>
  
        <div className="space-y-6">
          <div className="flex justify-between items-center p-4 bg-content2 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-success/10">
                <Lock className="w-5 h-5 text-success" />
              </div>
              <div>
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-foreground/60">Add an extra layer of security</p>
              </div>
            </div>
            <Switch defaultSelected color="success" />
          </div>
  
          <div className="flex justify-between items-center p-4 bg-content2 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Login Activity</h3>
                <p className="text-sm text-foreground/60">Monitor your account activity</p>
              </div>
            </div>
            <Button size="sm" variant="flat">View Activity</Button>
          </div>
  
          <div className="flex justify-between items-center p-4 bg-content2 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-warning/10">
                <Eye className="w-5 h-5 text-warning" />
              </div>
              <div>
                <h3 className="font-medium">Password</h3>
                <p className="text-sm text-foreground/60">Last changed 3 months ago</p>
              </div>
            </div>
            <Button 
              size="sm"
              className="bg-gradient-to-r from-pink-500 to-orange-500 text-white"
            >
              Change Password
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );