import Link from 'next/link';
import { ArrowRight, Building2, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { User } from '../types/schema';

type UsersListProps = {
  users: User[];
};

export function UsersList({ users }: UsersListProps) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Пользователи</h1>
          <p className="text-sm text-muted-foreground">
            Server Components + локальный db.json + Zod + динамический роутинг /users/[id]
          </p>
        </div>
        <Badge variant="secondary">Всего: {users.length}</Badge>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {users.map((user) => (
          <Card key={user.id} className="flex flex-col justify-between transition-shadow hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base">{user.name}</CardTitle>
                <Badge variant="outline">@{user.username}</Badge>
              </div>
              <CardDescription className="flex items-center gap-1.5 pt-1">
                <Mail className="size-3.5 shrink-0" />
                <span className="truncate">{user.email}</span>
              </CardDescription>
            </CardHeader>

            <CardContent className="flex items-center justify-between gap-2 pt-0">
              <div className="flex items-center gap-1.5 overflow-hidden text-xs text-muted-foreground">
                <Building2 className="size-3.5 shrink-0" />
                <span className="truncate">{user.company.name}</span>
              </div>

              <Button asChild variant="ghost" size="sm" className="shrink-0">
                <Link href={`/users/${user.id}`}>
                  Профиль
                  <ArrowRight />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
