import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CinemaHall } from './cinema-hall.entity';
import { User } from './user.entity';

@Entity()
export class Cinema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => CinemaHall, (cinemaHalls) => cinemaHalls.cinema)
  cinemaHalls: CinemaHall[];

  @OneToMany(() => User, (users) => users.cinema)
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
