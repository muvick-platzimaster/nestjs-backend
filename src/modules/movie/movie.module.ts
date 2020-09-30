import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { ConfigService } from 'src/config/config.service';
import { UtilModule } from '../../util/util.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from './schemas/movie.schema';
import { MyListSchema } from '../my-list/schemas/my-list.schema';

@Module({
  imports: [
    UtilModule,
    MongooseModule.forFeature([
      { name: 'movie', schema: MovieSchema },
      { name: 'list', schema: MyListSchema },
    ]),
  ],
  controllers: [MovieController],
  providers: [MovieService, ConfigService],
})
export class MovieModule {}
