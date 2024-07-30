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

@Injectable()
export class AppService {
  constructor(
    
    @InjectRepository(City) private cityRepository: Repository<City>,
    @InjectRepository(Country) private countryRepository: Repository<Country>,
    @InjectRepository(Cinema) private cinemaRepository: Repository<Cinema>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Movie) private movieRepository: Repository<User>,
    @InjectRepository(CinemaHall)
    private cinemaHallRepository: Repository<CinemaHall>,
    @InjectRepository(Seat) private seatRepository: Repository<Seat>,
  ) {}

  async fillDatabase() {
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
    
    return { msg: 'success' };
  }
}
