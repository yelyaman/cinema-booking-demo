import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './users.dto';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CacheTTL } from '@nestjs/cache-manager';

@Controller('users')
@CacheTTL(3600)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async getList() {
    console.log('GETEGT')
    return await this.usersService.getList();
  }
}
