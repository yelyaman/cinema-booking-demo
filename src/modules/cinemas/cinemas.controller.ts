import { Body, Controller, Get, Post } from '@nestjs/common';
import { CinemasService } from './cinemas.service';
import { CreateCinemaDto } from './cinemas.dto';

@Controller('cinemas')
export class CinemasController {
  constructor(private cinemasService: CinemasService) {}

  @Post('create')
  async create(@Body() body: CreateCinemaDto) {
    return this.cinemasService.create(body)
  }

  @Get()
  async getList() {
    return this.cinemasService.getList()
  }
}
