import { Movie } from '../../movie/schemas/movie.schema';
import { Serie } from '../../serie/schemas/serie.schema';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';

export class History extends Document{
  @Prop({ required: true, unique: true})
  email: string
  @Prop({ type: Schema.Types.ObjectId, ref: 'movie', unique: true})
  movies: [Movie]

  @Prop({ type: Schema.Types.ObjectId, ref: 'serie', unique: true})
  series: [Movie]

  @Prop( { default: Date.now() })
  createdAt: Date
}

export const HistorySchema = SchemaFactory.createForClass(History)
