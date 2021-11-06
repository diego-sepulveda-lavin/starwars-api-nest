import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planet } from './entities/planet.entity';

import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Planet])],
  controllers: [PlanetsController],
  providers: [PlanetsService],
})
export class PlanetsModule {}
