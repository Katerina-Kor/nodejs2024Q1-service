import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICreateUserDto, IUpdatePasswordDto } from './helpers/types';
import { convertTime, userSelect } from './helpers/helpers';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    const users = await this.prisma.user.findMany({
      select: userSelect,
    });
    return users.map((user) => convertTime(user));
  }

  async getUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: userSelect,
    });

    if (!user) {
      throw new NotFoundException('User with this id is not found');
    }
    return convertTime(user);
  }

  async createUser(createUserDto: ICreateUserDto) {
    const user = await this.prisma.user.create({
      data: createUserDto,
      select: userSelect,
    });
    return convertTime(user);
  }

  async changeUserPassword(userId: string, data: IUpdatePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User with this id is not found');
    }
    if (user.password !== data.oldPassword) {
      throw new ForbiddenException('Wrong password');
    }
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        password: data.newPassword,
        version: user.version + 1,
      },
      select: userSelect,
    });
    return convertTime(updatedUser);
  }

  async deleteUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User with this id is not found');
    }
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
