import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  pin: string

  @IsString()
  language: string
}
