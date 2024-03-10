import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import {
  ChangeArtistError,
  IArtist,
  IChangeArtistResult,
  ICreateArtistDto,
} from 'src/types';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistService {
  constructor(private databaseService: DatabaseService) {}

  getArtists(): IArtist[] {
    return this.databaseService.artists;
  }

  getArtist(artistId: string): IArtist | undefined {
    return this.databaseService.artists.find(
      (artist) => artist.id === artistId,
    );
  }

  createArtist(artist: ICreateArtistDto): IArtist {
    const newArtist: IArtist = {
      ...artist,
      id: uuidv4(),
    };
    this.databaseService.artists.push(newArtist);
    return newArtist;
  }

  updateArtist(artistId: string, data: ICreateArtistDto): IChangeArtistResult {
    const artist = this.getArtist(artistId);
    if (!artist) {
      return {
        data: null,
        error: ChangeArtistError.NOT_FOUND,
      };
    }

    artist.name = data.name;
    artist.grammy = data.grammy;

    return {
      data: artist,
      error: null,
    };
  }

  deleteArtist(artistId: string): IChangeArtistResult {
    const artistIndex = this.databaseService.artists.findIndex(
      (artist) => artist.id === artistId,
    );
    if (artistIndex === -1) {
      return {
        data: null,
        error: ChangeArtistError.NOT_FOUND,
      };
    }

    this.databaseService.artists.splice(artistIndex, 1);

    return {
      data: null,
      error: null,
    };
  }
}
