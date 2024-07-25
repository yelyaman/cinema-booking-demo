import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cinema } from './cinema.entity';
import { KinopoisStatus as KinopoiskStatus } from 'src/modules/movies/movies.dto';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Cinema, (cinemas) => cinemas.movies)
  cinemas: Cinema[];

  @Column({ unique: true })
  kinopoiskId: string;

  @Column({ nullable: true })
  movieLength: number;

  @Column()
  description: string;

  @Column({ default: 0 })
  rating: number;

  @Column({ default: 0 })
  ratedCount: number;

  @Column()
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
