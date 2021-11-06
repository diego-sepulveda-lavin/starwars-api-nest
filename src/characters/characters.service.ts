import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Dtos
import { CreateCharacterDto } from './dto/create-character.dto';
// Entities
import { Character } from './entities/character.entity';

@Injectable()
export class CharactersService {
  constructor(@InjectRepository(Character) private charactersRepository: Repository<Character>) {}

  async getAllCharacters(): Promise<Character[]> {
    return await this.charactersRepository.find();
  }

  async getCharacterById(id: string): Promise<Character> {
    return await this.charactersRepository.findOne(id);
  }

  async createNewCharacter(data: CreateCharacterDto): Promise<Character> {
    const { birthYear, eyeColor, gender, hairColor, height, homeworld, mass, name, skinColor, url } = data;

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
}
