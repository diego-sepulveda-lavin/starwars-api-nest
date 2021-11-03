import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Modules
import { UsersModule } from '../users/users.module';

// Entities
import { Character } from '../character/character.entity';
import { Planet } from '../planet/planet.entity';
import { User } from '../users/user.entity';

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
    UsersModule,
  ],
})
export class AppModule {}
