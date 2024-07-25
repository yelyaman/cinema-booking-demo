import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';
import { Country } from './entities/country.entity';
import { City } from './entities/city.entity';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { User } from './entities/user.entity';
import { AuthGuard } from './common/guards/auth.guard';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { MoviesModule } from './modules/movies/movies.module';
import { Cinema } from './entities/cinema.entity';
import { Seat } from './entities/seat.entity';
import { CinemaHall } from './entities/cinema-hall.entity';
import { CountriesModule } from './modules/countries/countries.module';
import { CitiesModule } from './modules/cities/cities.module';
import { CinemasModule } from './modules/cinemas/cinemas.module';
import { Movie } from './entities/movie.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
      isGlobal: true,
      // ttl: 5,
      // max: 10,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_LOCAL_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_ROOT_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      entities: [Country, City, User, Cinema, CinemaHall, City, Country, Seat, Movie],
    }),
    AuthModule,
    UsersModule,
    MoviesModule,
    CountriesModule,
    CitiesModule,
    CinemasModule,
    MoviesModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
