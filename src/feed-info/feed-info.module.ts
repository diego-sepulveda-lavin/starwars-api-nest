import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { FeedInfoController } from './feed-info.controller';
// Entities
import { Character } from '../characters/entities/character.entity';
import { Planet } from '../planets/entities/planet.entity';
// Modules
import { UsersModule } from '../users/users.module';
// Services
import { FeedInfoService } from './feed-info.service';

@Module({
  imports: [TypeOrmModule.forFeature([Character, Planet]), UsersModule],
  controllers: [FeedInfoController],
  providers: [FeedInfoService],
})
export class FeedInfoModule {}
