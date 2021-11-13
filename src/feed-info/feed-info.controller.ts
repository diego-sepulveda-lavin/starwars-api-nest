import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FeedInfoService } from './feed-info.service';

@ApiTags('feed-info')
@Controller('feed-info')
export class FeedInfoController {
  constructor(private readonly feedInfoService: FeedInfoService) {}

  @Get('characters')
  getCharactersInfo() {
    return this.feedInfoService.getCharactersInfo();
  }

  @Get('planets')
  getPlanetsInfo() {
    return this.feedInfoService.getPlanetsInfo();
  }
}
