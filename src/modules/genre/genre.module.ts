import { Module } from '@nestjs/common';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './schemas/category.schema';
import { ConfigModule } from '../../config/config.module';
import { UtilModule } from '../../util/util.module';

@Module({
  imports: [ConfigModule, MongooseModule.forFeature([{ name: 'category', schema: CategorySchema }]),
    UtilModule,
  ],
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {
}
