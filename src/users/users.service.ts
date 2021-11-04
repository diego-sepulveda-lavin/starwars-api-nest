import { HttpException, Injectable } from '@nestjs/common';
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

    if (!user) throw new HttpException(`User with id ${id} was not found`, 404);

    return user;
  }

  async createNewUser(data: CreateUserDto) {
    const { email, password, isActive } = data;

    if (!email) throw new HttpException('You must provide an email', 400);
    if (!password) throw new HttpException('You must provide an password', 400);

    const existingUser = await this.usersRepository.findOne({ email: email });
    if (existingUser) throw new HttpException('Email already in use', 400);

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
    if (!existingUser) throw new HttpException(`User with id ${id} was not found`, 404);

    if (!email) throw new HttpException('You must provide a new email', 400);
    if (!password) throw new HttpException('You must provide a new password', 400);

    const existingEmail = await this.usersRepository.findOne({ email: email });
    if (existingEmail) throw new HttpException('Email already in use, try another', 400);

    const salt = await genSalt();
    const hashedPassword = await hash(String(password), salt);

    existingUser.email = email;
    existingUser.password = hashedPassword;
    existingUser.isActive = isActive;

    const modifiedUser = await this.usersRepository.save(existingUser);

    return modifiedUser;
  }
}
