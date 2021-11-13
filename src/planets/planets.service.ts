import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Entities
import { Planet } from './entities/planet.entity';

@Injectable()
export class PlanetsService {
  constructor(@InjectRepository(Planet) private planetsRepository: Repository<Planet>) {}

  getAllPlanets(): Promise<Planet[]> {
    return this.planetsRepository.find();
  }

  async getPlanetById(id: number): Promise<Planet> {
    const planet = await this.planetsRepository.findOne(id);
    if (!planet) throw new NotFoundException('Planet not found for given id');
    return planet;
  }

  async createNewPlanet(attrs: Partial<Planet>): Promise<Planet> {
    const { climate, diameter, gravity, name, orbitalPeriod, population, rotationPeriod, surfaceWater, terrain, url } =
      attrs;

    const existingPlanet = await this.planetsRepository.findOne({ name });
    if (existingPlanet) throw new BadRequestException('Planet already exists');

    const user = this.planetsRepository.create({
      climate,
      diameter,
      gravity,
      name,
      orbitalPeriod,
      population,
      rotationPeriod,
      surfaceWater,
      terrain,
      url,
    });

    return await this.planetsRepository.save(user);
  }

  async removePlanetById(id: number): Promise<Planet> {
    const planet = await this.planetsRepository.findOne(id);
    if (!planet) throw new NotFoundException('Planet not found for given id');
    return planet;
  }

  async updatePlanetById(id: number, attrs: Partial<Planet>): Promise<Planet> {
    const { climate, diameter, gravity, name, orbitalPeriod, population, rotationPeriod, surfaceWater, terrain, url } =
      attrs;

    const planet = await this.planetsRepository.findOne(id);
    if (!planet) throw new NotFoundException('Planet not found for given id');

    const existingPlanet = await this.planetsRepository.findOne({ name });
    if (existingPlanet && existingPlanet.id !== id) {
      throw new BadRequestException('Planet name already exists');
    }

    await this.planetsRepository.update(id, {
      climate,
      diameter,
      gravity,
      name,
      orbitalPeriod,
      population,
      rotationPeriod,
      surfaceWater,
      terrain,
      url,
    });

    return await this.planetsRepository.findOne(id);
  }
}
