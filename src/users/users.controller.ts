import { Controller, Body, Param, Delete, Get, Post, Put, ParseIntPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// Dtos
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
// Entities
import { User } from './entities/user.entity';
// Services
import { UsersService } from './users.service';
// Interceptors
import { Serialize } from '../interceptors/serialize.interceptor';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Serialize(UserDto)
  @ApiResponse({ status: 200, description: 'Returns a list with all users' })
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  @Serialize(UserDto)
  @ApiResponse({ status: 200, description: 'Returns a specific user for given id' })
  @ApiResponse({ status: 404, description: 'User not found for given id' })
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Post()
  @Serialize(UserDto)
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Some fields are missing or email already in use' })
  createNewUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createNewUser(createUserDto);
  }

  @Delete(':id')
  @Serialize(UserDto)
  @ApiResponse({ status: 200, description: 'Returns deleted user for given id' })
  @ApiResponse({ status: 404, description: 'User not found for given id' })
  removeUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.removeUserById(id);
  }

  @Put(':id')
  @Serialize(UserDto)
  @ApiResponse({ status: 200, description: 'The record has been successfully modified.' })
  @ApiResponse({ status: 400, description: 'Some fields are missing or email already in use' })
  @ApiResponse({ status: 404, description: 'User not found for given id' })
  updateUserById(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.updateUserById(id, updateUserDto);
  }
}
