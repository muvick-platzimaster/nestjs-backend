import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HistorySchema } from './schema/history.schema';
import { SerieSchema } from '../serie/schemas/serie.schema';
import { MovieSchema } from '../movie/schemas/movie.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'history', schema: HistorySchema }, { name: 'movie', schema: MovieSchema }, { name: 'serie', schema: SerieSchema }])],
  providers: [HistoryService],
  controllers: [HistoryController],
})
export class HistoryModule {
}
