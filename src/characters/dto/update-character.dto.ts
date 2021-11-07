import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Gender } from '../entities/character.entity';

export class UpdateCharacterDto {
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
  hairColor: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  skinColor: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  eyeColor: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
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
