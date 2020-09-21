import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignChangeDto, SigninDto, SignupDto } from './dto';
import { compare, genSalt, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/schemas/user.schema';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
// import passwordValidator from 'password-validator';
const passwordValidator = require('password-validator');
@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtService: JwtService,
    @InjectModel('user') private userModel: Model<User>,
  ) {}

  async signUp(signup: SignupDto): Promise<void> {
    const user = await this.userModel.findOne({ email: signup.email });
    if (!user) {
      console.log('Registrando ', signup);
      const schema = new passwordValidator();
      schema
        .is()
        .min(10) // Minimum length 10
        .is()
        .max(20) // Maximum length 20
        .has()
        .uppercase() // Must have uppercase letters
        .has()
        .lowercase() // Must have lowercase letters
        .has()
        .digits(2) // Must have at least 2 digits
        .has()
        .symbols() // Must have symbols
        .has()
        .not()
        .spaces();
      const isSecured = schema.validate(signup.password);
      if (!isSecured) {
        console.log(
          'The password has not ',
          schema.validate(signup.password, { list: true }),
        );
        throw new ConflictException('password_not_secured');
      }
      const salt = await genSalt(10);
      signup.password = await hash(signup.password, salt);
      const userCreated = new this.userModel(signup);
      userCreated.save();
      return;
    }
    throw new ConflictException('email_already_exists');
  }
  async signIn(
    signin: SigninDto,
    arg1: boolean,
  ): Promise<{
    accessToken: string;
    name: string;
    email: string;
  }> {
    const { password } = signin;
    const user = await this.userModel.findOne({ email: signin.email });
    console.log('Usuario a autenticar?');

    const isMath = await compare(password, user.password);
    console.log('Debo de autenticar?', isMath);
    if (!isMath) throw new UnauthorizedException('Invalid Credentials');
    const payload: IJwtPayload = {
      email: user.email,
    };
    const token = await this._jwtService.sign(payload);
    return {
      accessToken: token,
      name: user.name,
      email: user.email,
    };
  }
  signChange(signChange: SignChangeDto): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
