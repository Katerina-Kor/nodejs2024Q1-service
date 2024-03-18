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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async getAllTracks() {
    return await this.trackService.getTracks();
  }

  @Get(':id')
  async getTrack(@Param('id', ParseUUIDPipe) id: string) {
    return await this.trackService.getTrack(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async createTrack(@Body() dto: CreateTrackDto) {
    return await this.trackService.createTrack(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  async changeTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTrackDto,
  ) {
    return await this.trackService.updateTrack(id, dto);
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    await this.trackService.deleteTrack(id);
  }
}
