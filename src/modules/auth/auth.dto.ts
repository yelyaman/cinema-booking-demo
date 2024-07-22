import { IsEmail, IsString } from 'class-validator';
import { Role } from 'src/common/enums';

export class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class JwtPayload {
  id: string;
  email: string;
  role: Role;
  accessTokenId: string;
}
