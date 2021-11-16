import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { User } from './entities/user.entity';
// Controllers
import { UsersController } from './users.controller';
// Services
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
