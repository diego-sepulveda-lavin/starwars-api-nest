import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Entities
import { User } from '../users/entities/user.entity';
// Services
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

  async register(attrs: Partial<User>): Promise<User> {
    const { email, password, isActive } = attrs;

    const user = await this.usersService.getUserByEmail(email);
    if (user) throw new BadRequestException('Email already in use');

    return await this.usersService.createNewUser(email, password, isActive);
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.getUserByEmail(email);

    if (user && (await this.usersService.checkPassword(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
