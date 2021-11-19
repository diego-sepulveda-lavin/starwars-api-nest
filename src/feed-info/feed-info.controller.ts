import { Controller, Get, Request, UseGuards } from '@nestjs/common';
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
  getCharactersInfo(@Request() req) {
    return this.feedInfoService.getCharactersInfo(req.user.userId);
  }

  @Get('planets')
  @UseGuards(JwtAuthGuard)
  getPlanetsInfo(@Request() req) {
    return this.feedInfoService.getPlanetsInfo(req.user.userId);
  }
}
