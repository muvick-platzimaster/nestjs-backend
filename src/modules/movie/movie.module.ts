import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { ConfigService } from 'src/config/config.service';

@Module({
  controllers: [MovieController],
  providers: [MovieService, ConfigService],
})
export class MovieModule {}
