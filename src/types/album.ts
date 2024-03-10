export interface ICreateAlbumDto {
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export interface IAlbum extends ICreateAlbumDto {
  id: string; // uuid v4
}

export enum ChangeAlbumError {
  'NOT_FOUND' = 'not found',
}

export interface IChangeAlbumResult {
  data: IAlbum | null;
  error: ChangeAlbumError | null;
}
