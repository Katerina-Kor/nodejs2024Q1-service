import { User } from '@prisma/client';

export const userSelect = {
  id: true,
  login: true,
  version: true,
  createdAt: true,
  updatedAt: true,
};

export const convertTime = (user: Omit<User, 'password'>) => {
  return {
    ...user,
    createdAt: new Date(user.createdAt).getTime(),
    updatedAt: new Date(user.updatedAt).getTime(),
  };
};
