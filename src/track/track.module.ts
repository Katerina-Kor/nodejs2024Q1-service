import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { DatabaseModule } from 'src/database/database.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [DatabaseModule, PrismaModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
