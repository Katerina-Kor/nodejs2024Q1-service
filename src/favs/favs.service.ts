import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { IFavoritesResponse } from 'src/types';

@Injectable()
export class FavsService {
  constructor(private databaseService: DatabaseService) {}

  getFavorites(): IFavoritesResponse {
    const favs = this.databaseService.favorites;
    const artists = favs.artists.map((artistId) =>
      this.databaseService.artists.find((artist) => artist.id === artistId),
    );
    const albums = favs.albums.map((albumId) =>
      this.databaseService.albums.find((album) => album.id === albumId),
    );
    const tracks = favs.tracks.map((trackId) =>
      this.databaseService.tracks.find((track) => track.id === trackId),
    );
    return {
      artists,
      albums,
      tracks,
    };
  }

  addTrack(trackId: string): boolean {
    const track = this.databaseService.tracks.find(
      (currTrack) => currTrack.id === trackId,
    );
    if (!track) return false;
    const isHave = this.databaseService.favorites.tracks.includes(trackId);
    if (!isHave) {
      this.databaseService.favorites.tracks.push(trackId);
    }
    return true;
  }

  deleteTrack(trackId: string): boolean {
    const trackIndex = this.databaseService.favorites.tracks.findIndex(
      (currTrackId) => currTrackId === trackId,
    );
    if (trackIndex === -1) return false;
    this.databaseService.favorites.tracks.splice(trackIndex, 1);
    return true;
  }

  addAlbum(albumId: string): boolean {
    const album = this.databaseService.albums.find(
      (currAlbum) => currAlbum.id === albumId,
    );
    if (!album) return false;
    const isHave = this.databaseService.favorites.albums.includes(albumId);
    if (!isHave) {
      this.databaseService.favorites.albums.push(albumId);
    }
    return true;
  }

  deleteAlbum(albumId: string): boolean {
    const albumIndex = this.databaseService.favorites.albums.findIndex(
      (currAlbumId) => currAlbumId === albumId,
    );
    if (albumIndex === -1) return false;
    this.databaseService.favorites.albums.splice(albumIndex, 1);
    return true;
  }

  addArtist(artistId: string): boolean {
    const artist = this.databaseService.artists.find(
      (currArtist) => currArtist.id === artistId,
    );
    if (!artist) return false;
    const isHave = this.databaseService.favorites.artists.includes(artistId);
    if (!isHave) {
      this.databaseService.favorites.artists.push(artistId);
    }
    return true;
  }

  deleteArtist(artistId: string): boolean {
    const artistIndex = this.databaseService.favorites.artists.findIndex(
      (currArtistId) => currArtistId === artistId,
    );
    if (artistIndex === -1) return false;
    this.databaseService.favorites.artists.splice(artistIndex, 1);
    return true;
  }
}
