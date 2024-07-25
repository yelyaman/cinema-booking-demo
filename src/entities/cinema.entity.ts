import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CinemaHall } from './cinema-hall.entity';
import { User } from './user.entity';
import { City } from './city.entity';
import { Movie } from './movie.entity';

@Entity()
export class Cinema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Movie, movies => movies.cinemas)
  @JoinTable()
  movies: Movie[]

  @Column()
  address: string;

  @ManyToOne(() => City, (city) => city.cinemas, { nullable: false })
  city: City;

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
