import { Injectable } from '@nestjs/common';
import { IArtist, ITrack, IUser } from 'src/types';

@Injectable()
export class DatabaseService {
  public users: IUser[];
  public artists: IArtist[];
  public tracks: ITrack[];

  constructor() {
    this.users = [];
    this.artists = [];
    this.tracks = [];
  }
}
