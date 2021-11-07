import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreatePlanetDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  rotationPeriod: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  orbitalPeriod: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  diameter: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  climate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  gravity: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  terrain: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  surfaceWater: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  population: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  url: string;
}
