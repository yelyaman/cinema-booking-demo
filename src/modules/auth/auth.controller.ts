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
import { Public } from 'src/common/decorators/ispublic.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('info')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Post('signin')
  async signin(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Public()
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Public()
  @Get('refresh')
  async refresh(
    @Headers('Authorization') authToken: string, 
    @Headers('refreshToken') refreshToken: string
  ) {
    const accessToken = authToken.split(' ')[1]
    return this.authService.refresh(refreshToken, accessToken);
  }

  @Get('signout')
  async signout(@Request() req) {
    await this.authService.signOut(req.user);
  }
}
