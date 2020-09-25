import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Category extends Document {
  @Prop({ required: true })
  externalId: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;
}

export const GenreSchema = SchemaFactory.createForClass(Category);
