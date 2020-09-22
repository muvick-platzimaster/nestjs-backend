import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigEnum } from '../../../config/config.keys';
import { ConfigService } from '../../../config/config.service';
import { Inject, UnauthorizedException, Injectable } from '@nestjs/common';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/modules/user/schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configService: ConfigService,
    @InjectModel('user') private userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _configService.get(ConfigEnum.JWT_SECRET),
    });
  }
  async validate(payload: IJwtPayload) {
    const { email } = payload;
    const user = await this.userModel.findOne({ email });
    // User exist
    if (!user) throw new UnauthorizedException();
    return payload;
  }
}
