import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}
