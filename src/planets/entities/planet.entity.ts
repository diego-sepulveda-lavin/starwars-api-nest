import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// Entities
import { User } from '../../users/entities/user.entity';

@Entity()
export class Planet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column({ name: 'rotation_period' })
  rotationPeriod: string;

  @Column({ name: 'orbital_period' })
  orbitalPeriod: string;

  @Column()
  diameter: string;

  @Column({ length: 100 })
  climate: string;

  @Column({ length: 100 })
  gravity: string;

  @Column({ length: 100 })
  terrain: string;

  @Column({ name: 'surface_water' })
  surfaceWater: string;

  @Column()
  population: string;

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
    name: 'favorite_planet',
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
