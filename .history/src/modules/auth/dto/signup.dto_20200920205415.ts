import { IsNotEmpty, IsString } from 'class-validator';
export class SignupDto {
  // @IsNotEmpty()
  // @IsString()
  // username: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  gender: string;
  password: string;

  // get name() {
  //   return this._name;
  // }

  // set name(name: string) {
  //   this._name = name.trim();
  // }
}
