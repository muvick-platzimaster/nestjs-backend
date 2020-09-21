import { IsString, IsEmail } from 'class-validator';

export class UserCreateDto {
  @IsString()
  name: string;

  @IsEmail()
  email: number;

  password: string;

  plan: boolean;

  createdAt: Date;
}
