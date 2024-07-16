import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './users.dto';

@Controller('Users')
export class UsersController {
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {}
}
