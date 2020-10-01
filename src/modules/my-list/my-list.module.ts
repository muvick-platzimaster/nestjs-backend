import { Module } from '@nestjs/common';
import { MyListController } from './my-list.controller';
import { MyListService } from './my-list.service';
import { SerieService } from '../serie/serie.service';
import { MovieService } from '../movie/movie.service';
import { UtilService } from 'src/util/util.service';
import { ConfigService } from 'src/config/config.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from '../movie/schemas/movie.schema';
import { SerieSchema } from '../serie/schemas/serie.schema';
import { MyListSchema } from './schemas/my-list.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'list', schema: MyListSchema }]),
  ],
  controllers: [MyListController],
  providers: [MyListService],
})
export class MyListModule {}
