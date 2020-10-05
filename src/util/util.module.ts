import { Module } from '@nestjs/common';
import { UtilService } from './util.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [UtilService],
  exports: [UtilService],
})
export class UtilModule {}
