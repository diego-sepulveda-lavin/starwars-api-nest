import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// Dtos
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
// Entities
import { Character } from './entities/character.entity';
// Services
import { CharactersService } from './characters.service';

@ApiTags('characters')
@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  async getAllCharacters(): Promise<Character[]> {
    return await this.charactersService.getAllCharacters();
  }

  @Get(':id')
  async getCharacterById(@Param('id', ParseIntPipe) id: number): Promise<Character> {
    return await this.charactersService.getCharacterById(id);
  }

  @Post()
  async createNewCharacter(@Body() createCharacterDto: CreateCharacterDto): Promise<Character> {
    return await this.charactersService.createNewCharacter(createCharacterDto);
  }

  @Delete(':id')
  async removeCharacterById(@Param('id', ParseIntPipe) id: number): Promise<Character> {
    return await this.charactersService.removeCharacterById(id);
  }

  @Put(':id')
  async updateCharacterById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ): Promise<Character> {
    return await this.charactersService.updateCharacterById(id, updateCharacterDto);
  }
}
