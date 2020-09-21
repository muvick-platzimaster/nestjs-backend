import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required:true})
  name: string;

  @Prop()
  email: number;

  @Prop()
  breed: string;
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  plan: { type: Boolean, default: false },
  suggested: {
    movies: { type: [String], default: [] },
    series: { type: [String], default: [] }
  },
  createdAt: { type: Date, default: Date.now() }
}

export const CatSchema = SchemaFactory.createForClass(User);
