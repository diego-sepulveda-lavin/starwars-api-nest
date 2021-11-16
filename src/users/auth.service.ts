import { BadRequestException, Injectable } from '@nestjs/common';

// Entities
import { User } from './entities/user.entity';
// Services
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signUp(attrs: Partial<User>): Promise<User> {
    const { email, password, isActive } = attrs;
    const user = await this.usersService.getUserByEmail(email);
    if (user) throw new BadRequestException('Email already in use');

    return await this.usersService.createNewUser(email, password, isActive);
  }

  signIn() {
    return 'SignIn';
  }
}
