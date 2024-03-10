import { Injectable } from '@nestjs/common';
import { IArtist, ITrack, IUser } from 'src/types';
import { IAlbum } from 'src/types/album';

@Injectable()
export class DatabaseService {
  public users: IUser[];
  public artists: IArtist[];
  public tracks: ITrack[];
  public albums: IAlbum[];

  constructor() {
    this.users = [];
    this.artists = [];
    this.tracks = [];
    this.albums = [];
  }
}
