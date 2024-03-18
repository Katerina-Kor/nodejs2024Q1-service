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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getAllArtists() {
    return await this.artistService.getArtists();
  }

  @Get(':id')
  async getArtist(@Param('id', ParseUUIDPipe) id: string) {
    return await this.artistService.getArtist(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async createArtist(@Body() dto: CreateArtistDto) {
    return await this.artistService.createArtist(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  async changeArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateArtistDto,
  ) {
    return await this.artistService.updateArtist(id, dto);
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    await this.artistService.deleteArtist(id);
  }
}
