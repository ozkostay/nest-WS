import { Injectable } from '@nestjs/common';
import { IParamId } from './interfaces/IParamID';
import { CreateBooksDto } from './dto/create-book';
import { Model } from 'mongoose';
import { Book, BookDocument } from './schemas/books.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private BookModel: Model<BookDocument>,) {}
    
    srvFindAll(): Promise<BookDocument[]> {
      // return 'service FindAll() ';
      return this.BookModel.find().exec();
    }

    async srvCreate(body: CreateBooksDto): Promise<BookDocument> {
      // console.log('Service Create body: ', body);
      const book = await this.BookModel.create({...body});
      return book;
    }

    async srvView(id: IParamId): Promise<BookDocument> {
      // console.log('Service View id: ', id);
      const { id: bookId } = id;
      return await this.BookModel.findById(bookId);
    }

    srvDelete(id: IParamId): Promise<BookDocument> {
      // console.log('Service Delete id: ', id.id);
      const { id: bookId } = id;
      return this.BookModel.findOneAndRemove({ _id: bookId });
    }
}

