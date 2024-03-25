import { IsInt, IsString, ValidateIf } from 'class-validator';
import { ICreateTrackDto } from '../helpers/types';

export class UpdateTrackDto implements ICreateTrackDto {
  @IsString()
  name: string;
  @IsString()
  @ValidateIf((_object, value) => value !== null)
  artistId: string | null;
  @IsString()
  @ValidateIf((object, value) => value !== null)
  albumId: string | null;
  @IsInt()
  duration: number;
}
