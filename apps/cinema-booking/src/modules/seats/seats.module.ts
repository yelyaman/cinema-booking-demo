import { Module } from '@nestjs/common';
import { SeatsController } from './seats.controller';
import { SeatsService } from './seats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from '../../entities/seat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Seat])
  ],
  controllers: [SeatsController],
  providers: [SeatsService]
})
export class SeatsModule {}
