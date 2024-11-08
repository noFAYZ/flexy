import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | deFlexy Settings',
    default: 'Settings | deFlexy',
  },
  description: 'Manage your account settings and preferences on deFlexy.',
  openGraph: {
    title: 'deFlexy Settings',
    description: 'Manage your account settings and preferences on deFlexy.',
    url: 'https://deflexy.com/settings',
    siteName: 'deFlexy',
    images: [
      {
        url: 'https://deflexy.com/og-settings.png',
        width: 1200,
        height: 630,
        alt: 'deFlexy Settings',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'deFlexy Settings',
    description: 'Manage your account settings and preferences on deFlexy.',
    creator: '@deflexy',
    images: ['https://deflexy.com/og-settings.png'],
  },
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    < >
      {children}
    </>
  );
}