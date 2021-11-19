import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { User } from '../users/entities/user.entity';

// Services
import { PlanetsService } from '../planets/planets.service';
import { CharactersService } from '../characters/characters.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly characterService: CharactersService,
    private readonly planetService: PlanetsService,
  ) {}

  async getUserFavorites(requestingUserId: number) {
    const userWithFavorites = await this.usersRepository.findOne(requestingUserId, {
      select: ['email', 'id'],
      relations: ['favoriteCharacters', 'favoritePlanets'],
    });
    return userWithFavorites;
  }

  async addNewFavoriteCharacter(requestingUserId: number, characterId: number) {
    const user = await this.getUserFavorites(requestingUserId);
    const character = await this.characterService.getCharacterById(characterId);

    const characterAlreadyInFavs = user.favoriteCharacters.find((character) => character.id === characterId);
    if (characterAlreadyInFavs) throw new BadRequestException("Character already in user's favorites");

    user.favoriteCharacters = [...user.favoriteCharacters, character];
    return this.usersRepository.save(user);
  }

  async addNewFavoritePlanet(requestingUserId: number, planetId: number) {
    const user = await this.getUserFavorites(requestingUserId);
    const planet = await this.planetService.getPlanetById(planetId);

    const planetAlreadyInFavs = user.favoritePlanets.find((planet) => planet.id === planetId);
    if (planetAlreadyInFavs) throw new BadRequestException("Planet already in user's favorites");

    user.favoritePlanets = [...user.favoritePlanets, planet];
    return this.usersRepository.save(user);
  }

  async deleteFavoriteCharacter(requestingUserId: number, characterId: number) {
    const user = await this.getUserFavorites(requestingUserId);
    await this.characterService.getCharacterById(characterId);

    user.favoriteCharacters = user.favoriteCharacters.filter((character) => character.id !== characterId);

    return this.usersRepository.save(user);
  }

  async deleteFavoritePlanet(requestingUserId: number, planetId: number) {
    const user = await this.getUserFavorites(requestingUserId);
    await this.planetService.getPlanetById(planetId);

    user.favoritePlanets = user.favoritePlanets.filter((planet) => planet.id !== planetId);

    return this.usersRepository.save(user);
  }
}
