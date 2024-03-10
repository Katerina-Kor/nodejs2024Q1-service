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
import { TrackService } from './track.service';
import { ChangeTrackError, ITrack } from 'src/types';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAllTracks(): ITrack[] {
    return this.trackService.getTracks();
  }

  @Get(':id')
  getTrack(@Param('id', ParseUUIDPipe) id: string): ITrack {
    const track = this.trackService.getTrack(id);
    if (!track) {
      throw new NotFoundException('Track with this id is not found');
    }
    return track;
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createTrack(@Body() dto: CreateTrackDto): ITrack {
    return this.trackService.createTrack(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  changeTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTrackDto,
  ): ITrack {
    const changeResult = this.trackService.updateTrack(id, dto);
    if (changeResult.error === ChangeTrackError.NOT_FOUND) {
      throw new NotFoundException('Track with this id is not found');
    }
    return changeResult.data;
  }

  @HttpCode(204)
  @Delete(':id')
  deleteTrack(@Param('id', ParseUUIDPipe) id: string): void {
    const deleteResult = this.trackService.deleteTrack(id);
    if (deleteResult.error === ChangeTrackError.NOT_FOUND) {
      throw new NotFoundException('Track with this id is not found');
    }
  }
}
