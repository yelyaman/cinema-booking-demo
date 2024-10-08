import { IsObject, IsString, IsUUID } from 'class-validator';
import { Country } from '../../entities/country.entity';

export class CreateCityDto {
  @IsString()
  name: string;

  @IsObject()
  country: Partial<Country>;
}
