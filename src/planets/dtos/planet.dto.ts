import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PlanetDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  rotationPeriod: string;

  @ApiProperty()
  @Expose()
  orbitalPeriod: string;

  @ApiProperty()
  @Expose()
  diameter: string;

  @ApiProperty()
  @Expose()
  climate: string;

  @ApiProperty()
  @Expose()
  gravity: string;

  @ApiProperty()
  @Expose()
  terrain: string;

  @ApiProperty()
  @Expose()
  surfaceWater: string;

  @ApiProperty()
  @Expose()
  population: string;

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
