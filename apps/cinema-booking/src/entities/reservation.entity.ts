import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Seat } from './seat.entity';
import { User } from './user.entity';
import { Schedule } from './schedule.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Seat, seat => seat.reservation)
  seat: Seat

  @ManyToOne(() => User, user => user.reservations)
  user: User;

  @ManyToOne(() => Schedule, schedule => schedule.reservations, { nullable: false })
  schedule: Schedule

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
