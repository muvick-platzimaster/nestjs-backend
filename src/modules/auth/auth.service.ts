import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { SignChangeDto, SigninDto, SignupDto } from './dto';
import { compare, genSalt, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/schemas/user.schema';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { UtilService } from '../../util/util.service';
import PasswordValidator = require('password-validator');
import { generatePin } from 'generate-pin'

@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _utilService: UtilService,
    @InjectModel('user') private userModel: Model<User>,
  ) {}

  async signUp(signup: SignupDto): Promise<void> {
    const user = await this.userModel.findOne({ email: signup.email });
    if (!user) {
      console.log('Registrando ', signup);
      const isSecure = this.isValidPassword(signup.password);
      if (!isSecure) {
        throw new ConflictException('password_not_secure');
      }
      const salt = await genSalt(10);
      signup.password = await hash(signup.password, salt);
      const userCreated = new this.userModel(signup);
      // Generates a PIN to confirm the user later
      userCreated.pin = generatePin()[0]
      await userCreated.save();
      return;
    }
    throw new ConflictException('email_already_exists');
  }
  async signIn(
    signin: SigninDto,
  ): Promise<{
    accessToken: string;
    name: string;
    email: string;
  }> {
    const { password } = signin;
    const user = await this.userModel.findOne({ email: signin.email });
    if (!user) throw new NotFoundException('invalid_credentials');
    const isMatch = await compare(password, user.password);
    console.log('Debo de autenticar?', isMatch);
    if (!isMatch) throw new UnauthorizedException('invalid_credentials');
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
  async signChange(signChange: SignChangeDto): Promise<boolean> {
    const user = await this.userModel.findOne({ email: signChange.email });
    if (!user) throw new NotFoundException('user_not_found');
    const isMatch = await compare(signChange.old, user.password);
    if (!isMatch) throw new UnauthorizedException('invalid_credentials');
    const isSecure = this.isValidPassword(signChange.new);
    if (!isSecure) {
      throw new ConflictException('password_not_secured');
    }
    const salt = await genSalt(10);
    user.password = await hash(signChange.new, salt);
    await user.save();
    return true;
  }

  private isValidPassword(password: string) {
    const schema = new PasswordValidator();
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
      .digits() // Must have at least 2 digits
      .has()
      .symbols() // Must have symbols
      .has()
      .not()
      .spaces();
    const isSecure = schema.validate(password);
    if (!isSecure) {
      console.log(
        'The password has not ',
        schema.validate(password, { list: true }),
      );
    }
    return isSecure;
  }
}
