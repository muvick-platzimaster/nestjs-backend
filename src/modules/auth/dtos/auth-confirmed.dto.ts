import { IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';

export class AuthConfirmedDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsBoolean()
  confirmed: boolean;
}
