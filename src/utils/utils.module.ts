import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [UtilsService],
  exports: [UtilsService]
})

export class UtilsModule {
}
