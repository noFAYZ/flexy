// lib/settings-meta.ts
import { MetadataRoute } from 'next';

export type SettingsSection = 
  | 'profile'
  | 'security'
  | 'notifications'
  | 'appearance'
  | 'billing';

interface SettingsMetaConfig {
  title: string;
  description: string;
  path: string;
}

export const settingsConfig: Record<SettingsSection, SettingsMetaConfig> = {
  profile: {
    title: 'Profile Settings',
    description: 'Update your profile information and preferences.',
    path: '/settings/profile',
  },
  security: {
    title: 'Security Settings',
    description: 'Manage your account security and authentication methods.',
    path: '/settings/security',
  },
  notifications: {
    title: 'Notification Preferences',
    description: 'Customize your notification settings and preferences.',
    path: '/settings/notifications',
  },
  appearance: {
    title: 'Appearance Settings',
    description: 'Customize the look and feel of your deFlexy experience.',
    path: '/settings/appearance',
  },
  billing: {
    title: 'Billing & Payments',
    description: 'Manage your billing information and view payment history.',
    path: '/settings/billing',
  },
};

// Generate sitemap entries for settings pages
export function generateSettingsSitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://deflexy.com';

  return Object.values(settingsConfig).map(({ path }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));
}

// Generate robots.txt rules for settings pages
export function generateSettingsRobots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/settings/',
      disallow: [
        '/settings/billing',  // Protect sensitive pages
        '/settings/security',
      ],
    },
    sitemap: 'https://deflexy.com/sitemap.xml',
  };
}

// Generate manifest data for settings
export function generateSettingsManifest(): MetadataRoute.Manifest {
  return {
    name: 'deFlexy Settings',
    short_name: 'Settings',
    description: 'Manage your deFlexy account settings and preferences',
    start_url: '/settings',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#f43f5e',
    icons: [
      {
        src: '/icons/settings-icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/settings-icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}