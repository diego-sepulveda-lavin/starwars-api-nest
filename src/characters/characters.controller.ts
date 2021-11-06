import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CharactersService } from './characters.service';

@ApiTags('characters')
@Controller('characters')
export class CharactersController {
  constructor(private charactersService: CharactersService) {}
  
  @Get()
  findAllCharacters() {
    return 'All characters';
  }

  @Get(':id')
  findCharacterById(@Param('id') id: string) {
    return 'One character by id';
  }
}
