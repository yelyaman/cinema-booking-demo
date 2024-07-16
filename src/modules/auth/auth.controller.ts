import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto)
  }
}
