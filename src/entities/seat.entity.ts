import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CinemaHall } from './cinema-hall.entity';
import { SeatStatus } from 'src/common/enums';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CinemaHall, cinemaHall => cinemaHall.seats)
  cinemaHall: CinemaHall

  @Column()
  rowNumber: number;

  @Column()
  seatNumber: number;

  @Column({
    type: 'enum',
    enum: SeatStatus,
    default: SeatStatus.FREE,
  })
  status: SeatStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
