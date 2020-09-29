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

  @Prop({ default: false })
  confirmed: boolean;

  @Prop({ default: false })
  suspended: boolean;

  @Prop({ default: false })
  email_confirmation_sent: boolean;

  @Prop()
  email_confirmation_sent_at: Date;

  @Prop()
  pin: string;

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
