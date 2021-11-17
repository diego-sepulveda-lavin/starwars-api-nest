import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { Character } from '../characters/entities/character.entity';
import { Planet } from '../planets/entities/planet.entity';
import { User } from '../users/entities/user.entity';

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
        dropSchema: false,
      }),
    }),
  ],
})
export class DbConfigModule {}
