import { Injectable } from '@nestjs/common';
import { IParamId } from './interfaces/IParamID';
import { CreateCommentsDto } from './dto/create-comments';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comments.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ICommentId } from './interfaces/ICommentID';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private CommentModel: Model<CommentDocument>,) {}
    
    // srvFindAll(): Promise<CommentDocument[]> {
    srvFindAll(): any {
      // console.log('COMMENTS service FindAll() ');
      return this.CommentModel.find().exec();
    }

    async srvCreate(body: CreateCommentsDto): Promise<CommentDocument> {
      console.log('Service Create COMMENTS body: ', body);
      const book = await this.CommentModel.create(body);
      return book;
    }

    async srvView(id: IParamId): Promise<CommentDocument[]> {
      // console.log('Service View id: ', id);
      const { id: bookId } = id;
      return await this.CommentModel.find({ bookId: bookId});
    }

    srvDelete(id: ICommentId): Promise<CommentDocument> {
      console.log('Service Delete COMMENT id: ', id.id);
      const { id: commentId } = id;
      return this.CommentModel.findOneAndRemove({ id: commentId });
    }
}

