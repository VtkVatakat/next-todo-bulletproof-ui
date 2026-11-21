import { readDb } from '@/lib/db';
import { userSchema, usersListSchema } from '../types/schema';
import type { User } from '../types/schema';

type DbUsersSchema = {
  users: unknown;
};

export async function getUsers(): Promise<User[]> {
  const db = await readDb<DbUsersSchema>();
  return usersListSchema.parse(db.users);
}

export async function getUserById(id: string): Promise<User | null> {
  const users = await getUsers();
  const found = users.find((user) => user.id === id);

  if (!found) {
    return null;
  }

  return userSchema.parse(found);
}
