import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  isActive: boolean;

  @Expose()
  created: Date;

  @Expose()
  edited: Date;
}
