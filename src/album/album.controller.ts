import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { ChangeAlbumError, IAlbum } from 'src/types';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAllAlbums(): IAlbum[] {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  getAlbum(@Param('id', ParseUUIDPipe) id: string): IAlbum {
    const album = this.albumService.getAlbum(id);
    if (!album) {
      throw new NotFoundException('Album with this id is not found');
    }
    return album;
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createAlbum(@Body() dto: CreateAlbumDto): IAlbum {
    return this.albumService.createAlbum(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  changeAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAlbumDto,
  ): IAlbum {
    const changeResult = this.albumService.updateAlbum(id, dto);
    if (changeResult.error === ChangeAlbumError.NOT_FOUND) {
      throw new NotFoundException('Album with this id is not found');
    }
    return changeResult.data;
  }

  @HttpCode(204)
  @Delete(':id')
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string): void {
    const deleteResult = this.albumService.deleteAlbum(id);
    if (deleteResult.error === ChangeAlbumError.NOT_FOUND) {
      throw new NotFoundException('Track with this id is not found');
    }
  }
}
