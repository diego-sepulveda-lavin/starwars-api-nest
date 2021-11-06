import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Planet } from 'src/planets/entities/planet.entity';

@Injectable()
export class CharactersService {
  constructor(@InjectRepository(Planet) private planetsRepository: Repository<Planet>) {}
}
