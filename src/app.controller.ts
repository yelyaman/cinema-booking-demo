import { Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common/decorators/ispublic.decorator';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Public()
  @Post('fill_database')
  async fillDatabase() {
    return this.appService.fillDatabase()
  }
}
