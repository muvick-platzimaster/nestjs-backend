import { IsNotEmpty, IsString, ValidateIf, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SigninDto {
  @ApiProperty()
  @ValidateIf(o => !o.username)
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
