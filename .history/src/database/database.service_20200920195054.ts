import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from 'src/config/config.service';
import { ConfigEnum } from 'src/config/config.keys';

export const databaseProviders = [
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        uri: config.get(ConfigEnum.DB_URI),
      };
    },
  }),
];
