import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// Dtos
import { CreateCharacterDto } from './dto/create-character.dto';
// Entities
import { Character } from './entities/character.entity';
// Services
import { CharactersService } from './characters.service';

@ApiTags('characters')
@Controller('characters')
export class CharactersController {
  constructor(private charactersService: CharactersService) {}

  @Get()
  getAllCharacters(): Promise<Character[]> {
    return this.charactersService.getAllCharacters();
  }

  @Get(':id')
  getCharacterById(@Param('id') id: string): Promise<Character> {
    return this.charactersService.getCharacterById(id);
  }

  @Post()
  createNewCharacter(@Body() createCharacterDto: CreateCharacterDto): Promise<Character> {
    return this.charactersService.createNewCharacter(createCharacterDto);
  }
}
