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

  async getUserById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id, {
      select: ['id', 'email', 'isActive', 'created', 'edited'],
    });
    if (!user) throw new NotFoundException('User not found for given id');
    return user;
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

    const savedUser = await this.usersRepository.save(user);

    return await this.usersRepository.findOne(savedUser.id, {
      select: ['id', 'email', 'isActive', 'created', 'edited'],
    });
  }

  async removeUserById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id, {
      select: ['id', 'email', 'isActive', 'created', 'edited'],
    });
    if (!user) throw new NotFoundException('User not found for given id');
    return await this.usersRepository.remove(user);
  }

  async updateUserById(id: number, attrs: Partial<User>): Promise<User> {
    const { email, isActive, password } = attrs;

    const user = await this.usersRepository.findOne(id, {
      select: ['id', 'email', 'isActive', 'created', 'edited'],
    });
    if (!user) throw new NotFoundException('User not found for given id');

    const existingUser = await this.usersRepository.findOne({ email });
    if (existingUser && existingUser.id !== id) {
      throw new BadRequestException('Email already in use');
    }

    const salt = await genSalt();
    const hashedPassword = await hash(String(password), salt);

    await this.usersRepository.update(id, {
      email,
      isActive,
      password: hashedPassword,
    });

    return await this.usersRepository.findOne(id, {
      select: ['id', 'email', 'isActive', 'created', 'edited'],
    });
  }
}
