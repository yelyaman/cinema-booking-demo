import { Body, Controller, Get, Param, Post, Query, Request, UseInterceptors } from '@nestjs/common';
import { KinopoiskGetAllParams } from './movies.dto';
import { MoviesService } from './movies.service';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(300)
  @Get('kinopoisk')
  async getAllFromKinopoisk(@Query() queryParams: KinopoiskGetAllParams) {
    console.log('kinokinokino');
    return this.moviesService.getFromKinopoiskAll(queryParams);
  }

  @Get('kinopoisk/:id')
  async getFromKinopoiskyId(@Param('id') id: number) {
    return this.moviesService.getFromKinopoiskyId(id);
  }

  @Post('add_by_kinopoisk_id')
  async addMovieByKinopoiskId(@Request() req, @Body('kinopoiskId') kinopoiskId: number) {
    return this.moviesService.addMovieByKinopoiskId(req.user, kinopoiskId)

  }
}
