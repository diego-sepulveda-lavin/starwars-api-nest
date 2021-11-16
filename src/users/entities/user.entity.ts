import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';

import { Character } from '../../characters/entities/character.entity';
import { Planet } from '../../planets/entities/planet.entity';

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

  @Column({ name: 'is_admin', default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  edited: Date;

  @ManyToMany(() => Character, (character) => character.users)
  favoriteCharacters: Character[];

  @ManyToMany(() => Planet, (planet) => planet.users)
  favoritePlanets: Planet[];
}
