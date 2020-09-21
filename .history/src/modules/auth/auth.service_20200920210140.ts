import { Injectable } from '@nestjs/common';
import { SignChangeDto, SigninDto, SignupDto } from './dto';

@Injectable()
export class AuthService {
  signUp(signup: SignupDto): void | PromiseLike<void> {
    throw new Error('Method not implemented.');
  }
  signIn(
    signin: SigninDto,
    arg1: boolean,
  ):
    | { accessToken: string; name: string; email: string; username: string }
    | PromiseLike<{
        accessToken: string;
        name: string;
        email: string;
        username: string;
      }> {
    throw new Error('Method not implemented.');
  }
  signChange(signChange: SignChangeDto): boolean | PromiseLike<boolean> {
    throw new Error('Method not implemented.');
  }
}