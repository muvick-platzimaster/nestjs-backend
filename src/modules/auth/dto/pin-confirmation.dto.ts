import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class PinConfirmationDto {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  @Length(4, 4)
  pin: string
}
