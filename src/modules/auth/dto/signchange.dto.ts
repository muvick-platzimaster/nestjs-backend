import { IsNotEmpty, IsString } from 'class-validator';
export class SignChangeDto {
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  old: string;
  @IsNotEmpty()
  @IsString()
  new: string;
}
