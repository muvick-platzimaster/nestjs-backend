import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GenreDto } from 'src/modules/genre/dtos/genre.dto';

@Schema()
export class Serie extends Document {
  @Prop({ unique: true })
  readonly id: number;
  @Prop({ unique: true })
  readonly backdrop_path: string;
  @Prop({ unique: true })
  readonly poster_path: string;
  @Prop()
  readonly original_language: string;
  @Prop()
  readonly original_name: string;
  @Prop()
  readonly overview: string;
  @Prop()
  readonly popularity: number;
  @Prop()
  readonly first_air_date: string;
  @Prop()
  readonly genres: GenreDto[];
}

export const SerieSchema = SchemaFactory.createForClass(Serie);
