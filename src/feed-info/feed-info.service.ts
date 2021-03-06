import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { writeFile } from 'fs/promises';
import { Repository } from 'typeorm';

// Dtos
import { FeedCharacter } from './dtos/feed-character.dto';
import { FeedPlanet } from './dtos/feed-planet.dto';
// Entities
import { Character } from '../characters/entities/character.entity';
import { Planet } from '../planets/entities/planet.entity';
// Services
import { UsersService } from '../users/users.service';
@Injectable()
export class FeedInfoService {
  constructor(
    @InjectRepository(Character) private charactersRepository: Repository<Character>,
    @InjectRepository(Planet) private planetsRepository: Repository<Planet>,
    private readonly usersService: UsersService,
  ) {}

  async getCharactersInfo(requestingUserId: number) {
    await this.usersService.checkAdmin(requestingUserId);

    const charactersData: FeedCharacter[] = await this.getData('https://swapi.dev/api/people');

    this.writeDataToFile('characters.json', charactersData);

    for (const character of charactersData) {
      const { birth_year, eye_color, gender, hair_color, height, homeworld, mass, name, skin_color, url } = character;

      const newCharacter = this.charactersRepository.create({
        birthYear: birth_year,
        eyeColor: eye_color,
        gender,
        hairColor: hair_color,
        height,
        homeworld,
        mass,
        name,
        skinColor: skin_color,
        url,
      });
      await this.charactersRepository.save(newCharacter);
    }

    return { message: 'Characters data loaded succesfully in the db!' };
  }

  async getPlanetsInfo(requestingUserId: number) {
    await this.usersService.checkAdmin(requestingUserId);

    const planetsData: FeedPlanet[] = await this.getData('https://swapi.dev/api/planets');

    this.writeDataToFile('planets.json', planetsData);

    for (const planet of planetsData) {
      const {
        climate,
        diameter,
        gravity,
        name,
        orbital_period,
        population,
        rotation_period,
        surface_water,
        terrain,
        url,
      } = planet;

      const newPlanet = this.planetsRepository.create({
        climate,
        diameter,
        gravity,
        name,
        orbitalPeriod: orbital_period,
        population,
        rotationPeriod: rotation_period,
        surfaceWater: surface_water,
        terrain,
        url,
      });

      await this.planetsRepository.save(newPlanet);
    }

    return { message: 'Planets data loaded succesfully in the db!' };
  }

  private async getData(url: string) {
    let data = [];
    let stopped = false;

    while (!stopped) {
      const response = await axios(url);
      data = data.concat(response.data.results);
      if (response.data.next) {
        url = response.data.next;
      } else {
        stopped = true;
      }
    }

    return data;
  }

  private writeDataToFile(file: string, inputData: any[]) {
    try {
      writeFile(__dirname + `/${file}`, JSON.stringify(inputData));
    } catch (error) {
      console.error(error);
    }
  }
}
