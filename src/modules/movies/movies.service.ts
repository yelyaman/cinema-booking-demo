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
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/entities/movie.entity';
import { Repository } from 'typeorm';
import { genSalt } from 'bcrypt';

@Injectable()
export class MoviesService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
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

    if (!data) throw new NotFoundException('movie from kinopoisk not found');

    this.cacheManager.set(`kinopoisk:${id}`, data, 60 * 60 * 1000 * 6);

    return data;
  }

  async addMovieByKinopoiskId(user: User, kinopoiskId: number) {
    const kinopoiskMovie = await this.getFromKinopoiskyId(kinopoiskId);
    console.log(kinopoiskMovie)
    return this.movieRepository.save({
      name: kinopoiskMovie.name,
      cinemas: [{ id: user.cinema.id }],
      kinopoiskId: kinopoiskMovie.id,
      movieLength: kinopoiskMovie.movieLength,
      description: kinopoiskMovie.description,
      posterUrl: kinopoiskMovie.poster.url,
      ratingAgeLimit: kinopoiskMovie.ageRating,
      status: kinopoiskMovie.status,
      genres: kinopoiskMovie.genres.map((gen) => gen.name),
    });
  }
}
