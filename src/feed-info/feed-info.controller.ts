import { Controller, Get } from '@nestjs/common';

import { FeedInfoService } from './feed-info.service';

@Controller('feed-info')
export class FeedInfoController {
  constructor(private readonly feedInfoService: FeedInfoService) {}

  @Get('characters')
  async getCharactersInfo() {
    return this.feedInfoService.getCharactersInfo();
  }

  @Get('planets')
  async getPlanetsInfo() {
    return await this.feedInfoService.getPlanetsInfo();
  }
}
