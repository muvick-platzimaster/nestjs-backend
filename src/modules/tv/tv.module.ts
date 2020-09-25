import { Module } from '@nestjs/common';
import { TvController } from './tv.controller';
import { TvService } from './tv.service';
import { UtilsModule } from 'src/utils/utils.module';
import { ConfigService } from 'src/config/config.service';

@Module({
  imports: [UtilsModule],
  controllers: [TvController],
  providers: [TvService, ConfigService],
})
export class TvModule {}
