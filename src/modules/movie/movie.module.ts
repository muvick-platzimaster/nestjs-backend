import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { ConfigService } from 'src/config/config.service';
import { UtilsModule } from '../../utils/utils.module';

@Module({
  imports: [UtilsModule],
  controllers: [MovieController],
  providers: [MovieService, ConfigService],
})
export class MovieModule {}
