import type { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getUserById, UserCard } from '@/features/users';

type UserPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: UserPageProps): Promise<Metadata> {
  const { id } = await params;
  const user = await getUserById(id);

  return {
    title: user ? `${user.name} — Профиль` : 'Пользователь не найден',
  };
}

async function UserDetailContent({ params }: UserPageProps) {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  return <UserCard user={user} />;
}

export default function UserDetailPage({ params }: UserPageProps) {
  return (
    <Suspense fallback={<div className="text-sm text-muted-foreground">Загрузка профиля...</div>}>
      <UserDetailContent params={params} />
    </Suspense>
  );
}
