import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ConfigEnum } from '../config/config.keys';

export const databaseProviders = [
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        uri: config.get(ConfigEnum.DB_URI),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      };
    },
  }),
];
