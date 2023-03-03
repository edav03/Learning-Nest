import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema()
export class Auth {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  description: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
