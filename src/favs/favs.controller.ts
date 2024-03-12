import {
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { IFavoritesResponse } from 'src/types';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  getFavorites(): IFavoritesResponse {
    return this.favsService.getFavorites();
  }

  @Post('track/:id')
  addTrack(@Param('id', ParseUUIDPipe) id: string): string {
    const addResult = this.favsService.addTrack(id);
    if (!addResult) {
      throw new UnprocessableEntityException('This track does not exist');
    }
    return 'The track was added to favorites';
  }

  @HttpCode(204)
  @Delete('track/:id')
  deleteTrack(@Param('id', ParseUUIDPipe) id: string): void {
    const deleteResult = this.favsService.deleteTrack(id);
    if (!deleteResult) {
      throw new NotFoundException('Track was not in your favorites');
    }
  }

  @Post('album/:id')
  addAlbum(@Param('id', ParseUUIDPipe) id: string): string {
    const addResult = this.favsService.addAlbum(id);
    if (!addResult) {
      throw new UnprocessableEntityException('This album does not exist');
    }
    return 'The album was added to favorites';
  }

  @HttpCode(204)
  @Delete('album/:id')
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string): void {
    const deleteResult = this.favsService.deleteAlbum(id);
    if (!deleteResult) {
      throw new NotFoundException('Album was not in your favorites');
    }
  }

  @Post('artist/:id')
  addArtist(@Param('id', ParseUUIDPipe) id: string): string {
    const addResult = this.favsService.addArtist(id);
    if (!addResult) {
      throw new UnprocessableEntityException('This artist does not exist');
    }
    return 'The artist was added to favorites';
  }

  @HttpCode(204)
  @Delete('artist/:id')
  deleteArtist(@Param('id', ParseUUIDPipe) id: string): void {
    const deleteResult = this.favsService.deleteArtist(id);
    if (!deleteResult) {
      throw new NotFoundException('Artist was not in your favorites');
    }
  }
}
