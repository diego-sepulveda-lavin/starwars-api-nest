import { Controller, Delete, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// Guards
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// Services
import { FavoritesService } from './favorites.service';

@ApiTags('favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('character/:characterId')
  @UseGuards(JwtAuthGuard)
  addNewFavoriteCharacter(@Request() req, @Param('characterId', ParseIntPipe) characterId: number) {
    return this.favoritesService.addNewFavoriteCharacter(req.user.userId, characterId);
  }

  @Post('planet/:planetId')
  @UseGuards(JwtAuthGuard)
  addNewFavoritePlanet(@Request() req, @Param('planetId', ParseIntPipe) planetId: number) {
    return this.favoritesService.addNewFavoritePlanet(req.user.userId, planetId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getUserFavorites(@Request() req) {
    return this.favoritesService.getUserFavorites(req.user.userId);
  }

  @Delete('character/:characterId')
  @UseGuards(JwtAuthGuard)
  deleteFavoriteCharacter(@Request() req, @Param('characterId', ParseIntPipe) characterId: number) {
    return this.favoritesService.deleteFavoriteCharacter(req.user.userId, characterId);
  }

  @Delete('planet/:planetId')
  @UseGuards(JwtAuthGuard)
  deleteFavoritePlanet(@Request() req, @Param('planetId', ParseIntPipe) planetId: number) {
    return this.favoritesService.deleteFavoritePlanet(req.user.userId, planetId);
  }
}
