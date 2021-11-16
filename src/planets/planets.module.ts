import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { Planet } from './entities/planet.entity';
// Controllers
import { PlanetsController } from './planets.controller';
// Services
import { PlanetsService } from './planets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Planet])],
  controllers: [PlanetsController],
  providers: [PlanetsService],
})
export class PlanetsModule {}
