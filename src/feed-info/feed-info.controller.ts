import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// Guards
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// Services
import { FeedInfoService } from './feed-info.service';

@ApiTags('feed-info')
@Controller('feed-info')
export class FeedInfoController {
  constructor(private readonly feedInfoService: FeedInfoService) {}

  @Get('characters')
  @UseGuards(JwtAuthGuard)
  getCharactersInfo() {
    return this.feedInfoService.getCharactersInfo();
  }

  @Get('planets')
  @UseGuards(JwtAuthGuard)
  getPlanetsInfo() {
    return this.feedInfoService.getPlanetsInfo();
  }
}
