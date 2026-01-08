import './globals.css';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Notes App',
  description: 'Notes management app built with Next.js and MongoDB',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="container py-8">{children}</main>
        <footer className="border-t bg-white/70">
          <div className="container py-8 text-sm text-gray-500">
            Built with Next.js, MongoDB, and Tailwind CSS
          </div>
        </footer>
      </body>
    </html>
  );
}
