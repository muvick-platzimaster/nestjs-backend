import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { ConfigEnum } from './config/config.keys';
import { UserModule } from './modules/user/user.module';
import { MovieModule } from './modules/movie/movie.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { UtilsModule } from './utils/utils.module';
import { TvModule } from './modules/tv/tv.module';

@Module({
  imports: [ConfigModule, UserModule, MovieModule, DatabaseModule, AuthModule, CategoriesModule, UtilsModule, TvModule],
})
export class AppModule {
  static PORT: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.PORT = this._configService.get(ConfigEnum.PORT);
  }
}
