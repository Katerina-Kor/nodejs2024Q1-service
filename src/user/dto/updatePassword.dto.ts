import { IsString } from 'class-validator';
import { IUpdatePasswordDto } from '../helpers/types';

export class UpdatePasswordDto implements IUpdatePasswordDto {
  @IsString()
  oldPassword: string;
  @IsString()
  newPassword: string;
}
