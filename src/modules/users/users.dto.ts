import { IsEmail, IsString, IsUUID } from "class-validator";

export class CreateUserDto {
  @IsUUID()
  cinema_id: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  middleName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
