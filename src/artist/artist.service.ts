import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICreateArtistDto } from 'src/types';
import { artistSelect } from './helpers/helpers';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async getArtists() {
    return await this.prisma.artist.findMany({
      select: artistSelect,
    });
  }

  async getArtist(artistId: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id: artistId },
      select: artistSelect,
    });
    if (!artist) {
      throw new NotFoundException('Artist with this id is not found');
    }
    return artist;
  }

  async createArtist(createArtistDto: ICreateArtistDto) {
    return await this.prisma.artist.create({
      data: createArtistDto,
      select: artistSelect,
    });
  }

  async updateArtist(artistId: string, data: ICreateArtistDto) {
    const artist = await this.prisma.artist.findUnique({
      where: { id: artistId },
    });
    if (!artist) {
      throw new NotFoundException('Artist with this id is not found');
    }
    return await this.prisma.artist.update({
      where: { id: artistId },
      data,
      select: artistSelect,
    });
  }

  async deleteArtist(artistId: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id: artistId },
    });
    if (!artist) {
      throw new NotFoundException('Artist with this id is not found');
    }
    await this.prisma.artist.delete({
      where: { id: artistId },
    });

    // check favorites
    // const artistIndexInFavs = this.databaseService.favorites.artists.findIndex(
    //   (currArtistId) => currArtistId === artistId,
    // );
    // if (artistIndexInFavs > -1) {
    //   this.databaseService.favorites.artists.splice(artistIndexInFavs, 1);
    // }

    // chack tracks
    // this.databaseService.tracks.forEach((track) => {
    //   if (track.artistId === artistId) {
    //     track.artistId = null;
    //   }
    // });

    // chack albums
    // this.databaseService.albums.forEach((album) => {
    //   if (album.artistId === artistId) {
    //     album.artistId = null;
    //   }
    // });
  }
}
