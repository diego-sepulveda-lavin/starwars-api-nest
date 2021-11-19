import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { CharactersController } from './characters.controller';
// Entities
import { Character } from './entities/character.entity';
// Modules
import { UsersModule } from '../users/users.module';
// Services
import { CharactersService } from './characters.service';

@Module({
  imports: [TypeOrmModule.forFeature([Character]), UsersModule],
  controllers: [CharactersController],
  providers: [CharactersService],
  exports: [CharactersService],
})
export class CharactersModule {}
