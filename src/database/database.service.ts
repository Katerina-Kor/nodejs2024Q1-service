import { Injectable } from '@nestjs/common';
import { IArtist, IUser } from 'src/types';

@Injectable()
export class DatabaseService {
  public users: IUser[];
  public artists: IArtist[];

  constructor() {
    this.users = [];
    this.artists = [];
  }
}
