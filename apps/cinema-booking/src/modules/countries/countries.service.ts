import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './countries.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from '../../entities/country.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private countriesRepository: Repository<Country>,
  ) {}

  async create(body: CreateCountryDto) {
    return this.countriesRepository.save(body);
  }

  async getList() {
    return this.countriesRepository.find();
  }
}
