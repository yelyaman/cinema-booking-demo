import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { CinemaHall } from './cinema-hall.entity';

@Entity()
export class Cinema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => CinemaHall, (cinemaHalls) => cinemaHalls.cinema)
  cinemaHalls: CinemaHall[]

  @OneToMany(() => Customer, (customers) => customers.cinema)
  customers: Customer[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
