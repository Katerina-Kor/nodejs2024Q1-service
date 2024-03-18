import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAllAlbums() {
    return await this.albumService.getAlbums();
  }

  @Get(':id')
  async getAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return await this.albumService.getAlbum(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async createAlbum(@Body() dto: CreateAlbumDto) {
    return await this.albumService.createAlbum(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  async changeAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAlbumDto,
  ) {
    return await this.albumService.updateAlbum(id, dto);
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    await this.albumService.deleteAlbum(id);
  }
}
