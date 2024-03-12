import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import {
  ChangeAlbumError,
  IAlbum,
  IChangeAlbumResult,
  ICreateAlbumDto,
} from 'src/types';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumService {
  constructor(private databaseService: DatabaseService) {}

  getAlbums(): IAlbum[] {
    return this.databaseService.albums;
  }

  getAlbum(albumId: string): IAlbum | undefined {
    return this.databaseService.albums.find((album) => album.id === albumId);
  }

  createAlbum(album: ICreateAlbumDto): IAlbum {
    const newAlbum: IAlbum = {
      ...album,
      id: uuidv4(),
    };
    this.databaseService.albums.push(newAlbum);
    return newAlbum;
  }

  updateAlbum(albumId: string, data: ICreateAlbumDto): IChangeAlbumResult {
    const album = this.getAlbum(albumId);
    if (!album) {
      return {
        data: null,
        error: ChangeAlbumError.NOT_FOUND,
      };
    }

    album.name = data.name;
    album.artistId = data.artistId;
    album.year = data.year;

    return {
      data: album,
      error: null,
    };
  }

  deleteAlbum(albumId: string): IChangeAlbumResult {
    const albumIndex = this.databaseService.albums.findIndex(
      (album) => album.id === albumId,
    );
    if (albumIndex === -1) {
      return {
        data: null,
        error: ChangeAlbumError.NOT_FOUND,
      };
    }

    this.databaseService.albums.splice(albumIndex, 1);

    // check favorites
    const albumIndexInFavs = this.databaseService.favorites.albums.findIndex(
      (currAlbumId) => currAlbumId === albumId,
    );
    if (albumIndexInFavs > -1) {
      this.databaseService.favorites.albums.splice(albumIndexInFavs, 1);
    }

    // chack tracks
    this.databaseService.tracks.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });

    return {
      data: null,
      error: null,
    };
  }
}
