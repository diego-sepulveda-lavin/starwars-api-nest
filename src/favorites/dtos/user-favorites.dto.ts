import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserFavoritesDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  favoriteCharacters: [];

  @ApiProperty()
  @Expose()
  favoritePlanets: [];
}
