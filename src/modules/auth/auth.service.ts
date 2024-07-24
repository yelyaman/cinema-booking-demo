import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtPayload, SignInDto } from './auth.dto';
import { CreateUserDto } from '../users/users.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { v4 as uuid } from 'uuid';

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

    const accessToken = await this.generateAccessToken(rest);

    const refreshToken = await this.jwtService.signAsync(rest, {
      secret: process.env.REFRESH_KEY,
      expiresIn: 180,
    });

    await this.saveRefreshToken(refreshToken, rest);

    return { accessToken, refreshToken };
  }

  async signUp(body: CreateUserDto) {
    return await this.usersService.create(body);
  }

  async signOut(user: JwtPayload) {
    await this.setTokenBlackList(user.accessTokenId);
    await this.cacheManager.del(`refreshToken:${user.id}`);

    return { msg: 'signed out' };
  }

  async refresh(refreshToken: string, accessToken: string) {
    const oldAccessTokenPayload = await this.jwtService.decode(accessToken);

    await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.REFRESH_KEY,
    });
    const cachedRefreshToken = await this.cacheManager.get(
      `refreshToken:${oldAccessTokenPayload.id}`,
    );

    if (!cachedRefreshToken || cachedRefreshToken != refreshToken)
      throw new UnauthorizedException('Invalid refresh token');

    await this.setTokenBlackList(oldAccessTokenPayload.accessTokenId);

    const newAccessToken = await this.generateAccessToken(
      oldAccessTokenPayload,
    );

    console.log(newAccessToken);

    return { accessToken: newAccessToken };
  }

  private saveRefreshToken = async (refreshToken, user) => {
    await this.cacheManager.set(
      `refreshToken:${user.id}`,
      refreshToken,
      1000 * 180,
    );
  };

  private generateAccessToken = async (payload) => {
    const accessTokenId = uuid();
    const { exp, iat, ...purePayload } = payload;

    console.log(purePayload);
    const accessToken = await this.jwtService.signAsync(
      { ...purePayload, accessTokenId },
      {
        secret: process.env.JWT_KEY,
        expiresIn: '1d',
      },
    );

    return accessToken;
  };

  private setTokenBlackList = async (accessTokenId: string) => {
    await this.cacheManager.set(
      `blacklist:${accessTokenId}`,
      accessTokenId,
      60 * 60 * 1000 * 24 * 10,
    ); // 10 дней
  };
}
