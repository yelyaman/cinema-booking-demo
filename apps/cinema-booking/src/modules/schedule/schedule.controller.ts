import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateScheduleDto } from './schedule.dto';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Post('create')
  async create(@Body() body: CreateScheduleDto) {
    return this.scheduleService.create(body);
  }

  @Get('')
  async getList() {
    return this.scheduleService.getList();
  }

  @Get('by_city')
  async getByCity(@Query('cityId') cityId: string) {
    return this.scheduleService.getListByCityId(cityId);
  }
}
