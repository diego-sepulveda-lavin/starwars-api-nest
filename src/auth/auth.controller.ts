import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// Dtos
import { LoginUserDto } from './dtos/login-user.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UserDto } from '../users/dtos/user.dto';
// Entities
import { User } from '../users/entities/user.entity';
// Interceptors
import { Serialize } from '../interceptors/serialize.interceptor';
// Services
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Serialize(UserDto)
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Some fields are missing or email already in use' })
  register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.authService.register(registerUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @Serialize(UserDto)
  async login(@Request() req, @Body() loginUserDto: LoginUserDto) {
    return 'caca';
  }
}
