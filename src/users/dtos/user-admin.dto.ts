import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserAdminDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  isActive: boolean;

  @ApiProperty()
  @Expose()
  isAdmin: boolean;

  @ApiProperty()
  @Expose()
  created: Date;

  @ApiProperty()
  @Expose()
  edited: Date;
}
