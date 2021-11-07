import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// Dtos
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
// Entities
import { Planet } from './entities/planet.entity';
// Services
import { PlanetsService } from './planets.service';

@ApiTags('planets')
@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Returns a list with all planets' })
  async getAllPlanets(): Promise<Planet[]> {
    return await this.planetsService.getAllPlanets();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returns a specific planet for given id' })
  @ApiResponse({ status: 404, description: 'Planet not found for given id' })
  async getPlanetById(@Param('id', ParseIntPipe) id: number): Promise<Planet> {
    return await this.planetsService.getPlanetById(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Some fields are missing or planet already exists' })
  async createNewPlanet(@Body() createPlanetDto: CreatePlanetDto): Promise<Planet> {
    return await this.planetsService.createNewPlanet(createPlanetDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Returns deleted planet for given id' })
  @ApiResponse({ status: 404, description: 'Planet not found for given id' })
  async removePlanetById(@Param('id', ParseIntPipe) id: number): Promise<Planet> {
    return await this.planetsService.removePlanetById(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'The record has been successfully modified.' })
  @ApiResponse({ status: 400, description: 'Some fields are missing or planet already exists' })
  @ApiResponse({ status: 404, description: 'Planet not found for given id' })
  async updatePlanetById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlanetDto: UpdatePlanetDto,
  ): Promise<Planet> {
    return await this.planetsService.updatePlanetById(id, updatePlanetDto);
  }
}
