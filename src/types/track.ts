export interface ICreateTrackDto {
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export interface ITrack extends ICreateTrackDto {
  id: string; // uuid v4
}

export enum ChangeTrackError {
  'NOT_FOUND' = 'not found',
}

export interface IChangeTrackResult {
  data: ITrack | null;
  error: ChangeTrackError | null;
}
