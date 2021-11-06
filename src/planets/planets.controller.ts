import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PlanetsService } from './planets.service';

@ApiTags('planets')
@Controller('planets')
export class PlanetsController {
  constructor(private planetsService: PlanetsService) {}

  @Get()
  findAllPlanets() {
    return 'All planets';
  }

  @Get(':id')
  findPlanetById(@Param('id') id: string) {
    return 'Planet by id';
  }
}
