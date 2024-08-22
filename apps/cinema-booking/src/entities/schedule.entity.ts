import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Reservation } from './reservation.entity';
import { Movie } from './movie.entity';
import { CinemaHall } from './cinema-hall.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Reservation, reservation => reservation.schedule)
  reservations: Reservation[]

  @Column({ type: 'timestamp' })
  startTime: Date

  @ManyToOne(() => Movie, movie => movie.schedules)
  movie: Movie

  @ManyToOne(() => CinemaHall, cinemaHall => cinemaHall.schedules)
  cinemaHall: CinemaHall

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
