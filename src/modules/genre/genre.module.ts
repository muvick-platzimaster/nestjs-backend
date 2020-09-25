import { Module } from '@nestjs/common';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GenreSchema } from './schemas/genre.schema';
import { ConfigModule } from '../../config/config.module';
import { UtilModule } from '../../util/util.module';

@Module({
  imports: [ConfigModule, MongooseModule.forFeature([{ name: 'genre', schema: GenreSchema }]),
    UtilModule,
  ],
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {
}
