import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../user/user.entity';

@Entity()
export class Planet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column()
  rotation_period: number;

  @Column()
  orbital_period: number;

  @Column()
  diameter: number;

  @Column({ length: 100 })
  climate: string;

  @Column({ length: 100 })
  gravity: string;

  @Column({ length: 100 })
  terrain: string;

  @Column()
  surface_water: number;

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
      name: 'planet',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user',
      referencedColumnName: 'id',
    },
  })
  users: User[];
}
