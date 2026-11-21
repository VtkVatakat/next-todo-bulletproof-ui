import Link from 'next/link';
import { ArrowLeft, Building2, Globe, Mail, MapPin, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { User } from '../types/schema';

type UserCardProps = {
  user: User;
};

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-4">
      <div>
        <Button asChild variant="outline" size="sm">
          <Link href="/users">
            <ArrowLeft />
            Назад к списку
          </Link>
        </Button>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-xl">{user.name}</CardTitle>
            <Badge variant="secondary">ID: {user.id}</Badge>
          </div>
          <CardDescription>@{user.username}</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-3 text-sm">
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <Mail className="size-4 shrink-0 text-foreground" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <Phone className="size-4 shrink-0 text-foreground" />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <Globe className="size-4 shrink-0 text-foreground" />
            <span>{user.website}</span>
          </div>
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <MapPin className="size-4 shrink-0 text-foreground" />
            <span>
              г. {user.address.city}, {user.address.street}
            </span>
          </div>
          <div className="mt-2 rounded-lg border bg-muted/40 p-3">
            <div className="flex items-center gap-2 font-medium">
              <Building2 className="size-4 shrink-0" />
              <span>{user.company.name}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">«{user.company.catchPhrase}»</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
