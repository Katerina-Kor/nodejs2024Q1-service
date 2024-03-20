import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  async getFavorites() {
    return await this.favsService.getFavorites();
  }

  @Post('track/:id')
  async addTrack(@Param('id', ParseUUIDPipe) id: string) {
    await this.favsService.addTrack(id);
    return 'The track was added to favorites';
  }

  @HttpCode(204)
  @Delete('track/:id')
  async deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    await this.favsService.deleteTrack(id);
  }

  @Post('album/:id')
  async addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    await this.favsService.addAlbum(id);
    return 'The album was added to favorites';
  }

  @HttpCode(204)
  @Delete('album/:id')
  async deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    await this.favsService.deleteAlbum(id);
  }

  @Post('artist/:id')
  async addArtist(@Param('id', ParseUUIDPipe) id: string) {
    await this.favsService.addArtist(id);
    return 'The artist was added to favorites';
  }

  @HttpCode(204)
  @Delete('artist/:id')
  async deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    await this.favsService.deleteArtist(id);
  }
}
