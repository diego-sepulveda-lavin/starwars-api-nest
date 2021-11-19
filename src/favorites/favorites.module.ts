import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { FavoritesController } from './favorites.controller';
// Entities
import { User } from '../users/entities/user.entity';
// Modules
import { CharactersModule } from '../characters/characters.module';
import { PlanetsModule } from '../planets/planets.module';
// Services
import { FavoritesService } from './favorites.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CharactersModule, PlanetsModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
