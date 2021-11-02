import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { User } from '../users/user.entity';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NOT_AVAILABLE = 'n/a',
}

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column()
  height: number;

  @Column()
  mass: number;

  @Column({ length: 100, name: 'hair_color' })
  hairColor: string;

  @Column({ length: 100, name: 'skin_color' })
  skinColor: string;

  @Column({ length: 100, name: 'eye_color' })
  eyeColor: string;

  @Column({ length: 100, name: 'birth_year' })
  birthYear: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column()
  homeworld: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  edited: Date;

  @Column()
  url: string;

  @ManyToMany(() => User, (user) => user.favoriteCharacters, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'favourite_character',
    joinColumn: {
      name: 'character_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: User[];
}
