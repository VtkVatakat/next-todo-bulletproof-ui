'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CheckSquare, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const pathname = usePathname();

  const isTodosActive = pathname === '/';
  const isUsersActive = pathname.startsWith('/users');

  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <Link href="/" className="text-sm font-bold tracking-tight">
          Next.js Bulletproof App
        </Link>

        <nav className="flex items-center gap-2">
          <Button asChild variant={isTodosActive ? 'default' : 'ghost'} size="sm">
            <Link href="/">
              <CheckSquare />
              Задачи
            </Link>
          </Button>
          <Button asChild variant={isUsersActive ? 'default' : 'ghost'} size="sm">
            <Link href="/users">
              <Users />
              Пользователи
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
