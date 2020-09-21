import { IsString, IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  @IsString()
  name: string;

  email: number;

  password: string;

  plan: boolean;

  createdAt: Date;
}
