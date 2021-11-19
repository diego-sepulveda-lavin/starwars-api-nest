import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CharacterDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  height: string;

  @ApiProperty()
  @Expose()
  mass: string;

  @ApiProperty()
  @Expose()
  hairColor: string;

  @ApiProperty()
  @Expose()
  skinColor: string;

  @ApiProperty()
  @Expose()
  eyeColor: string;

  @ApiProperty()
  @Expose()
  birthYear: string;

  @ApiProperty()
  @Expose()
  gender: string;

  @ApiProperty()
  @Expose()
  homeworld: string;

  @ApiProperty()
  @Expose()
  created: Date;

  @ApiProperty()
  @Expose()
  edited: Date;

  @ApiProperty()
  @Expose()
  url: string;
}
