import { IsObject, IsString } from 'class-validator';
import { City } from '../../entities/city.entity';

export class CreateCinemaDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsObject()
  city: Partial<City>;
}
