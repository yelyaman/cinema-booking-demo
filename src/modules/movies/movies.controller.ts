import { Body, Controller, Get, Param, Post, Query, Request } from '@nestjs/common';
import { KinopoiskGetAllParams } from './movies.dto';
import { MoviesService } from './movies.service';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get('kinopoisk')
  @CacheTTL(3600) // Не работает, нужно попробовать cache-manager-redis-yet
  async getAllFromKinopoisk(@Query() queryParams: KinopoiskGetAllParams) {
    console.log('kinokinokino');
    return this.moviesService.getFromKinopoiskAll(queryParams);
  }

  @Get('kinopoisk/:id')
  @CacheTTL(3600) // Не работает
  async getFromKinopoiskyId(@Param('id') id: number) {
    return this.moviesService.getFromKinopoiskyId(id);
  }

  @Post('add_by_kinopoisk_id')
  async addMovieByKinopoiskId(@Request() req, @Body('kinopoiskId') kinopoiskId: number) {
    return this.moviesService.addMovieByKinopoiskId(req.user, kinopoiskId)

  }
}
