import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, genSalt, hash } from 'bcrypt';

// Entities
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async getAllUsers(requestingUserId: number): Promise<User[]> {
    await this.checkAdmin(requestingUserId);
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

  async getUserById(id: number, requestingUserId: number): Promise<User> {
    await this.checkAdminOrOwnUser(id, requestingUserId);

    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException('User not found for given id');
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ email });
    return user;
  }

  async updateUserById(id: number, requestingUserId: number, attrs: Partial<User>): Promise<User> {
    await this.checkAdminOrOwnUser(id, requestingUserId);

    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException('User not found for given id');

    const { isActive, password } = attrs;

    const hashedPassword = await this.hashPassword(password);

    user.isActive = isActive;
    user.password = hashedPassword;
    return this.usersRepository.save(user);
  }

  async removeUserById(id: number, requestingUserId: number): Promise<User> {
    await this.checkAdminOrOwnUser(id, requestingUserId);

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

  async checkAdmin(requestingUserId: number): Promise<boolean> {
    const { isAdmin } = await this.usersRepository.findOne(requestingUserId, { select: ['isAdmin'] });
    if (!isAdmin) throw new ForbiddenException('You have no right of access!');
    return isAdmin;
  }

  async checkAdminOrOwnUser(id: number, requestingUserId: number): Promise<boolean> {
    const isAdmin = await this.checkAdmin(requestingUserId);
    const isOwnUser = id === requestingUserId;
    const hasRights = isAdmin || isOwnUser;
    if (!hasRights) throw new ForbiddenException('You have no right of access!');
    return hasRights;
  }
}
