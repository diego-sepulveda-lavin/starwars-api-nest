import { Controller, Get } from '@nestjs/common';

import { FeedInfoService } from './feed-info.service';

@Controller('feed-info')
export class FeedInfoController {
  constructor(private readonly feedInfoService: FeedInfoService) {}

  @Get('characters')
  getCharactersInfo() {
    return this.feedInfoService.getCharactersInfo()
  }
}
