import { Module } from '@nestjs/common';
import { SerieController } from './serie.controller';
import { SerieService } from './serie.service';
import { UtilModule } from 'src/util/util.module';
import { ConfigService } from 'src/config/config.service';

@Module({
  imports: [UtilModule],
  controllers: [SerieController],
  providers: [SerieService, ConfigService],
})
export class SerieModule {}
