import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cinema } from './cinema.entity';

@Entity()
export class CinemaHall {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  numeration: number

  @ManyToOne(() => Cinema, (cinema) => cinema.cinemaHalls)
  cinema: Cinema

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
