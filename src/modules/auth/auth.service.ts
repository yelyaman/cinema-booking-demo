import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService
  ){}

  async signIn(body: SignInDto) {
    try {
      const user = await this.usersService.findOne(body.email);
      if (!user) throw Error('user not found');
    } catch (error) {

    }
  }
}
