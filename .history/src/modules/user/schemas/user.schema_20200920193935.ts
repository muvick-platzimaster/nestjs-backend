import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required:true})
  name: string;

  @Prop({ required:true, unique: true})
  email: number;

  @Prop({ required:true})
  password: string;

@Prop({ default:false})
  plan: boolean,
  suggested: {
    movies: { type: [String], default: [] },
    series: { type: [String], default: [] }
  },
  createdAt: { type: Date, default: Date.now() }
}

export const CatSchema = SchemaFactory.createForClass(User);
