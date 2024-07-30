import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seat } from 'src/entities/seat.entity';
import { Repository } from 'typeorm';
import { CreateSeatDto, UpdateSeatDto } from './seats.dto';

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(Seat)
    private seatsRepository: Repository<Seat> 
  ){}

  async create(body: CreateSeatDto) {
    return this.seatsRepository.save(body)
  }

  async update(body: UpdateSeatDto) {
    return this.seatsRepository.save(body)
  }

  async getList(cinemaHallId: string) {
    return this.seatsRepository.find({
      where: {
        cinemaHall: {
          id: cinemaHallId
        }
      }
    })
  }
}
