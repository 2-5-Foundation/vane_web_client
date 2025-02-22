import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import MobileRedirect from '@/components/MobileRedirect';
import { ThemeProvider } from '@/components/settings/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WalletTracker - Manage Your Finances',
  description: 'Track and manage your financial transactions across multiple wallets',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MobileRedirect />
     
        <Navbar />
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
          {children}
        </main>

      </body>
    </html>
  );
}