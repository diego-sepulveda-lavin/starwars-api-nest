import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { Character } from './entities/character.entity';
// Controllers
import { CharactersController } from './characters.controller';
// Services
import { CharactersService } from './characters.service';

@Module({
  imports: [TypeOrmModule.forFeature([Character])],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
