import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { email },
      relations: {
        cinema: true,
      },
    });
  }

  async create(body: CreateUserDto): Promise<User> {
    const already = await this.usersRepository.findOne({
      where: { email: body.email },
    });
    if (already) throw new BadRequestException('user already exists');

    const hashedPassword = await bcrypt.hash(body.password, 12);

    const user = this.usersRepository.save({
      ...body,
      password: hashedPassword,
    });

    console.log(user);
    return user;
  }

  async getList() {
    return this.usersRepository.find();
  }
}
