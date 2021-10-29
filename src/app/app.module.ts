import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Entities
import { Character } from '../character/character.entity';
import { Planet } from '../planet/planet.entity';
import { User } from '../user/user.entity';

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
        logger: 'debug',
        logging: true,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
