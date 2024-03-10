import { IsBoolean, IsString } from 'class-validator';
import { ICreateArtistDto } from 'src/types';

export class UpdateArtistDto implements ICreateArtistDto {
  @IsString()
  name: string;
  @IsBoolean()
  grammy: boolean;
}
