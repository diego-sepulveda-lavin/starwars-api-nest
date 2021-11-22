import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { Character } from '../characters/entities/character.entity';
import { Planet } from '../planets/entities/planet.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          database: config.get<string>('DB_NAME'),
          entities: [Character, Planet, User],
          host: config.get<string>('DB_HOST'),
          password: config.get<string>('DB_PASSWORD'),
          port: parseInt(config.get<string>('DB_PORT'), 10),
          type: 'mysql',
          synchronize: true, // change when ready
          username: config.get<string>('DB_USERNAME'),
          logging: 'all',
          dropSchema: false,
        };
      },
    }),
  ],
})
export class DbConfigModule {}
