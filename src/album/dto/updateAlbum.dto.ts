import { IsInt, IsString, ValidateIf } from 'class-validator';
import { ICreateAlbumDto } from '../helpers/types';

export class UpdateAlbumDto implements ICreateAlbumDto {
  @IsString()
  name: string;
  @IsString()
  @ValidateIf((_object, value) => value !== null)
  artistId: string | null;
  @IsInt()
  year: number;
}
