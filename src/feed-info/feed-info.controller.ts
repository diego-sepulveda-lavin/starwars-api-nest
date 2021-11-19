import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

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
  @ApiResponse({ status: 200, description: 'Returns a confirmation message of data loaded in local database' })
  getCharactersInfo(@Request() req) {
    return this.feedInfoService.getCharactersInfo(req.user.userId);
  }

  @Get('planets')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Returns a confirmation message of data loaded in local database' })
  getPlanetsInfo(@Request() req) {
    return this.feedInfoService.getPlanetsInfo(req.user.userId);
  }
}
