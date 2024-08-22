import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { CinemaHall } from './entities/cinema-hall.entity';
import { Cinema } from './entities/cinema.entity';
import { Seat } from './entities/seat.entity';
import { User } from './entities/user.entity';
import { Role } from './common/enums';
import * as bcrypt from 'bcrypt';
import { Movie } from './entities/movie.entity';
import { KinopoiskStatus } from './modules/movies/movies.dto';

@Injectable()
export class AppService {
  constructor(
    
    @InjectRepository(City) private cityRepository: Repository<City>,
    @InjectRepository(Country) private countryRepository: Repository<Country>,
    @InjectRepository(Cinema) private cinemaRepository: Repository<Cinema>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
    @InjectRepository(CinemaHall)
    private cinemaHallRepository: Repository<CinemaHall>,
    @InjectRepository(Seat) private seatRepository: Repository<Seat>,
  ) {}

  async fillDatabase() {

    await Promise.all([
      this.cityRepository.clear(),
      this.countryRepository.clear(),
      this.cinemaRepository.clear(),
      this.userRepository.clear(),
      this.movieRepository.clear(),
      this.cinemaHallRepository.clear(),
      this.seatRepository.clear(),
    ])

    const country = await this.countryRepository.save({
      name: 'Казахстан',
    });

    const city = await this.cityRepository.save({
      country,
      name: 'Алматы',
    });

    const cinemas = await this.cinemaRepository.save([
      {
        name: 'Kinopark',
        address: 'abay',
        city,
      },
      {
        name: 'Kinoforum',
        address: 'seifullina',
        city,
      },
    ]);

    const cinemaHalls = await this.cinemaHallRepository.save([{
      numeration: 1,
      cinema: { id: cinemas[0].id},
      seats: [
        {rowNumber: 1, seatNumber: 1, price: 2000},
        {rowNumber: 1, seatNumber: 2, price: 2000},
        {rowNumber: 1, seatNumber: 3, price: 2000},
        {rowNumber: 1, seatNumber: 4, price: 2000}
      ]
    },
    {
      numeration: 2,
      cinema: { id: cinemas[0].id},
      seats: [
        {rowNumber: 1, seatNumber: 1, price: 3000},
        {rowNumber: 1, seatNumber: 2, price: 3000},
        {rowNumber: 1, seatNumber: 3, price: 3000},
        {rowNumber: 1, seatNumber: 4, price: 3000}
      ]
    },
    {
      numeration: 3,
      cinema: { id: cinemas[0].id},
      seats: [
        {rowNumber: 1, seatNumber: 1, price: 1000},
        {rowNumber: 1, seatNumber: 2, price: 1000},
        {rowNumber: 1, seatNumber: 3, price: 1000},
        {rowNumber: 1, seatNumber: 4, price: 1000}
      ]
    },
    {
      numeration: 1,
      cinema: { id: cinemas[1].id},
      seats: [
        {rowNumber: 1, seatNumber: 1, price: 5000},
        {rowNumber: 1, seatNumber: 2, price: 5000},
        {rowNumber: 1, seatNumber: 3, price: 5000},
        {rowNumber: 1, seatNumber: 4, price: 5000}
      ]
    },
    {
      numeration: 2,
      cinema: { id: cinemas[1].id},
      seats: [
        {rowNumber: 1, seatNumber: 1},
        {rowNumber: 1, seatNumber: 2},
        {rowNumber: 1, seatNumber: 3},
        {rowNumber: 1, seatNumber: 4}
      ]
    }])

    const hashedPass = await bcrypt.hash('123456', 12);
    const users = await this.userRepository.save([
      {
        role: Role.ADMIN,
        cinema: cinemas[0],
        firstName: 'ADMIN',
        email: 'admin@gmail.com',
        password: hashedPass,
      },
      {
        role: Role.ADMIN,
        cinema: cinemas[1],
        firstName: 'ADMIN2',
        email: 'admin2@gmail.com',
        password: hashedPass,
      },
      {
        role: Role.CONSUMER,
        cinema: cinemas[0],
        firstName: 'CONSUMER',
        email: 'consumer@gmail.com',
        password: hashedPass,
      },
    ]);

    const movies = await this.movieRepository.save([{
      name: 'Фильм 1',
      kinopoiskId: 1008444,
      movieLength: 128,
      description: 'Описание к фильму 1',
      status: KinopoiskStatus.ANNOUNCED,
      genres:['фантастика','боевик','комедия','приключения'],
      cinemas: [{
        id: cinemas[0].id
      },{
        id: cinemas[1].id
      },]
    },
    {
      name: 'Фильм 2',
      kinopoiskId: 838,
      movieLength: 60,
      description: 'Описание к фильму 2',
      status: KinopoiskStatus.ANNOUNCED,
      genres:['драма'],
      cinemas: [{
        id: cinemas[1].id
      },]
    }])
    
    return { msg: 'success' };
  }
}
