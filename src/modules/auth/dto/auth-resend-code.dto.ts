import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthResendCodeDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string
}
