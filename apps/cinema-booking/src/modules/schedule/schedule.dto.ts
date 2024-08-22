import { Type } from 'class-transformer';
import { IsDate, IsDateString, IsNotEmptyObject, IsObject } from 'class-validator';
import { CinemaHall } from '../../entities/cinema-hall.entity';
import { Movie } from '../../entities/movie.entity';

export class CreateScheduleDto {
  @IsDateString()
  startTime: string;

  @IsNotEmptyObject()
  @IsObject()
  @Type(() => Movie)
  movie: Movie;

  @IsNotEmptyObject()
  @IsObject()
  @Type(() => CinemaHall)
  cinemaHall: CinemaHall;
}
