import { Module } from '@nestjs/common';

// Controllers
import { AuthController } from './auth.controller';
// Modules
import { UsersModule } from 'src/users/users.module';
// Services
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule],
})
export class AuthModule {}
