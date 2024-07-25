import {
  IsEmail,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Role } from 'src/common/enums';
import { Cinema } from 'src/entities/cinema.entity';

export class CreateUserDto {
  @IsEnum(Role)
  @IsOptional()
  role: Role;

  @IsObject()
  @ValidateIf((user) => user.role == Role.ADMIN)
  cinema: Partial<Cinema>;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  middleName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
