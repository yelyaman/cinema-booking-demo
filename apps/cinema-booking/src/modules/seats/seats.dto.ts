import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNumber, IsObject, IsOptional } from 'class-validator';
import { SeatStatus } from '../../common/enums';
import { CinemaHall } from '../../entities/cinema-hall.entity';

export class CreateSeatDto {
  @IsNumber()
  rowNumber: number;

  @IsNumber()
  seatNumber: number;

  @IsEnum(SeatStatus)
  status: SeatStatus;

  @IsOptional()
  @IsObject()
  cinemaHall?: CinemaHall;

  @IsNumber()
  price: number;
}

export class CreateSeatListDto {
  @IsObject({ each: true })
  seats: CreateSeatDto[];
}

export class UpdateSeatDto extends PartialType(CreateSeatDto) {}
