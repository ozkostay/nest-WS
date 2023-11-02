import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
// import { Document, Schema as MongooseSchema } from 'mongoose';
import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
    @Prop({ required: true })
    public id: number;

    @Prop({ required: true })
    public bookId: string;

    @Prop({ required: true })
    public comment: string;
 }

export const CommentSchema = SchemaFactory.createForClass(Comment);

