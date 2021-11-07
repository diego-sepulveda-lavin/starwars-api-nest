import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

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
  @ApiResponse({ status: 200, description: 'Returns a list with all characters' })
  async getAllCharacters(): Promise<Character[]> {
    return await this.charactersService.getAllCharacters();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returns a specific character for given id' })
  @ApiResponse({ status: 404, description: 'Character not found for given id' })
  async getCharacterById(@Param('id', ParseIntPipe) id: number): Promise<Character> {
    return await this.charactersService.getCharacterById(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Some fields are missing or character already exists' })
  async createNewCharacter(@Body() createCharacterDto: CreateCharacterDto): Promise<Character> {
    return await this.charactersService.createNewCharacter(createCharacterDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Returns deleted character for given id' })
  @ApiResponse({ status: 404, description: 'Character not found for given id' })
  async removeCharacterById(@Param('id', ParseIntPipe) id: number): Promise<Character> {
    return await this.charactersService.removeCharacterById(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'The record has been successfully modified.' })
  @ApiResponse({ status: 400, description: 'Some fields are missing or character already exists' })
  @ApiResponse({ status: 404, description: 'Planet not found for given id' })
  async updateCharacterById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ): Promise<Character> {
    return await this.charactersService.updateCharacterById(id, updateCharacterDto);
  }
}
