import { IsBoolean, IsString } from 'class-validator';
import { ICreateArtistDto } from '../helpers/types';

export class UpdateArtistDto implements ICreateArtistDto {
  @IsString()
  name: string;
  @IsBoolean()
  grammy: boolean;
}
