import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  KinopoiskGetAllParams,
  KinopoiskGetByNameParams,
  KinopoiskStatus,
} from './movies.dto';
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

  async getOne(where: object, relations: object) {
    return this.movieRepository.findOne({
      where,
      relations,
    });
  }
  async getList() {
    return this.movieRepository.find({ relations: { cinemas: true } });
  }

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

  async getFromKinopoiskByName(params: KinopoiskGetByNameParams) {
    const { data } = await firstValueFrom(
      this.httpService.get(`${process.env.KINOPOISK_URL}/movie/search`, {
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
    const alreadySavedMovie = await this.getOne(
      { kinopoiskId },
      { cinemas: true },
    );

    if (
      alreadySavedMovie &&
      alreadySavedMovie.cinemas.find((cinema) => cinema.id === user.cinema.id)
    )
      throw new BadRequestException('movie already exists');

    if (alreadySavedMovie) {
      alreadySavedMovie.cinemas = alreadySavedMovie.cinemas.concat([
        user.cinema,
      ]);
      return this.movieRepository.save(alreadySavedMovie);
    }
    const kinopoiskMovie = await this.getFromKinopoiskyId(kinopoiskId);
    console.log(kinopoiskMovie);
    return this.movieRepository.save({
      name: kinopoiskMovie.name,
      cinemas: [user.cinema],
      kinopoiskId: kinopoiskId,
      movieLength: kinopoiskMovie.movieLength,
      description: kinopoiskMovie.description,
      posterUrl: kinopoiskMovie.poster.url,
      ratingAgeLimit: kinopoiskMovie.ageRating,
      status: kinopoiskMovie.status || KinopoiskStatus.COMPLETED,
      genres: kinopoiskMovie.genres.map((gen) => gen.name),
    });
  }

  async removeFromCinema(user: User, id: string) {
    const movie = await this.getOne({ id }, { cinema: true });

    movie.cinemas = movie.cinemas.filter(
      (cinema) => cinema.id !== user.cinema.id,
    );
    await this.movieRepository.save(movie);
    return { msg: 'success' };
  }
}
