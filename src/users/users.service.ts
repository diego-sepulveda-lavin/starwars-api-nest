import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';



@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAllUsers() {
    const result = await this.usersRepository.find();
    return result;
  }

  async findOneById(id: string) {
    const result = await this.usersRepository.findOne(id);
    if (!result) {
      return 'Userid not found';
    }
    return result;
  }

  async createNewUser() {
    const user = new User();
    user.email = 'new@user.com';
    user.password = '123';
    const result = await this.usersRepository.save(user);
    return result;
  }

  async removeOneById(id: string) {
    const result = await this.usersRepository.delete(id);
    return result;
  }
}
