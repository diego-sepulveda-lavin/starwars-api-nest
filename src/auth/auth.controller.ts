import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
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
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtDto } from './dtos/jwt.dto';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Serialize(UserDto)
  @ApiResponse({ status: 201, description: 'The record has been successfully created.', type: UserDto })
  @ApiResponse({ status: 400, description: 'Some fields are missing or email already in use' })
  register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiResponse({ status: 201, description: 'The record has been successfully created.', type: JwtDto })
  @ApiResponse({ status: 401, description: 'Incorrect email or password' })
  async login(@Request() req, @Body() loginUserDto: LoginUserDto): Promise<JwtDto> {
    return this.authService.login(req.user);
  }
}
