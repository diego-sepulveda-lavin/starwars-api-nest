import { Module } from '@nestjs/common';
import { FeedInfoController } from './feed-info.controller';
import { FeedInfoService } from './feed-info.service';

@Module({
  controllers: [FeedInfoController],
  providers: [FeedInfoService],
})
export class FeedInfoModule {}
