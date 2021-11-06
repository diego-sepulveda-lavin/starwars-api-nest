import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';

@Entity()
export class Planet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column({ name: 'rotation_period' })
  rotationPeriod: number;

  @Column({ name: 'orbital_period' })
  orbitalPeriod: number;

  @Column()
  diameter: number;

  @Column({ length: 100 })
  climate: string;

  @Column({ length: 100 })
  gravity: string;

  @Column({ length: 100 })
  terrain: string;

  @Column({ name: 'surface_water' })
  surfaceWater: number;

  @Column()
  population: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  edited: Date;

  @Column()
  url: string;

  @ManyToMany(() => User, (user) => user.favoritePlanets, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'favourite_planet',
    joinColumn: {
      name: 'planet_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: User[];
}
