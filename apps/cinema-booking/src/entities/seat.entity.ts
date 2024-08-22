import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CinemaHall } from './cinema-hall.entity';
import { SeatStatus } from '../common/enums';
import { Reservation } from './reservation.entity';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CinemaHall, (cinemaHall) => cinemaHall.seats, {
    nullable: false,
  })
  cinemaHall: CinemaHall;

  @Column({ nullable: false })
  rowNumber: number;

  @Column({ nullable: false })
  seatNumber: number;

  @Column({
    type: 'enum',
    enum: SeatStatus,
    default: SeatStatus.FREE,
  })
  status: SeatStatus;

  @Column({ nullable: false })
  price: number;

  @OneToOne(() => Reservation, (reservation) => reservation.seat)
  reservation: Reservation;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
