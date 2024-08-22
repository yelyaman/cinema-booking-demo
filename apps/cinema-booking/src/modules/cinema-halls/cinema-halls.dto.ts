import { Cinema } from "../../entities/cinema.entity";
import { CreateSeatDto } from "../seats/seats.dto";
import { IsNumber, IsObject } from "class-validator";
import { Type } from "class-transformer";
import { PartialType } from "@nestjs/mapped-types";

export class CreateCinemaHallsDto {
  @IsNumber()
  numeration: number;

  @IsObject()
  cinema: Cinema

  @IsObject({ each: true })
  @Type(() => CreateSeatDto)
  seats: CreateSeatDto[]
}

export class UpdateCinemaHallsDto extends PartialType(CreateCinemaHallsDto) {}