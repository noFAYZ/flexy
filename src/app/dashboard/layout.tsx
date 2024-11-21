import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | DeFlexy',
  description: 'Manage your projects, payments, and freelance talent.',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 