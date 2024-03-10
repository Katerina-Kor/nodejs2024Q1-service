import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';

@Module({
  imports: [UserModule, DatabaseModule, ArtistModule, TrackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
