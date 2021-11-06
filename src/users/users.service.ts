import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash, genSalt } from 'bcrypt';

// Dtos
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// Entities
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.usersRepository.find({
      select: ['id', 'email', 'isActive', 'created', 'edited'],
    });

    return users;
  }

  async getUserById(id: string): Promise<User> {
    return await this.usersRepository.findOne(id, { select: ['id', 'email', 'isActive', 'created', 'edited'] });
  }

  async createNewUser(data: CreateUserDto): Promise<User> {
    const { email, password, isActive } = data;

    if (!email || !password) return;

    const existingUser = await this.usersRepository.findOne({ email });
    if (existingUser) return;

    const salt = await genSalt();
    const hashedPassword = await hash(String(password), salt);
    const user = this.usersRepository.create({
      email,
      isActive,
      password: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(user);
    return await this.usersRepository.findOne(savedUser, {
      select: ['id', 'email', 'isActive', 'created', 'edited'],
    });
  }

  async removeUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id, {
      select: ['id', 'email', 'isActive', 'created', 'edited'],
    });
    if (!user) return;
    return await this.usersRepository.remove(user);
  }

  async updateUserById(id: string, data: UpdateUserDto): Promise<User> {
    const { email, isActive, password } = data;

    if (!email || !password) return;

    const existingUser = await this.usersRepository.findOne(id);
    if (!existingUser) return;

    const salt = await genSalt();
    const hashedPassword = await hash(String(password), salt);

    existingUser.email = email;
    existingUser.password = hashedPassword;
    existingUser.isActive = isActive;

    const modifiedUser = await this.usersRepository.save(existingUser);

    return await this.usersRepository.findOne(modifiedUser.id, {
      select: ['id', 'email', 'isActive', 'created', 'edited'],
    });
  }
}
