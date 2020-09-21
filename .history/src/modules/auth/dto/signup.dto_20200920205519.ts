import { IsNotEmpty, IsString } from 'class-validator';
export class SignupDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  email: string;
  password: string;
}
