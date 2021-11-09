import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Dtos
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
// Entities
import { Character } from './entities/character.entity';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character) private charactersRepository: Repository<Character>
  ) {}

  async getAllCharacters(): Promise<Character[]> {
    return await this.charactersRepository.find();
  }

  async getCharacterById(id: number): Promise<Character> {
    const character = await this.charactersRepository.findOne(id);
    if (!character) throw new NotFoundException('Character not found for given id');
    return character;
  }

  async createNewCharacter(data: CreateCharacterDto): Promise<Character> {
    const { birthYear, eyeColor, gender, hairColor, height, homeworld, mass, name, skinColor, url } = data;

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

  async removeCharacterById(id: number): Promise<Character> {
    const character = await this.charactersRepository.findOne(id);
    if (!character) throw new NotFoundException('Character not found for given id');
    return await this.charactersRepository.remove(character);
  }

  async updateCharacterById(id: number, data: UpdateCharacterDto): Promise<Character> {
    const { birthYear, eyeColor, gender, hairColor, height, homeworld, mass, name, skinColor, url } = data;

    const character = await this.charactersRepository.findOne(id);
    if (!character) throw new NotFoundException('Character not found for given id');

    const existingCharacter = await this.charactersRepository.findOne({ name });
    if (existingCharacter && existingCharacter.id !== id) {
      throw new BadRequestException('Character name already exists');
    }

    await this.charactersRepository.update(id, {
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

    return await this.charactersRepository.findOne(id);
  }
}
