import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Dtos
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
// Entities
import { Planet } from './entities/planet.entity';

@Injectable()
export class PlanetsService {
  constructor(@InjectRepository(Planet) private planetsRepository: Repository<Planet>) {}

  async getAllPlanets(): Promise<Planet[]> {
    return await this.planetsRepository.find();
  }

  async getPlanetById(id: number): Promise<Planet> {
    const planet = await this.planetsRepository.findOne(id);
    if (!planet) throw new NotFoundException('Planet not found for given id');
    return planet;
  }

  async createNewPlanet(data: CreatePlanetDto): Promise<Planet> {
    const { climate, diameter, gravity, name, orbitalPeriod, population, rotationPeriod, surfaceWater, terrain, url } =
      data;

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

  async updatePlanetById(id: number, data: UpdatePlanetDto): Promise<Planet> {
    const { climate, diameter, gravity, name, orbitalPeriod, population, rotationPeriod, surfaceWater, terrain, url } =
      data;

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
