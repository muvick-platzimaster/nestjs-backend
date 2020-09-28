import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  plan: boolean;

  @Prop({ required: true, default: false })
  confirmed: boolean;

  @Prop({ required: true })
  email_sent_at: Date;

  @Prop({ required: true })
  pin: string

  @Prop({ required: true, default: false })
  suspended: boolean

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
