import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto } from './auth.dto';
import { CreateUserDto } from '../users/users.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async signIn(body: SignInDto) {
    const user = await this.usersService.findOne(body.email);
    if (!user) throw new BadRequestException('user not found');

    if (!bcrypt.compare(body.password, user.password))
      throw new UnauthorizedException();

    const { password, ...rest } = user;
    const tokens = await this.generateTokens(rest);
    await this.saveRefreshToken(tokens.refreshToken, rest);

    return tokens;
  }

  async signUp(body: CreateUserDto) {
    return await this.usersService.create(body);
  }

  async signOut(accessToken: string, refreshToken: string) {
    const user = await this.jwtService.verifyAsync(refreshToken, { secret: process.env.REFRESH_KEY})

    
  }

  async refresh(refreshToken: string) {
    const currentRefreshTokenPayload = await this.jwtService.verifyAsync(refreshToken, { secret: process.env.REFRESH_KEY});

    const cachedRefreshToken = await this.cacheManager.get(
      `refreshToken:${currentRefreshTokenPayload.id}`,
    );

    if (!cachedRefreshToken || cachedRefreshToken != refreshToken)
      throw new UnauthorizedException('Invalid refresh token');

    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.REFRESH_KEY,
    });

    if (!payload) throw new BadRequestException('invalid refresh token');

    const newTokens = await this.generateTokens(payload);
    await this.saveRefreshToken(newTokens.refreshToken, payload);

    return newTokens;
  }

  private generateTokens = async (user) => {
    const accessToken = await this.jwtService.signAsync(user, {
      secret: process.env.JWT_KEY,
    });
    const refreshToken = await this.jwtService.signAsync(user, {
      secret: process.env.REFRESH_KEY,
    });

    return { accessToken, refreshToken };
  };

  private saveRefreshToken = async (refreshToken, user) => {
    await this.cacheManager.set(
      `refreshToken:${user.id}`,
      refreshToken,
      1000 * 180,
    );
  };
}
