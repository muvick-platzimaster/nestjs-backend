import { Module } from '@nestjs/common';
import { TvController } from './tv.controller';
import { TvService } from './tv.service';
import { UtilModule } from 'src/util/util.module';
import { ConfigService } from 'src/config/config.service';

@Module({
  imports: [UtilModule],
  controllers: [TvController],
  providers: [TvService, ConfigService],
})
export class TvModule {}
