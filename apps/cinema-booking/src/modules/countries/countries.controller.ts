import { Body, Controller, Get, Post } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './countries.dto';

@Controller('countries')
export class CountriesController {
  constructor(private countriesService: CountriesService) {}

  @Post('create')
  async create(@Body() body: CreateCountryDto) {
    return this.countriesService.create(body)
  }

  @Get()
  async getList() {
    return this.countriesService.getList()
  }
}
