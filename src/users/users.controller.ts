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
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Returns a list with all users' })
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returns a specific user for given id' })
  @ApiResponse({ status: 404, description: 'User not found for given id' })
  async getUserById(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.getUserById(id);

    if (!user) throw new NotFoundException('User not found for given id');

    return user;
  }

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Some fields are missing' })
  async createNewUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.createNewUser(createUserDto);

    if (!user) throw new BadRequestException('Some fields are missing or email already in use');

    return user;
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Returns deleted user for given id' })
  @ApiResponse({ status: 404, description: 'User not found for given id' })
  async removeUserById(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.removeUserById(id);
    if (!user) throw new NotFoundException('User not found for given id');

    return user;
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'The record has been successfully modified.' })
  @ApiResponse({ status: 404, description: 'User not found for given id' })
  async updateUserById(@Param('id') id: string, @Body() modifyUserDto: UpdateUserDto) {
    const user = await this.usersService.updateUserById(id, modifyUserDto);
    if (!user) throw new NotFoundException('User not found for given id');

    return user;
  }
}
