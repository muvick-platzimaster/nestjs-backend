import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HistorySchema } from './schema/history.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'history', schema: HistorySchema }])],
  providers: [HistoryService],
  controllers: [HistoryController],
})
export class HistoryModule {
}
