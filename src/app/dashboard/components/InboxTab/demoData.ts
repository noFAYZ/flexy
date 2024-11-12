import { ReactNode } from "react";
import { Chat, Message, User, ProjectDetails } from './types';

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const DEMO_USERS = {
  current: {
    id: 'current-user',
    name: 'You',
    avatar: '/api/placeholder/40/40',
    status: 'online' as const
  },
  contacts: [
    {
      id: '2',
      name: 'Alice Smith',
      avatar: '/api/placeholder/40/40',
      status: 'online' as const
    },
    {
      id: '3',
      name: 'Bob Johnson',
      avatar: '/api/placeholder/40/40',
      status: 'offline' as const
    },
    {
      id: '4',
      name: 'Project X Team',
      avatar: '/api/placeholder/40/40',
      status: 'online' as const
    }
  ]
};

export const DEMO_MESSAGES: Message[] = [
  {
    id: '1',
    content: 'Hey, how\'s the progress on the design system?',
    timestamp: formatDate(new Date('2024-03-10T08:00:00')),
    senderId: '2',
    status: 'read'
  },
  {
    id: '2',
    content: 'Making good progress! Just finished the component library.',
    timestamp: formatDate(new Date('2024-03-10T08:05:00')),
    senderId: 'current-user',
    status: 'read'
  },
  {
    id: '3',
    content: 'Great! Can you share the latest designs? 🎨',
    timestamp: formatDate(new Date('2024-03-10T08:10:00')),
    senderId: '2',
    status: 'read'
  }
];

export const DEMO_CHATS: Chat[] = [
  {
    id: '1',
    participants: [DEMO_USERS.contacts[0]],
    messages: DEMO_MESSAGES,
    category: 'project',
    name: 'Design Team',
    avatar: '/api/placeholder/40/40',
    isOnline: true,
    lastMessage: DEMO_MESSAGES[DEMO_MESSAGES.length - 1],
    unreadCount: 3,
    project: {
      name: 'Design System 2.0',
      status: 'in-progress',
      deadline:'2024-04-01',
      progress: 75,
      tasks: { completed: 15, total: 20 },
      files: [{ name: 'design-spec.pdf', type: 'pdf', size: '2.4MB', url: '/files/design-spec.pdf' }],
      links: [{ name: 'Figma', url: 'https://figma.com', icon: 'figma' }]
    }
  },
  {
    id: '2',
    participants: [DEMO_USERS.contacts[1]],
    messages: DEMO_MESSAGES.map(msg => ({...msg, senderId: '3'})),
    category: 'job',
    name: 'Bob Johnson',
    avatar: '/api/placeholder/40/40',
    isOnline: false,
    lastMessage: {
      id: '2',
      content: 'Can you review the latest PR? 👀',
      timestamp: '2024-03-10T09:15:00',
      senderId: '3',
      status: 'delivered'
    },
    unreadCount: 1
  },
  {
    id: '3',
    participants: [{ id: '4', name: 'Project X Team', avatar: '/api/placeholder/40/40', status: 'online' }],
    messages: DEMO_MESSAGES.map(msg => ({...msg, senderId: '4'})),
    category: 'project',
    name: 'Project X Team',
    avatar: '/api/placeholder/40/40',
    isOnline: true,
    lastMessage: {
      id: '3',
      content: 'Sprint planning meeting at 2 PM 📅',
      timestamp: '2024-03-09T16:45:00',
      senderId: '4',
      status: 'read'
    },
    unreadCount: 0,
    project: {
      name: 'Project X',
      status: 'planning',
      deadline: '2024-05-01',
      progress: 25,
      tasks: { completed: 5, total: 20 },
      files: [{ name: 'roadmap.pdf', type: 'pdf', size: '1.2MB', url: '/files/roadmap.pdf' }],
      links: [{ name: 'Jira', url: 'https://jira.com', icon: 'jira' }]
    }
  }
];

export const DEMO_CHAT: Chat = {
  id: 'demo-chat',
  name: 'Demo Chat',
  avatar: '/path/to/chat-avatar.jpg',
  messages: [],
  participants: [DEMO_USERS.current]
}; 