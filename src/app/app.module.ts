import { Module } from '@nestjs/common';

// Modules
import { DbConfigModule } from 'src/db-config/db-config.module';
import { FeedInfoModule } from 'src/feed-info/feed-info.module';
import { CharactersModule } from '../characters/characters.module';
import { PlanetsModule } from '../planets/planets.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [DbConfigModule, CharactersModule, PlanetsModule, UsersModule, FeedInfoModule],
})
export class AppModule {}
