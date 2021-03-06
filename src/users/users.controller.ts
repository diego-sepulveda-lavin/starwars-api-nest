import { Controller, Delete, Get, Put, Body, Param, Request, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

// Dtos
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserAdminDto } from './dtos/user-admin.dto';
// Entities
import { User } from './entities/user.entity';
// Guards
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// Interceptors
import { Serialize } from '../interceptors/serialize.interceptor';
// Services
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @Serialize(UserAdminDto)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Returns a list with all users', type: UserAdminDto })
  @ApiResponse({ status: 401, description: 'You are not authorized' })
  getAllUsers(@Request() req): Promise<User[]> {
    return this.usersService.getAllUsers(req.user.userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Serialize(UserAdminDto)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Returns a specific user for given id', type: UserAdminDto })
  @ApiResponse({ status: 401, description: 'You are not authorized' })
  @ApiResponse({ status: 404, description: 'User not found for given id' })
  getUserById(@Request() req, @Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.getUserById(id, req.user.userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Serialize(UserAdminDto)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'The record has been successfully modified.', type: UserAdminDto })
  @ApiResponse({ status: 400, description: 'Some fields are missing or email already in use' })
  @ApiResponse({ status: 401, description: 'You are not authorized' })
  @ApiResponse({ status: 404, description: 'User not found for given id' })
  updateUserById(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUserById(id, req.user.userId, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Serialize(UserAdminDto)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Returns deleted user for given id', type: UserAdminDto })
  @ApiResponse({ status: 401, description: 'You are not authorized' })
  @ApiResponse({ status: 404, description: 'User not found for given id' })
  removeUserById(@Request() req, @Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.removeUserById(id, req.user.userId);
  }
}
