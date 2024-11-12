import React, { useState } from "react";
import { Tabs, Tab, Card, Button, Switch, Input, Select, SelectItem, Avatar, Divider } from "@nextui-org/react";
import { Bell, Shield, Wallet, User, Globe, Key, CreditCard, Mail, Lock, Users } from "lucide-react";
import SettingsPage from "@/app/user/settings/page";

export const SettingsTab = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
   <SettingsPage />
  );
};

const AccountSettings = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold">Account Settings</h3>
    
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Avatar src="https://avatar.iran.liara.run/public" className="w-20 h-20" />
        <div>
          <Button size="sm">Change Avatar</Button>
          <p className="text-xs text-default-500 mt-1">JPG, GIF or PNG. Max size 2MB</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input label="First Name" placeholder="John" />
        <Input label="Last Name" placeholder="Doe" />
        <Input label="Email" placeholder="john@example.com" type="email" />
        <Input label="Phone" placeholder="+1 234 567 890" type="tel" />
      </div>

      <div className="space-y-2">
        <p className="font-medium">Account Type</p>
        <div className="flex gap-4">
          <Button className="flex-1 bg-primary text-white">Client</Button>
          <Button className="flex-1">Freelancer</Button>
        </div>
      </div>
    </div>
  </div>
);

const ProfileSettings = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold">Profile Settings</h3>
    
    {/* Client Profile Section */}
    <div className="space-y-4">
      <h4 className="font-medium">Client Profile</h4>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Company Name" placeholder="Your Company" />
        <Input label="Industry" placeholder="Technology" />
        <Select label="Company Size" placeholder="Select company size">
          {["1-10", "11-50", "51-200", "201-500", "500+"].map((size) => (
            <SelectItem key={size} value={size}>{size} employees</SelectItem>
          ))}
        </Select>
        <Input label="Website" placeholder="https://example.com" />
      </div>
      <Input label="Company Description" placeholder="Tell us about your company" />
    </div>

    {/* Freelancer Profile Section */}
    <Divider className="my-6" />
    <div className="space-y-4">
      <h4 className="font-medium">Freelancer Profile</h4>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Professional Title" placeholder="Senior Developer" />
        <Select label="Experience Level" placeholder="Select experience">
          {["Entry", "Intermediate", "Expert"].map((level) => (
            <SelectItem key={level} value={level}>{level}</SelectItem>
          ))}
        </Select>
        <Input label="Hourly Rate" placeholder="$50" />
        <Input label="Skills" placeholder="React, Node.js, TypeScript" />
      </div>
      <Input label="Professional Summary" placeholder="Your professional background" />
    </div>
  </div>
);

const SecuritySettings = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold">Security Settings</h3>
    
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="font-medium">Change Password</h4>
        <div className="grid gap-4">
          <Input label="Current Password" type="password" />
          <Input label="New Password" type="password" />
          <Input label="Confirm New Password" type="password" />
        </div>
      </div>

      <Divider />

      <div className="space-y-2">
        <h4 className="font-medium">Two-Factor Authentication</h4>
        <Switch defaultSelected>Enable 2FA</Switch>
      </div>

      <Divider />

      <div className="space-y-2">
        <h4 className="font-medium">Login History</h4>
        {/* Add login history component */}
      </div>
    </div>
  </div>
);

const BillingSettings = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold">Billing Settings</h3>
    
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="font-medium">Payment Methods</h4>
        {/* Add payment methods component */}
      </div>

      <Divider />

      <div className="space-y-2">
        <h4 className="font-medium">Billing History</h4>
        {/* Add billing history component */}
      </div>

      <Divider />

      <div className="space-y-2">
        <h4 className="font-medium">Billing Information</h4>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Billing Name" />
          <Input label="Billing Email" />
          <Input label="Address Line 1" />
          <Input label="Address Line 2" />
          <Input label="City" />
          <Input label="Country" />
        </div>
      </div>
    </div>
  </div>
);

const NotificationSettings = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold">Notification Settings</h3>
    
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="font-medium">Email Notifications</h4>
        <div className="space-y-3">
          <Switch defaultSelected>Project updates</Switch>
          <Switch defaultSelected>New messages</Switch>
          <Switch defaultSelected>Payment notifications</Switch>
          <Switch defaultSelected>Security alerts</Switch>
        </div>
      </div>

      <Divider />

      <div className="space-y-2">
        <h4 className="font-medium">Push Notifications</h4>
        <div className="space-y-3">
          <Switch defaultSelected>Project updates</Switch>
          <Switch defaultSelected>New messages</Switch>
          <Switch defaultSelected>Payment notifications</Switch>
        </div>
      </div>
    </div>
  </div>
);
