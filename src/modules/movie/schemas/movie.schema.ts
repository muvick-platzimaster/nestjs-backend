import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GenreDto } from 'src/modules/genre/dtos/genre.dto';

@Schema()
export class Movie extends Document {
  @Prop({ unique: true })
  id: number;
  @Prop({ unique: true })
  backdrop_path: string;
  @Prop({ unique: true })
  poster_path: string;
  @Prop()
  original_language: string;
  @Prop()
  original_title: string;
  @Prop()
  overview: string;
  @Prop()
  popularity: number;
  @Prop()
  release_date: string;
  @Prop()
  runtime: number;
  @Prop()
  readonly genres: GenreDto[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
