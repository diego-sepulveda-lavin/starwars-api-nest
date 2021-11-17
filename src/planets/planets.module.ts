import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { PlanetsController } from './planets.controller';
// Entities
import { Planet } from './entities/planet.entity';
// Services
import { PlanetsService } from './planets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Planet])],
  controllers: [PlanetsController],
  providers: [PlanetsService],
})
export class PlanetsModule {}
