import { Module } from '@nestjs/common';
import { MyListController } from './my-list.controller';
import { MyListService } from './my-list.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MyListSchema } from './schemas/my-list.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'list', schema: MyListSchema }]),
  ],
  controllers: [MyListController],
  providers: [MyListService],
})
export class MyListModule {}
