import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { albumSelect } from 'src/album/helpers/helpers';
import { artistSelect } from 'src/artist/helpers/helpers';
import { PrismaService } from 'src/prisma/prisma.service';
import { trackSelect } from 'src/track/helpers/helpers';

@Injectable()
export class FavsService {
  constructor(private prisma: PrismaService) {}

  async getFavorites() {
    const artists = await this.prisma.artist.findMany({
      where: { isFavorite: true },
      select: artistSelect,
    });
    const albums = await this.prisma.album.findMany({
      where: { isFavorite: true },
      select: albumSelect,
    });
    const tracks = await this.prisma.track.findMany({
      where: { isFavorite: true },
      select: trackSelect,
    });
    return {
      artists,
      albums,
      tracks,
    };
  }

  async addTrack(trackId: string) {
    const track = await this.prisma.track.findUnique({
      where: { id: trackId },
    });
    if (!track) {
      throw new UnprocessableEntityException('This track does not exist');
    }
    await this.prisma.track.update({
      where: { id: trackId },
      data: { isFavorite: true },
    });
  }

  async deleteTrack(trackId: string) {
    const track = await this.prisma.track.findUnique({
      where: { id: trackId, isFavorite: true },
    });
    if (!track) {
      throw new NotFoundException('Track was not in your favorites');
    }
    await this.prisma.track.update({
      where: { id: trackId },
      data: { isFavorite: false },
    });
  }

  async addAlbum(albumId: string) {
    const album = await this.prisma.album.findUnique({
      where: { id: albumId },
    });
    if (!album) {
      throw new UnprocessableEntityException('This album does not exist');
    }
    await this.prisma.album.update({
      where: { id: albumId },
      data: { isFavorite: true },
    });
  }

  async deleteAlbum(albumId: string) {
    const album = await this.prisma.album.findUnique({
      where: { id: albumId, isFavorite: true },
    });
    if (!album) {
      throw new NotFoundException('Album was not in your favorites');
    }
    await this.prisma.album.update({
      where: { id: albumId },
      data: { isFavorite: false },
    });
  }

  async addArtist(artistId: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id: artistId },
    });
    if (!artist) {
      throw new UnprocessableEntityException('This artist does not exist');
    }
    await this.prisma.artist.update({
      where: { id: artistId },
      data: { isFavorite: true },
    });
  }

  async deleteArtist(artistId: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id: artistId, isFavorite: true },
    });
    if (!artist) {
      throw new NotFoundException('Artist was not in your favorites');
    }
    await this.prisma.artist.update({
      where: { id: artistId },
      data: { isFavorite: false },
    });
  }
}
