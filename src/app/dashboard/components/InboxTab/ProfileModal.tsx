import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Avatar,
  Switch,
  Tabs,
  Tab,
  Chip,
  Divider,
  Select,
  SelectItem,
  Badge
} from "@nextui-org/react";
import {
  User,
  Mail,
  Phone,
  Globe,
  Bell,
  Moon,
  Shield,
  Key,
  Edit,
  Camera,
  Clock,
  Languages,
  LogOut,
  Trash2,
  Upload,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Palette
} from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: string;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  theme
}) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Profile state
  const [profile, setProfile] = useState({
    name: "John Doe",
    bio: "Senior Product Designer",
    email: "john@example.com",
    phone: "+1 234 567 890",
    avatar: "/api/placeholder/150/150",
    status: "active",
    language: "english",
    timezone: "UTC-5",
    darkMode: false,
    notifications: {
      messages: true,
      mentions: true,
      groupInvites: true,
      emailNotifications: false
    },
    privacy: {
      showStatus: true,
      showLastSeen: true,
      readReceipts: true
    },
    password: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle avatar upload
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(prev => ({
          ...prev,
          avatar: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    // Handle save changes
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    // Handle account deletion
  };

  const timezones = [
    { label: "Pacific Time (UTC-8)", value: "UTC-8" },
    { label: "Eastern Time (UTC-5)", value: "UTC-5" },
    { label: "UTC", value: "UTC+0" },
    { label: "Central European Time (UTC+1)", value: "UTC+1" },
    { label: "India (UTC+5:30)", value: "UTC+5:30" }
  ];

  const languages = [
    { label: "English", value: "english" },
    { label: "Spanish", value: "spanish" },
    { label: "French", value: "french" },
    { label: "German", value: "german" },
    { label: "Chinese", value: "chinese" }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <span>Profile Settings</span>
          </div>
        </ModalHeader>

        <ModalBody>
          <Tabs 
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(key as string)}
          >
            <Tab
              key="profile"
              title={
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profile
                </div>
              }
            >
              <div className="space-y-6 py-4">
                {/* Avatar Section */}
                <div className="text-center">
                  <div className="relative inline-block group">
                    <Avatar
                      src={profile.avatar}
                      className="w-32 h-32"
                      isBordered
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        isIconOnly
                        className={`bg-gradient-to-r ${theme} text-white`}
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                    />
                  </div>

                  <div className="mt-4">
                    <Chip
                      color="success"
                      variant="dot"
                      className="mb-2"
                    >
                      Active Now
                    </Chip>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="space-y-4">
                  <div>
                    <Input
                      label="Full Name"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        name: e.target.value
                      }))}
                      startContent={<User className="w-4 h-4 text-default-400" />}
                    />
                  </div>
                  
                  <div>
                    <Input
                      label="Bio"
                      value={profile.bio}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        bio: e.target.value
                      }))}
                    />
                  </div>

                  <div>
                    <Input
                      label="Email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        email: e.target.value
                      }))}
                      startContent={<Mail className="w-4 h-4 text-default-400" />}
                    />
                  </div>

                  <div>
                    <Input
                      label="Phone"
                      value={profile.phone}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        phone: e.target.value
                      }))}
                      startContent={<Phone className="w-4 h-4 text-default-400" />}
                    />
                  </div>
                </div>

                {/* Preferences */}
                <Divider />
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Preferences</h4>
                  
                  <div>
                    <Select
                      label="Language"
                      value={profile.language}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        language: e.target.value
                      }))}
                      startContent={<Languages className="w-4 h-4 text-default-400" />}
                    >
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <Select
                      label="Timezone"
                      value={profile.timezone}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        timezone: e.target.value
                      }))}
                      startContent={<Globe className="w-4 h-4 text-default-400" />}
                    >
                      {timezones.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Moon className="w-4 h-4" />
                      <span>Dark Mode</span>
                    </div>
                    <Switch
                      isSelected={profile.darkMode}
                      onValueChange={(value) => setProfile(prev => ({
                        ...prev,
                        darkMode: value
                      }))}
                    />
                  </div>
                </div>
              </div>
            </Tab>

            <Tab
              key="notifications"
              title={
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Notifications
                </div>
              }
            >
              <div className="space-y-6 py-4">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Notification Settings</h4>
                  
                  {Object.entries(profile.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-sm text-default-500">
                          Receive notifications for {key.toLowerCase()}
                        </p>
                      </div>
                      <Switch
                        isSelected={value}
                        onValueChange={(checked) => setProfile(prev => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            [key]: checked
                          }
                        }))}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Tab>

            <Tab
              key="privacy"
              title={
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Privacy
                </div>
              }
            >
              <div className="space-y-6 py-4">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Privacy Settings</h4>
                  
                  {Object.entries(profile.privacy).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-sm text-default-500">
                          Control who can see your {key.toLowerCase()}
                        </p>
                      </div>
                      <Switch
                        isSelected={value}
                        onValueChange={(checked) => setProfile(prev => ({
                          ...prev,
                          privacy: {
                            ...prev.privacy,
                            [key]: checked
                          }
                        }))}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Tab>

            <Tab
              key="security"
              title={
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  Security
                </div>
              }
            >
              <div className="space-y-6 py-4">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Change Password</h4>
                  
                  <Input
                    type={showPassword ? "text" : "password"}
                    label="Current Password"
                    value={profile.password}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      password: e.target.value
                    }))}
                    endContent={
                      <Button
                        isIconOnly
                        variant="light"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    }
                  />

                  <Input
                    type={showPassword ? "text" : "password"}
                    label="New Password"
                    value={profile.newPassword}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      newPassword: e.target.value
                    }))}
                  />

                  <Input
                    type={showPassword ? "text" : "password"}
                    label="Confirm New Password"
                    value={profile.confirmPassword}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      confirmPassword: e.target.value
                    }))}
                  />

                  <Button
                    className={`bg-gradient-to-r ${theme} text-white`}
                    onClick={handleSaveChanges}
                  >
                    Update Password
                  </Button>
                </div>

                <Divider />

                <div>
                  <h4 className="text-lg font-semibold text-danger">
                    Danger Zone
                  </h4>
                  <p className="text-sm text-default-500 mb-4">
                    Once you delete your account, there is no going back.
                  </p>
                  <Button
                    color="danger"
                    variant="flat"
                    startContent={<Trash2 className="w-4 h-4" />}
                    onClick={handleDeleteAccount}
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </Tab>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button
            className={`bg-gradient-to-r ${theme} text-white`}
            onPress={handleSaveChanges}
          >
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};