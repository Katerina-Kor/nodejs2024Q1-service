import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { UserService } from './user.service';
import { ChangeUserError, IResponseUser, IUser } from 'src/types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): IResponseUser[] {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseUUIDPipe) id: string): IResponseUser {
    const user = this.userService.getUser(id);
    if (!user) {
      throw new NotFoundException('User with this id is not found');
    }
    return user;
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createUser(@Body() dto: CreateUserDto): IResponseUser {
    return this.userService.createUser(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  changeUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePasswordDto,
  ): IResponseUser {
    const changeResult = this.userService.changeUserPassword(id, dto);
    if (changeResult.error === ChangeUserError.NOT_FOUND) {
      throw new NotFoundException('User with this id is not found');
    }
    if (changeResult.error === ChangeUserError.WRONG_PASSWORD) {
      throw new ForbiddenException('Wrong password');
    }
    return changeResult.data;
  }

  @HttpCode(204)
  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string): void {
    const deleteResult = this.userService.deleteUser(id);
    if (deleteResult.error === ChangeUserError.NOT_FOUND) {
      throw new NotFoundException('User with this id is not found');
    }
  }
}
