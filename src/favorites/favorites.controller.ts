import { Controller, Delete, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

// Entities
import { User } from '../users/entities/user.entity';
// Guards
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// Services
import { FavoritesService } from './favorites.service';
import { UserFavoritesDto } from './dtos/user-favorites.dto';

@ApiTags('favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('character/:characterId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: "Returns a user with user's favorites", type: UserFavoritesDto })
  @ApiResponse({ status: 400, description: "Character already in user's favorites" })
  @ApiResponse({ status: 401, description: 'You are not authorized' })
  @ApiResponse({ status: 404, description: 'Character id not found' })
  addNewFavoriteCharacter(@Request() req, @Param('characterId', ParseIntPipe) characterId: number): Promise<User> {
    return this.favoritesService.addNewFavoriteCharacter(req.user.userId, characterId);
  }

  @Post('planet/:planetId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: "Returns a user with user's favorites", type: UserFavoritesDto })
  @ApiResponse({ status: 400, description: "Planet already in user's favorites" })
  @ApiResponse({ status: 401, description: 'You are not authorized' })
  @ApiResponse({ status: 404, description: 'Planet id not found' })
  addNewFavoritePlanet(@Request() req, @Param('planetId', ParseIntPipe) planetId: number): Promise<User> {
    return this.favoritesService.addNewFavoritePlanet(req.user.userId, planetId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: "Returns a user with user's favorites", type: UserFavoritesDto })
  @ApiResponse({ status: 401, description: 'You are not authorized' })
  getUserFavorites(@Request() req): Promise<User> {
    return this.favoritesService.getUserFavorites(req.user.userId);
  }

  @Delete('character/:characterId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: "Returns a user with user's favorites", type: UserFavoritesDto })
  @ApiResponse({ status: 401, description: 'You are not authorized' })
  @ApiResponse({ status: 404, description: 'Character id not found' })
  deleteFavoriteCharacter(@Request() req, @Param('characterId', ParseIntPipe) characterId: number): Promise<User> {
    return this.favoritesService.deleteFavoriteCharacter(req.user.userId, characterId);
  }

  @Delete('planet/:planetId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: "Returns a user with user's favorites", type: UserFavoritesDto })
  @ApiResponse({ status: 401, description: 'You are not authorized' })
  @ApiResponse({ status: 404, description: 'Planet id not found' })
  deleteFavoritePlanet(@Request() req, @Param('planetId', ParseIntPipe) planetId: number): Promise<User> {
    return this.favoritesService.deleteFavoritePlanet(req.user.userId, planetId);
  }
}
