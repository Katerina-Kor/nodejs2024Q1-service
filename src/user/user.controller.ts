import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.getUser(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return await this.userService.createUser(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  async changeUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePasswordDto,
  ) {
    return await this.userService.changeUserPassword(id, dto);
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    await this.userService.deleteUser(id);
  }
}
