import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { KinopoiskGetAllParams } from './movies.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { User } from 'src/entities/user.entity';

@Injectable()
export class MoviesService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getFromKinopoiskAll(params: KinopoiskGetAllParams) {
    const { data } = await firstValueFrom(
      this.httpService.get(`${process.env.KINOPOISK_URL}/movie`, {
        params,
        headers: {
          'X-API-KEY': process.env.KINOPOISK_API_KEY,
        },
      }),
    );

    return data;
  }

  async getFromKinopoiskyId(id: number) {
    const cachedResult = await this.cacheManager.get(`kinopoisk:${id}`);
    console.log(cachedResult);
    if (cachedResult) {
      console.log('returned from cache');
      return cachedResult;
    }

    const { data } = await firstValueFrom(
      this.httpService.get(`${process.env.KINOPOISK_URL}/movie/${id}`, {
        headers: {
          'X-API-KEY': process.env.KINOPOISK_API_KEY,
        },
      }),
    );

    if (!data) throw new NotFoundException('movie from kinopoisk not found')

    this.cacheManager.set(`kinopoisk:${id}`, data, 60 * 60 * 1000 * 6);

    return data;
  }

  async addMovieByKinopoiskId(user: User, kinopoiskId: number) {
    const kinopoiskMovie = await this.getFromKinopoiskyId(kinopoiskId)
    


  }
}
