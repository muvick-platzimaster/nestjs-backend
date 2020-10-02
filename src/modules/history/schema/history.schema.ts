import { Movie } from '../../movie/schemas/movie.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MoongooseSchema } from 'mongoose';
import { Serie } from '../../serie/schemas/serie.schema';

@Schema({ collection: 'histories' })
export class History extends Document{
  @Prop({ required: true, unique: true })
  email: string;

  @Prop([{ type: MoongooseSchema.Types.ObjectId, ref: 'movie', unique: true }])
  movies: Movie[];

  @Prop([{ type: MoongooseSchema.Types.ObjectId, ref: 'serie', unique: true  }])
  series: Serie[];

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const HistorySchema = SchemaFactory.createForClass(History);
