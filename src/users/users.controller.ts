import {
  Controller,
  Body,
  Param,
  Delete,
  Get,
  Post,
  Put,
  NotFoundException,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// Dtos
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// Entities
import { User } from './entities/user.entity';
// Services
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Returns a list with all users' })
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returns a specific user for given id' })
  @ApiResponse({ status: 404, description: 'User not found for given id' })
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.getUserById(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Some fields are missing or email already in use' })
  async createNewUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    if (!createUserDto.email) throw new BadRequestException('Email field missing');
    if (!createUserDto.password) throw new BadRequestException('Password field missing');

    return await this.usersService.createNewUser(createUserDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Returns deleted user for given id' })
  @ApiResponse({ status: 404, description: 'User not found for given id' })
  async removeUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.removeUserById(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'The record has been successfully modified.' })
  @ApiResponse({ status: 400, description: 'Some fields are missing or email already in use' })
  @ApiResponse({ status: 404, description: 'User not found for given id' })
  async updateUserById(@Param('id', ParseIntPipe) id: number, @Body() modifyUserDto: UpdateUserDto): Promise<User> {
    if (!modifyUserDto.email) throw new BadRequestException('Email field missing');
    if (!modifyUserDto.password) throw new BadRequestException('Password field missing');

    return await this.usersService.updateUserById(id, modifyUserDto);
  }
}
