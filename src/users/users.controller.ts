import { Controller, Body, Param, Delete, Get, Post, Put } from '@nestjs/common';

import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Post()
  createNewUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createNewUser(createUserDto);
  }

  @Delete(':id')
  removeOneById(@Param('id') id: string) {
    return this.usersService.removeOneById(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() modifyUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, modifyUserDto);
  }
}
