"use client";
import React from 'react';
import { Card, CardBody, Avatar, Button, Input  } from "@nextui-org/react";
import { Save, X } from 'lucide-react';


export const ProfileSettings = () => (
    <Card className="bg-background shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50">
      <CardBody className="p-6 space-y-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
            Profile Settings
          </h2>
          <p className="text-foreground/60">
            Manage your profile information and preferences
          </p>
        </div>
  
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <Avatar
            src="https://avatar.iran.liara.run/public"
            className="w-24 h-24"
            isBordered
          />
          <div className="space-y-2">
            <h3 className="font-medium">Profile Photo</h3>
            <p className="text-sm text-foreground/60">
              Upload a new profile photo or remove the current one
            </p>
            <div className="flex gap-2">
              <Button size="sm" className="bg-gradient-to-r from-pink-500 to-orange-500 text-white">
                Upload New
              </Button>
              <Button size="sm" variant="bordered">
                Remove
              </Button>
            </div>
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input 
              placeholder="Enter your full name"
              defaultValue="Sophia Rodriguez"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Display Name</label>
            <Input 
              placeholder="Enter your display name"
              defaultValue="@sophiarodriguez"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input 
              type="email"
              placeholder="Enter your email"
              defaultValue="sophia@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <Input 
              type="tel"
              placeholder="Enter your phone number"
              defaultValue="+1 234 567 8900"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Bio</label>
            <Input 
              placeholder="Tell us about yourself"
              defaultValue="Full Stack Developer & UX/UI Designer"
            />
          </div>
        </div>
  
        <div className="flex justify-end gap-2">
          <Button
            size="sm"
            variant="light"
            color="danger"
            startContent={<X size={16} />}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-pink-500 to-orange-500 text-white"
            startContent={<Save size={16} />}
          >
            Save Changes
          </Button>
        </div>
      </CardBody>
    </Card>
  );