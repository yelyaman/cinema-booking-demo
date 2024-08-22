import { Module } from '@nestjs/common';
import { CinemaHallsController } from './cinema-halls.controller';
import { CinemaHallsService } from './cinema-halls.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaHall } from '../../entities/cinema-hall.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CinemaHall])
  ],
  controllers: [CinemaHallsController],
  providers: [CinemaHallsService]
})
export class CinemaHallsModule {}
