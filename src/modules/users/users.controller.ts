import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('Users')
export class UsersController {
  constructor (
    private usersService: UsersService
  ) {}
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }
}
