import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

// Entities
import { User } from '../users/entities/user.entity';
// Services
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(attrs: Partial<User>): Promise<User> {
    const { email, password, isActive } = attrs;

    const user = await this.usersService.getUserByEmail(email);
    if (user) throw new BadRequestException('Email already in use');

    return await this.usersService.createNewUser(email, password, isActive);
  }

  async login(attrs: Partial<User>) {
    const { email, password } = attrs;

    const user = await this.usersService.getUserByEmail(email);
    if (!user) throw new UnauthorizedException('Incorrect email or password');

    const correctPassword = await this.usersService.checkPassword(password, user.password);
    if (!correctPassword) throw new UnauthorizedException('Incorrect email or password');

    return 'Succesful';
  }
}
