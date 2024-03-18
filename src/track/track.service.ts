import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICreateTrackDto } from 'src/types';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async getTracks() {
    return await this.prisma.track.findMany();
  }

  async getTrack(trackId: string) {
    const track = this.prisma.track.findUnique({
      where: { id: trackId },
    });
    if (!track) {
      throw new NotFoundException('Track with this id is not found');
    }
    return track;
  }

  async createTrack(createTrackDto: ICreateTrackDto) {
    return await this.prisma.track.create({
      data: createTrackDto,
    });
  }

  async updateTrack(trackId: string, data: ICreateTrackDto) {
    const track = await this.prisma.track.findUnique({
      where: { id: trackId },
    });
    if (!track) {
      throw new NotFoundException('Track with this id is not found');
    }

    return await this.prisma.track.update({
      where: { id: trackId },
      data,
    });
  }

  async deleteTrack(trackId: string) {
    const track = await this.prisma.track.findUnique({
      where: { id: trackId },
    });
    if (!track) {
      throw new NotFoundException('Track with this id is not found');
    }

    await this.prisma.track.delete({
      where: { id: trackId },
    });

    // check favorites
    // const trackIndexInFavs = this.databaseService.favorites.tracks.findIndex(
    //   (currTrackId) => currTrackId === trackId,
    // );
    // if (trackIndexInFavs > -1) {
    //   this.databaseService.favorites.tracks.splice(trackIndexInFavs, 1);
    // }
  }
}
