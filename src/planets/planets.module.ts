import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { PlanetsController } from './planets.controller';
// Entities
import { Planet } from './entities/planet.entity';
// Modules
import { UsersModule } from '../users/users.module';
// Services
import { PlanetsService } from './planets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Planet]), UsersModule],
  controllers: [PlanetsController],
  providers: [PlanetsService],
  exports: [PlanetsService],
})
export class PlanetsModule {}
