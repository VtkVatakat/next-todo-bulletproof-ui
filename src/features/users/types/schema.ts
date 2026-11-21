import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  phone: z.string(),
  website: z.string(),
  company: z.object({
    name: z.string(),
    catchPhrase: z.string(),
  }),
  address: z.object({
    city: z.string(),
    street: z.string(),
  }),
});

export const usersListSchema = z.array(userSchema);

export type User = z.infer<typeof userSchema>;
