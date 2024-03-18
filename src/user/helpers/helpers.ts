import { User } from '@prisma/client';

export function excludePassword(user: User): Omit<User, 'password'> {
  const resUser = { ...user };
  delete resUser.password;
  return resUser;
}
