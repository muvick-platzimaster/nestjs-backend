import { Injectable } from '@nestjs/common';
import { SignChangeDto, SigninDto, SignupDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel('user') private userModel: Model<User>) {}

  signUp(signup: SignupDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
  signIn(
    signin: SigninDto,
    arg1: boolean,
  ): Promise<{
    accessToken: string;
    name: string;
    email: string;
  }> {
    throw new Error('Method not implemented.');
  }
  signChange(signChange: SignChangeDto): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
