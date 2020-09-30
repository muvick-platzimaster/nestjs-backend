import { Module } from '@nestjs/common';
import { SerieController } from './serie.controller';
import { SerieService } from './serie.service';
import { UtilModule } from 'src/util/util.module';
import { ConfigService } from 'src/config/config.service';
import { MyListSchema } from '../my-list/schemas/my-list.schema';
import { SerieSchema } from './schemas/serie.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UtilModule,
    MongooseModule.forFeature([
      { name: 'serie', schema: SerieSchema },
      { name: 'list', schema: MyListSchema },
    ]),
  ],
  controllers: [SerieController],
  providers: [SerieService, ConfigService],
})
export class SerieModule {}
