import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The username' })
  name: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The email' })
  email: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The password',
    minLength: 10,
    maxLength: 20,
    required: true,
  })
  password: string;
}
