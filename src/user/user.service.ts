import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import {
  ChangeUserError,
  IChangeUserResult,
  ICreateUserDto,
  IUpdatePasswordDto,
  IUser,
} from 'src/types';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}

  getUsers(): IUser[] {
    return this.databaseService.users;
  }

  getUser(userId: string): IUser | undefined {
    return this.databaseService.users.find((user) => user.id === userId);
  }

  createUser(user: ICreateUserDto): IUser {
    const timestamp = Date.now();
    const newUser: IUser = {
      ...user,
      version: 1,
      id: uuidv4(),
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    this.databaseService.users.push(newUser);
    return newUser;
  }

  changeUserPassword(
    userId: string,
    data: IUpdatePasswordDto,
  ): IChangeUserResult {
    const user = this.getUser(userId);
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
    return {
      data: user,
      error: null,
    };
  }

  deleteUser(userId: string) {
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
