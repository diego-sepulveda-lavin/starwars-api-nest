import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Modules
import { AuthModule } from '../auth/auth.module';
import { CharactersModule } from '../characters/characters.module';
import { DbConfigModule } from '../db-config/db-config.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { FeedInfoModule } from '../feed-info/feed-info.module';
import { PlanetsModule } from '../planets/planets.module';
import { UsersModule } from '../users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    AuthModule,
    CharactersModule,
    DbConfigModule,
    FeedInfoModule,
    PlanetsModule,
    UsersModule,
    FavoritesModule,
  ],
})
export class AppModule {}
