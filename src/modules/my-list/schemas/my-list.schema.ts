import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Movie } from '../../movie/schemas/movie.schema';
import { Serie } from '../../serie/schemas/serie.schema';

@Schema({ collection: 'lists' })
export class MyList extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'movie' }])
  movies: Movie[];

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'serie' }])
  series: Serie[];

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const MyListSchema = SchemaFactory.createForClass(MyList);
