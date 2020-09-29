import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The username' })
  name: string;
  @IsNotEmpty({ message: 'email_required' })
  @IsString()
  @ApiProperty({ description: 'The email', required: true })
  email: string;
  @IsNotEmpty({ message: 'password_required' })
  @IsString()
  @ApiProperty({
    description: 'The password',
    minLength: 10,
    maxLength: 20,
    required: true,
  })

  password: string;

  @ApiProperty({
    description: 'Languages available: es (spanish), en (English)',
    required: false
  })

  language:string
}
