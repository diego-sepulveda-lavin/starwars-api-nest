import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

// Dtos
import { CreatePlanetDto } from './dtos/create-planet.dto';
import { UpdatePlanetDto } from './dtos/update-planet.dto';
import { PlanetDto } from './dtos/planet.dto';
// Entities
import { Planet } from './entities/planet.entity';
// Guards
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// Services
import { PlanetsService } from './planets.service';
import { CharacterDto } from 'src/characters/dtos/character.dto';

@ApiTags('planets')
@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Returns a list with all planets', type: PlanetDto })
  getAllPlanets(): Promise<Planet[]> {
    return this.planetsService.getAllPlanets();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.', type: PlanetDto })
  @ApiResponse({ status: 400, description: 'Some fields are missing or planet already exists' })
  @ApiResponse({ status: 401, description: 'You are not authorized' })
  createNewPlanet(@Request() req, @Body() createPlanetDto: CreatePlanetDto): Promise<Planet> {
    return this.planetsService.createNewPlanet(req.user.userId, createPlanetDto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returns a specific planet for given id', type: PlanetDto })
  @ApiResponse({ status: 404, description: 'Planet not found for given id' })
  getPlanetById(@Param('id', ParseIntPipe) id: number): Promise<Planet> {
    return this.planetsService.getPlanetById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'The record has been successfully modified.', type: PlanetDto })
  @ApiResponse({ status: 400, description: 'Some fields are missing or planet already exists' })
  @ApiResponse({ status: 401, description: 'You are not authorized' })
  @ApiResponse({ status: 404, description: 'Planet not found for given id' })
  updatePlanetById(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlanetDto: UpdatePlanetDto,
  ): Promise<Planet> {
    return this.planetsService.updatePlanetById(req.user.userId, id, updatePlanetDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Returns deleted planet for given id', type: CharacterDto })
  @ApiResponse({ status: 401, description: 'You are not authorized' })
  @ApiResponse({ status: 404, description: 'Planet not found for given id' })
  removePlanetById(@Request() req, @Param('id', ParseIntPipe) id: number): Promise<Planet> {
    return this.planetsService.removePlanetById(req.user.userId, id);
  }
}
