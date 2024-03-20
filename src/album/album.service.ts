import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICreateAlbumDto } from 'src/types';
import { albumSelect } from './helpers/helpers';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async getAlbums() {
    return await this.prisma.album.findMany({
      select: albumSelect,
    });
  }

  async getAlbum(albumId: string) {
    const album = await this.prisma.album.findUnique({
      where: { id: albumId },
      select: albumSelect,
    });
    if (!album) {
      throw new NotFoundException('Album with this id is not found');
    }
    return album;
  }

  async createAlbum(createAlbumDto: ICreateAlbumDto) {
    return await this.prisma.album.create({
      data: createAlbumDto,
      select: albumSelect,
    });
  }

  async updateAlbum(albumId: string, data: ICreateAlbumDto) {
    const album = await this.prisma.album.findUnique({
      where: { id: albumId },
    });
    if (!album) {
      throw new NotFoundException('Track with this id is not found');
    }

    return await this.prisma.album.update({
      where: { id: albumId },
      data,
      select: albumSelect,
    });
  }

  async deleteAlbum(albumId: string) {
    const album = await this.prisma.album.findUnique({
      where: { id: albumId },
    });
    if (!album) {
      throw new NotFoundException('Track with this id is not found');
    }

    await this.prisma.album.delete({
      where: { id: albumId },
    });

    // check favorites
    // const albumIndexInFavs = this.databaseService.favorites.albums.findIndex(
    //   (currAlbumId) => currAlbumId === albumId,
    // );
    // if (albumIndexInFavs > -1) {
    //   this.databaseService.favorites.albums.splice(albumIndexInFavs, 1);
    // }

    // chack tracks
    // this.databaseService.tracks.forEach((track) => {
    //   if (track.albumId === albumId) {
    //     track.albumId = null;
    //   }
    // });
  }
}
