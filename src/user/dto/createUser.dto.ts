import { IsString } from 'class-validator';
import { ICreateUserDto } from 'src/types';

export class CreateUserDto implements ICreateUserDto {
  @IsString()
  login: string;
  @IsString()
  password: string;
}
