import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import {
  ChangeTrackError,
  IChangeTrackResult,
  ICreateTrackDto,
  ITrack,
} from 'src/types';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  constructor(private databaseService: DatabaseService) {}

  getTracks(): ITrack[] {
    return this.databaseService.tracks;
  }

  getTrack(trackId: string): ITrack | undefined {
    return this.databaseService.tracks.find((track) => track.id === trackId);
  }

  createTrack(track: ICreateTrackDto): ITrack {
    const newTrack: ITrack = {
      ...track,
      id: uuidv4(),
    };
    this.databaseService.tracks.push(newTrack);
    return newTrack;
  }

  updateTrack(trackId: string, data: ICreateTrackDto): IChangeTrackResult {
    const track = this.getTrack(trackId);
    if (!track) {
      return {
        data: null,
        error: ChangeTrackError.NOT_FOUND,
      };
    }

    track.name = data.name;
    track.artistId = data.artistId;
    track.albumId = data.albumId;
    track.duration = data.duration;

    return {
      data: track,
      error: null,
    };
  }

  deleteTrack(trackId: string): IChangeTrackResult {
    const trackIndex = this.databaseService.tracks.findIndex(
      (track) => track.id === trackId,
    );
    if (trackIndex === -1) {
      return {
        data: null,
        error: ChangeTrackError.NOT_FOUND,
      };
    }

    this.databaseService.tracks.splice(trackIndex, 1);

    return {
      data: null,
      error: null,
    };
  }
}
