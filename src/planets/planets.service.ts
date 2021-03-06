import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { Planet } from './entities/planet.entity';
// Services
import { UsersService } from '../users/users.service';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(Planet) private planetsRepository: Repository<Planet>,
    private readonly usersService: UsersService,
  ) {}

  getAllPlanets(): Promise<Planet[]> {
    return this.planetsRepository.find();
  }

  async createNewPlanet(requestingUserId: number, attrs: Partial<Planet>): Promise<Planet> {
    await this.usersService.checkAdmin(requestingUserId);
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

  async getPlanetById(id: number): Promise<Planet> {
    const planet = await this.planetsRepository.findOne(id);
    if (!planet) throw new NotFoundException('Planet not found for given id');
    return planet;
  }

  async updatePlanetById(requestingUserId: number, id: number, attrs: Partial<Planet>): Promise<Planet> {
    await this.usersService.checkAdmin(requestingUserId);
    const { climate, diameter, gravity, name, orbitalPeriod, population, rotationPeriod, surfaceWater, terrain, url } =
      attrs;

    const planet = await this.planetsRepository.findOne(id);
    if (!planet) throw new NotFoundException('Planet not found for given id');

    const existingPlanet = await this.planetsRepository.findOne({ name });
    if (existingPlanet && existingPlanet.id !== id) {
      throw new BadRequestException('Planet name already exists');
    }

    planet.climate = climate;
    planet.diameter = diameter;
    planet.gravity = gravity;
    planet.name = name;
    planet.orbitalPeriod = orbitalPeriod;
    planet.population = population;
    planet.rotationPeriod = rotationPeriod;
    planet.surfaceWater = surfaceWater;
    planet.terrain = terrain;
    planet.url = url;

    return await this.planetsRepository.save(planet);
  }

  async removePlanetById(requestingUserId: number, id: number): Promise<Planet> {
    await this.usersService.checkAdmin(requestingUserId);

    const planet = await this.planetsRepository.findOne(id);
    if (!planet) throw new NotFoundException('Planet not found for given id');
    return planet;
  }
}
