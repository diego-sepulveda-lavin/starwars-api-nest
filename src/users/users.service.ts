import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash, genSalt } from 'bcrypt';

import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async findAllUsers() {
    const allUsers = await this.usersRepository.find({
      select: ['id', 'email', 'isActive', 'created', 'edited'],
    });

    return allUsers;
  }

  async findOneById(id: string) {
    const user = await this.usersRepository.findOne(id);

    if (!user) return `User with id ${id} was not found`;

    return user;
  }

  async createNewUser(data: CreateUserDto) {
    const { email, password, isActive } = data;

    if (!email) return 'You must provide an email';
    if (!password) return 'You must provide an password';

    const existingUser = await this.usersRepository.findOne({ email: email });
    if (existingUser) return 'Email already in use';

    const user = new User();
    const salt = await genSalt();
    const hashedPassword = await hash(String(password), salt);

    user.password = hashedPassword;
    user.email = email;
    user.isActive = isActive;

    const { password: _, ...createdUser } = await this.usersRepository.save(user);

    return createdUser;
  }

  async removeOneById(id: string) {
    const result = await this.usersRepository.delete(id);

    return result;
  }

  async updateUser(id: string, data: UpdateUserDto) {
    const { email, isActive, password } = data;

    const existingUser = await this.usersRepository.findOne(id);
    if (!existingUser) return `User with id ${id} was not found`;

    if (!email) return 'You must provide an new email';
    if (!password) return 'You must provide a new password';

    const existingEmail = await this.usersRepository.findOne({ email: email });
    if (existingEmail) return 'Email already in use, try another';

    const salt = await genSalt();
    const hashedPassword = await hash(String(password), salt);

    existingUser.email = email;
    existingUser.password = hashedPassword;
    existingUser.isActive = isActive;

    const modifiedUser = await this.usersRepository.save(existingUser);

    return modifiedUser;
  }
}
