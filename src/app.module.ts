import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { ConfigEnum } from './config/config.keys';
import { UserModule } from './modules/user/user.module';
import { MovieModule } from './modules/movie/movie.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { GenreModule } from './modules/genre/genre.module';
import { UtilModule } from './util/util.module';
import { SerieModule } from './modules/serie/serie.module';
import { MyListModule } from './modules/my-list/my-list.module';
import { ScheduleModule } from '@nestjs/schedule';
import { HistoryModule} from './modules/history/history.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    MovieModule,
    SerieModule,
    DatabaseModule,
    AuthModule,
    GenreModule,
    UtilModule,
    MyListModule,
    HistoryModule,
    ScheduleModule.forRoot(),
  ],
  providers: [],
})
export class AppModule {
  static PORT: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.PORT = this._configService.get(ConfigEnum.PORT);
  }
}
