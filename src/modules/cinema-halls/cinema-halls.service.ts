import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CinemaHall } from 'src/entities/cinema-hall.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCinemaHallsDto, UpdateCinemaHallsDto } from './cinema-halls.dto';

@Injectable()
export class CinemaHallsService {
  constructor(
    @InjectRepository(CinemaHall)
    private cinemaHallsRepository: Repository<CinemaHall>,
  ) {}

  async getList(user: User) {
    return this.cinemaHallsRepository.find({
      where: {
        cinema: {
          id: user.cinema.id,
        },
      },
    });
  }

  async getOne(id: string) {
    return this.cinemaHallsRepository.findOneBy({ id });
  }

  async create(body: CreateCinemaHallsDto) {
    return this.cinemaHallsRepository.save(body);
  }

  async update(id, body: UpdateCinemaHallsDto) {
    return this.cinemaHallsRepository.save({ id, ...body });
  }

  async delete(id: string) {
    return this.cinemaHallsRepository.softRemove({ id });
  }
}
