"use client";
import React from 'react';
import { Card, CardBody, Switch} from "@nextui-org/react";
import {

  Mail,
  MessageSquare,

} from "lucide-react";




export const NotificationSettings = () => (
    <Card className="bg-background shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50">
      <CardBody className="p-6 space-y-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
            Notification Preferences
          </h2>
          <p className="text-foreground/60">
            Choose how you want to be notified about activity
          </p>
        </div>
  
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Communication Channels</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NotificationChannel
                icon={<Mail />}
                title="Email Notifications"
                description="Get notified via email"
              />
              <NotificationChannel
                icon={<MessageSquare />}
                title="Push Notifications"
                description="Receive push notifications"
              />
            </div>
          </div>
  
          <div className="space-y-4">
            <h3 className="font-medium">Notification Types</h3>
            <div className="space-y-4">
              <NotificationPreference
                title="Project Updates"
                description="Notifications about your project activity"
              />
              <NotificationPreference
                title="Comments"
                description="When someone comments on your posts"
              />
              <NotificationPreference
                title="Mentions"
                description="When someone mentions you"
              />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
  
  const NotificationChannel = ({ icon, title, description }) => (
    <div className="flex items-center justify-between p-4 bg-content2 rounded-xl">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-primary/10">
          {React.cloneElement(icon, { size: 20, className: "text-primary" })}
        </div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-foreground/60">{description}</p>
        </div>
      </div>
      <Switch defaultSelected />
    </div>
  );
  
  const NotificationPreference = ({ title, description }) => (
    <div className="flex items-center justify-between p-4 bg-content2 rounded-xl">
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-foreground/60">{description}</p>
      </div>
      <Switch defaultSelected />
    </div>
  );