import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Character } from 'src/characters/entities/character.entity';
import { Planet } from 'src/planets/entities/planet.entity';

import { FeedInfoController } from './feed-info.controller';
import { FeedInfoService } from './feed-info.service';

@Module({
  imports: [TypeOrmModule.forFeature([Character, Planet])],
  controllers: [FeedInfoController],
  providers: [FeedInfoService],
})
export class FeedInfoModule {}
