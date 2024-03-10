import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import {
  ChangeUserError,
  IChangeUserResult,
  ICreateUserDto,
  IResponseUser,
  IUpdatePasswordDto,
  IUser,
} from 'src/types';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}

  getUsers(): IResponseUser[] {
    return this.databaseService.users.map((user) => {
      const resUser = { ...user };
      delete resUser.password;
      return resUser;
    });
  }

  getUser(userId: string): IResponseUser | undefined {
    const user = this.databaseService.users.find((user) => user.id === userId);
    if (!user) return undefined;
    const resUser = { ...user };
    delete resUser.password;
    return resUser;
  }

  createUser(user: ICreateUserDto): IResponseUser {
    const timestamp = Date.now();
    const newUser: IUser = {
      ...user,
      version: 1,
      id: uuidv4(),
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    this.databaseService.users.push(newUser);
    const resUser = { ...newUser };
    delete resUser.password;
    return resUser;
  }

  changeUserPassword(
    userId: string,
    data: IUpdatePasswordDto,
  ): IChangeUserResult {
    const user = this.databaseService.users.find((user) => user.id === userId);
    if (!user) {
      return {
        data: null,
        error: ChangeUserError.NOT_FOUND,
      };
    }

    if (user.password !== data.oldPassword) {
      return {
        data: null,
        error: ChangeUserError.WRONG_PASSWORD,
      };
    }

    user.password = data.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    const resUser = { ...user };
    delete resUser.password;
    return {
      data: resUser,
      error: null,
    };
  }

  deleteUser(userId: string): IChangeUserResult {
    const userIndex = this.databaseService.users.findIndex(
      (user) => user.id === userId,
    );
    if (userIndex === -1) {
      return {
        data: null,
        error: ChangeUserError.NOT_FOUND,
      };
    }

    this.databaseService.users.splice(userIndex, 1);

    return {
      data: null,
      error: null,
    };
  }
}
