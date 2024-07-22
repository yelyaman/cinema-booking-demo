import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Headers
} from '@nestjs/common';
import { SignInDto } from './auth.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/users.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Get('info')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('signin')
  async signin(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Get('refresh')
  async refresh(
    @Headers('Authorization') authToken: string, 
    @Headers('refreshToken') refreshToken: string
  ) {
    const accessToken = authToken.split(' ')[1]
    return this.authService.refresh(refreshToken, accessToken);
  }

  @UseGuards(AuthGuard)
  @Get('signout')
  async signout(@Request() req) {
    await this.authService.signOut(req.user);
  }
}
