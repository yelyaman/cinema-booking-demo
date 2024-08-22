import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from '../../entities/schedule.entity';
import { CreateScheduleDto } from './schedule.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule> 
  ){}

  async create(body: CreateScheduleDto) {
    return this.scheduleRepository.save(body)
  }

  // async update(body: UpdateSeatDto) {
  //   return this.scheduleRepository.save(body)
  // }

  async getList() {
    return this.scheduleRepository.find()
  }

  async getListByCityId(cityId: string) {
    return this.scheduleRepository.find({
      where: {
        cinemaHall: {
          cinema: {
            city: {
              id: cityId
            }
          }
        }
      }
    })
  }
}
