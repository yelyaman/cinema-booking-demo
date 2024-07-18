import { IsEmail, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { Role } from 'src/common/enums';

export class CreateUserDto {
  @IsEnum({
    enum: Role,
  })
  @IsOptional()
  role: Role;

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
