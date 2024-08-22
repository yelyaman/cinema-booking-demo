import { Injectable } from '@nestjs/common';
import { CreateCinemaDto } from './cinemas.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cinema } from '../../entities/cinema.entity';

@Injectable()
export class CinemasService {
  constructor(
    @InjectRepository(Cinema)
    private cinemasRepository: Repository<Cinema>,
  ) {}

  async create(body: CreateCinemaDto) {
    return this.cinemasRepository.save(body);
  }

  async getList() {
    return this.cinemasRepository.find();
  }
}
