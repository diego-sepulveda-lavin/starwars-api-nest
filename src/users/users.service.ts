import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash, genSalt } from 'bcrypt';
// Entities
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async createNewUser(attrs: Partial<User>): Promise<User> {
    const { email, password, isActive } = attrs;

    const existingUser = await this.usersRepository.findOne({ email });
    if (existingUser) throw new BadRequestException('Email already in use');

    const salt = await genSalt();
    const hashedPassword = await hash(String(password), salt);
    const user = this.usersRepository.create({
      email,
      isActive,
      password: hashedPassword,
    });

    return await this.usersRepository.save(user);
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException('User not found for given id');
    return user;
  }

  async updateUserById(id: number, attrs: Partial<User>): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException('User not found for given id');

    const { isActive, password } = attrs;

    const salt = await genSalt();
    const hashedPassword = await hash(String(password), salt);

    user.isActive = isActive;
    user.password = hashedPassword;
    return this.usersRepository.save(user);
  }

  async removeUserById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException('User not found for given id');
    return await this.usersRepository.remove(user);
  }
}
