import { Injectable } from '@nestjs/common';
import { IUser } from 'src/types';

@Injectable()
export class DatabaseService {
  public users: IUser[];

  constructor() {
    this.users = [];
  }
}
