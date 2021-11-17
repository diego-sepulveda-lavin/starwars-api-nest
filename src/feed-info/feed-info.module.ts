import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { FeedInfoController } from './feed-info.controller';
// Entities
import { Character } from '../characters/entities/character.entity';
import { Planet } from '../planets/entities/planet.entity';
// Services
import { FeedInfoService } from './feed-info.service';

@Module({
  imports: [TypeOrmModule.forFeature([Character, Planet])],
  controllers: [FeedInfoController],
  providers: [FeedInfoService],
})
export class FeedInfoModule {}
