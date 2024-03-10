export interface ICreateArtistDto {
  name: string;
  grammy: boolean;
}

export interface IArtist extends ICreateArtistDto {
  id: string; // uuid v4
}

export enum ChangeArtistError {
  'NOT_FOUND' = 'not found',
}

export interface IChangeArtistResult {
  data: IArtist | null;
  error: ChangeArtistError | null;
}
