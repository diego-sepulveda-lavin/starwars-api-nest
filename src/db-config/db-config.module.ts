import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { Character } from 'src/characters/entities/character.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        database: process.env.DB_NAME,
        entities: [Character, Planet, User],
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT, 10),
        type: 'mysql',
        synchronize: true, // change when ready
        username: process.env.DB_USERNAME,
        logging: 'all',
        dropSchema: true,
      }),
    }),
  ],
})
export class DbConfigModule {}
