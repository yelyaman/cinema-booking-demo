import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { CinemaHallsService } from './cinema-halls.service';
import { CreateCinemaHallsDto, UpdateCinemaHallsDto } from './cinema-halls.dto';

@Controller('cinema-halls')
export class CinemaHallsController {
  constructor(private cinemaHallsService: CinemaHallsService) {}

  @Get()
  async getList(@Request() req) {
    return this.cinemaHallsService.getList(req.user);
  }

  @Get('/:id')
  async getOne(@Query('id') id: string) {
    return this.cinemaHallsService.getOne(id);
  }

  @Post('create')
  async create(@Body() body: CreateCinemaHallsDto) {
    return this.cinemaHallsService.create(body);
  }

  @Post('update/:id')
  async update(@Body() body: UpdateCinemaHallsDto, @Query('id') id: string) {
    return this.cinemaHallsService.update(id ,body);
  }
}
