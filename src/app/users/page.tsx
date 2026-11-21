import type { Metadata } from 'next';
import { getUsers, UsersList } from '@/features/users';

export const metadata: Metadata = {
  title: 'Пользователи — Next.js App Router',
};

export default async function UsersPage() {
  const users = await getUsers();
  return <UsersList users={users} />;
}
