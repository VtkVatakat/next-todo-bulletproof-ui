import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Navbar } from '@/components/navbar';
import { AppProvider } from './provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Next.js App Router + Bulletproof React + shadcn/ui',
  description: 'Fullstack приложение на Next.js App Router, RTK Query, Zod и shadcn/ui',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-muted/40">
        <AppProvider>
          <Suspense fallback={<div className="h-14 border-b bg-background" />}>
            <Navbar />
          </Suspense>
          <main className="px-4 py-8">{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
