import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './auth.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signin(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto)
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto)
  }

  @Post('signout')
  async signout() {

  }
}
