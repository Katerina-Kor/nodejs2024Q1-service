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
import { ArtistService } from './artist.service';
import { ChangeArtistError, IArtist } from 'src/types';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getAllArtists(): IArtist[] {
    return this.artistService.getArtists();
  }

  @Get(':id')
  getArtist(@Param('id', ParseUUIDPipe) id: string): IArtist {
    const artist = this.artistService.getArtist(id);
    if (!artist) {
      throw new NotFoundException('Artist with this id is not found');
    }
    return artist;
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createArtist(@Body() dto: CreateArtistDto): IArtist {
    return this.artistService.createArtist(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  changeArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateArtistDto,
  ): IArtist {
    const changeResult = this.artistService.updateArtist(id, dto);
    if (changeResult.error === ChangeArtistError.NOT_FOUND) {
      throw new NotFoundException('Artist with this id is not found');
    }
    return changeResult.data;
  }

  @HttpCode(204)
  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string): void {
    const deleteResult = this.artistService.deleteArtist(id);
    if (deleteResult.error === ChangeArtistError.NOT_FOUND) {
      throw new NotFoundException('Artist with this id is not found');
    }
  }
}
