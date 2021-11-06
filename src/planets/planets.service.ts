import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Planet } from './entities/planet.entity';

@Injectable()
export class PlanetsService {
  constructor(@InjectRepository(Planet) private planetsRepository: Repository<Planet>) {}
}
