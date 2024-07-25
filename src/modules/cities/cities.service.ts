import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './cities.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from 'src/entities/city.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private citiesRepository: Repository<City>,
  ) {}

  async create(body: CreateCityDto) {
    console.log(body);
    return this.citiesRepository.save(body);
  }

  async getList() {
    return this.citiesRepository.find({
      relations: {
        cinemas: true,
      },
    });
  }
}
