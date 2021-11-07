import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

import { Gender } from '../entities/character.entity';

export class CreateCharacterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  height: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  mass: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  hairColor: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  skinColor: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  eyeColor: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  birthYear: string;

  @ApiProperty({ enum: Gender })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  homeworld: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  url: string;
}
