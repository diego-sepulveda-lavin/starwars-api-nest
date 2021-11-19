import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// Dtos
import { CreateCharacterDto } from './dtos/create-character.dto';
import { UpdateCharacterDto } from './dtos/update-character.dto';
// Entities
import { Character } from './entities/character.entity';
// Guards
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// Services
import { CharactersService } from './characters.service';

@ApiTags('characters')
@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Returns a list with all characters' })
  getAllCharacters(): Promise<Character[]> {
    return this.charactersService.getAllCharacters();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Some fields are missing or character already exists' })
  createNewCharacter(@Request() req, @Body() createCharacterDto: CreateCharacterDto): Promise<Character> {
    return this.charactersService.createNewCharacter(req.user.userId, createCharacterDto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returns a specific character for given id' })
  @ApiResponse({ status: 404, description: 'Character not found for given id' })
  getCharacterById(@Param('id', ParseIntPipe) id: number): Promise<Character> {
    return this.charactersService.getCharacterById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'The record has been successfully modified.' })
  @ApiResponse({ status: 400, description: 'Some fields are missing or character already exists' })
  @ApiResponse({ status: 404, description: 'Planet not found for given id' })
  updateCharacterById(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ): Promise<Character> {
    return this.charactersService.updateCharacterById(req.user.userId, id, updateCharacterDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Returns deleted character for given id' })
  @ApiResponse({ status: 404, description: 'Character not found for given id' })
  removeCharacterById(@Request() req, @Param('id', ParseIntPipe) id: number): Promise<Character> {
    return this.charactersService.removeCharacterById(req.user.userId, id);
  }
}
