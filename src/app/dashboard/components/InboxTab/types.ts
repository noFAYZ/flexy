export interface MessageAttachment {
  id: string;
  type: 'image' | 'file' | 'voice';
  url: string;
  name?: string;
  size?: string;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  sender?: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  edited?: boolean;
  attachment?: MessageAttachment;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  status?: 'online' | 'offline';
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  messages: Message[];
  participants: User[];
  lastMessage?: Message;
  unreadCount?: number;
  isOnline?: boolean;
  type?: 'direct' | 'group';
  category?: 'project' | 'job';
  project?: ProjectDetails;
  members?: Member[];
  media?: MediaItem[];
  files?: FileItem[];
}

export interface ProjectDetails {
  name: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed';
  deadline: string;
  progress: number;
  tasks: {
    completed: number;
    total: number;
  };
  files: Array<{
    name: string;
    type: string;
    size: string;
    url: string;
  }>;
  links: Array<{
    name: string;
    url: string;
    icon: string;
  }>;
}

export interface Member {
  id: string;
  name: string;
  avatar: string;
  role?: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: Date;
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  date: Date;
}

export interface FileItem {
  id: string;
  name: string;
  type: string;
  size: string;
  url: string;
  uploadedBy: string;
  uploadedAt: Date;
}