import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { Character } from './entities/character.entity';
// Services
import { UsersService } from '../users/users.service';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character) private charactersRepository: Repository<Character>,
    private readonly usersService: UsersService,
  ) {}

  getAllCharacters(): Promise<Character[]> {
    return this.charactersRepository.find();
  }

  async createNewCharacter(requestingUserId: number, attrs: Partial<Character>): Promise<Character> {
    await this.usersService.checkAdmin(requestingUserId);
    const { birthYear, eyeColor, gender, hairColor, height, homeworld, mass, name, skinColor, url } = attrs;

    const existingCharacter = await this.charactersRepository.findOne({ name });
    if (existingCharacter) throw new BadRequestException('Character already exists');

    const character = this.charactersRepository.create({
      birthYear,
      eyeColor,
      gender,
      hairColor,
      height,
      homeworld,
      mass,
      name,
      skinColor,
      url,
    });

    return await this.charactersRepository.save(character);
  }

  async getCharacterById(id: number): Promise<Character> {
    const character = await this.charactersRepository.findOne(id);
    if (!character) throw new NotFoundException('Character not found for given id');
    return character;
  }

  async updateCharacterById(requestingUserId: number, id: number, attrs: Partial<Character>): Promise<Character> {
    await this.usersService.checkAdmin(requestingUserId);
    const { birthYear, eyeColor, gender, hairColor, height, homeworld, mass, name, skinColor, url } = attrs;

    const character = await this.charactersRepository.findOne(id);
    if (!character) throw new NotFoundException('Character not found for given id');

    const existingCharacter = await this.charactersRepository.findOne({ name });
    if (existingCharacter && existingCharacter.id !== id) {
      throw new BadRequestException('Character name already exists');
    }

    character.birthYear = birthYear;
    character.eyeColor = eyeColor;
    character.gender = gender;
    character.hairColor = hairColor;
    character.height = height;
    character.homeworld = homeworld;
    character.mass = mass;
    character.name = name;
    character.skinColor = skinColor;
    character.url = url;

    return await this.charactersRepository.save(character);
  }

  async removeCharacterById(requestingUserId: number, id: number): Promise<Character> {
    await this.usersService.checkAdmin(requestingUserId);

    const character = await this.charactersRepository.findOne(id);
    if (!character) throw new NotFoundException('Character not found for given id');
    return await this.charactersRepository.remove(character);
  }
}
