import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../entities/character.entity';

export class CreateCharacterDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  height: number;

  @ApiProperty()
  mass: number;

  @ApiProperty()
  hairColor: string;

  @ApiProperty()
  skinColor: string;

  @ApiProperty()
  eyeColor: string;

  @ApiProperty()
  birthYear: string;

  @ApiProperty({ enum: Gender })
  gender: Gender;

  @ApiProperty()
  homeworld: string;

  @ApiProperty()
  url: string;
}
