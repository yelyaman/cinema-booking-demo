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
import { Cinema } from './cinema.entity';
import { Seat } from './seat.entity';
import { Schedule } from './schedule.entity';

@Entity()
export class CinemaHall {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  numeration: number;

  @ManyToOne(() => Cinema, (cinema) => cinema.cinemaHalls, { nullable: false })
  cinema: Cinema;

  @OneToMany(() => Seat, (seats) => seats.cinemaHall, { cascade: true })
  seats: Seat[];

  @OneToMany(() => Schedule, (schedules) => schedules.cinemaHall)
  schedules: Schedule[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
