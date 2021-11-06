import { Controller, Body, Param, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Returns a list of all users' })
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returns a specific user for given id' })
  @ApiResponse({ status: 404, description: 'User not found for given id' })
  findOneById(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Some fields are missing' })
  createNewUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createNewUser(createUserDto);
  }

  @Delete(':id')
  removeOneById(@Param('id') id: string) {
    return this.usersService.removeOneById(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'The record has been successfully modified.' })
  @ApiResponse({ status: 400, description: 'Some fields are missing or data already in use' })
  updateUser(@Param('id') id: string, @Body() modifyUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, modifyUserDto);
  }
}
