import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePlanetDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  rotationPeriod: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  orbitalPeriod: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  diameter: string;

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
  @IsString()
  surfaceWater: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  population: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  url: string;
}
