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
        type: 'postgres',
        host: config.get(ConfigEnum.DB_HOST),
        username: config.get(ConfigEnum.USERNAME),
        password: config.get(ConfigEnum.PASSWORD),
        database: config.get(ConfigEnum.DB_NAME),
      } as ConnectionOptions;
    },
  }),
];
