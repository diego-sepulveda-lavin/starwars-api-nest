import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class JwtDto {
  @ApiProperty()
  @Expose()
  access_token: string;
}
