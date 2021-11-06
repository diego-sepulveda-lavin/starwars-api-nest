import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Planet } from 'src/planets/entities/planet.entity';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';

@Module({
  imports: [TypeOrmModule.forFeature([Planet])],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
