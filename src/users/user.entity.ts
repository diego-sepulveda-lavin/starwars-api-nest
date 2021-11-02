import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

import { Character } from '../character/character.entity';
import { Planet } from '../planet/planet.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  edited: Date;

  @ManyToMany(() => Character, (character) => character.users)
  favoriteCharacters: Character[];

  @ManyToMany(() => Planet, (planet) => planet.users)
  favoritePlanets: Planet[];
}
