import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cinema } from './cinema.entity';
import { KinopoiskStatus as KinopoiskStatus } from 'src/modules/movies/movies.dto';
import { Schedule } from './schedule.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Cinema, (cinemas) => cinemas.movies)
  cinemas: Cinema[];

  @OneToMany(() => Schedule, schedule => schedule.movie)
  schedules: Schedule[]

  @Column({ unique: true })
  kinopoiskId: number;

  @Column({ nullable: true })
  movieLength: number;

  @Column()
  description: string;

  @Column({ default: 0 })
  rating: number;

  @Column({ default: 0 })
  ratedCount: number;

  @Column({ nullable: true })
  ratingAgeLimit: number;

  @Column()
  posterUrl: string;

  @Column({
    type: 'enum',
    enum: KinopoiskStatus,
    default: KinopoiskStatus.ANNOUNCED,
  })
  status: KinopoiskStatus;

  @Column('varchar', { array: true })
  genres: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
