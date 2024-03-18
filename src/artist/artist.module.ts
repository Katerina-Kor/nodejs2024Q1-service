import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [DatabaseModule, PrismaModule],
  providers: [ArtistService],
  controllers: [ArtistController],
})
export class ArtistModule {}
