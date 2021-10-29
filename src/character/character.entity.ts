import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { User } from '../user/user.entity';

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

  @Column({ length: 100 })
  hair_color: string;

  @Column({ length: 100 })
  skin_color: string;

  @Column({ length: 100 })
  eye_color: string;

  @Column({ length: 100 })
  birth_year: string;

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
      name: 'character',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user',
      referencedColumnName: 'id',
    },
  })
  users: User[];
}
