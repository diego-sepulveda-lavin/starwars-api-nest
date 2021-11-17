import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { CharactersController } from './characters.controller';
// Entities
import { Character } from './entities/character.entity';
// Services
import { CharactersService } from './characters.service';

@Module({
  imports: [TypeOrmModule.forFeature([Character])],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
