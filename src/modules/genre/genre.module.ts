import { HttpModule, Module } from '@nestjs/common';
import { GenreController } from './genre.controller';
import { CategoriesService } from './genre.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './schemas/category.schema';
import { ConfigModule } from '../../config/config.module';
import { UtilsModule } from '../../utils/utils.module';

@Module({
  imports: [ConfigModule, HttpModule, MongooseModule.forFeature([{ name: 'category', schema: CategorySchema }]),
    UtilsModule
  ],
  controllers: [GenreController],
  providers: [CategoriesService],
})
export class GenreModule {
}
