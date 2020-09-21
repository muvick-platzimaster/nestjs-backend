import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { ConfigEnum } from './config/config.keys';
import { UserModule } from './modules/user/user.module';
import { MovieModule } from './modules/movie/movie.module';

@Module({
  imports: [ConfigModule, UserModule, MovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static PORT: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.PORT = this._configService.get(ConfigEnum.PORT);
  }
}
