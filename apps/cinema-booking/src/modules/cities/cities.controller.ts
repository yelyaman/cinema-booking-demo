import { Body, Controller, Get, Post } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './cities.dto';

@Controller('cities')
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  @Post('create')
  async create(@Body() body: CreateCityDto) {
    return this.citiesService.create(body)
  }

  @Get()
  async getList() {
    return this.citiesService.getList()
  }
}
