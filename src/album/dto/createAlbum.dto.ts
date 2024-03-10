import { IsInt, IsString, ValidateIf } from 'class-validator';
import { ICreateAlbumDto } from 'src/types';

export class CreateAlbumDto implements ICreateAlbumDto {
  @IsString()
  name: string;
  @IsString()
  @ValidateIf((_object, value) => value !== null)
  artistId: string | null;
  @IsInt()
  year: number;
}
