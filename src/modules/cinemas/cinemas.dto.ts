import { IsObject, IsString } from 'class-validator';
import { City } from 'src/entities/city.entity';

export class CreateCinemaDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsObject()
  city: Partial<City>;
}
