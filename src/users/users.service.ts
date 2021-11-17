import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, genSalt, hash } from 'bcrypt';

// Entities
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async createNewUser(email: string, password: string, isActive: boolean): Promise<User> {
    const hashedPassword = await this.hashPassword(password);

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

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ email });
    return user;
  }

  async updateUserById(id: number, attrs: Partial<User>): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException('User not found for given id');

    const { isActive, password } = attrs;

    const hashedPassword = await this.hashPassword(password);

    user.isActive = isActive;
    user.password = hashedPassword;
    return this.usersRepository.save(user);
  }

  async removeUserById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException('User not found for given id');
    return await this.usersRepository.remove(user);
  }

  async checkPassword(password: string, hashedPassword: string): Promise<boolean> {
    const isMatch = await compare(password, hashedPassword);
    return isMatch;
  }
  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt();
    const hashedPassword = await hash(String(password), salt);
    return hashedPassword;
  }
}
