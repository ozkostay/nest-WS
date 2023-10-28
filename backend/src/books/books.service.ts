import { Injectable } from '@nestjs/common';
import { IParamId } from './interfaces/IParamID';
import { CreateBooksDto } from './dto/create-book';

@Injectable()
export class BooksService {
    srvFindAll(): string {
      return 'service FindAll() '
    }

    srvCreate(body: CreateBooksDto): any {
      console.log('Service Create body: ', body);
      return 'service Create name' + body.title;
    }

    srvView(id: IParamId): string {
      console.log('Service View id: ', id.id);
      return 'service Create ' + id.id
    }

    srvDelete(id: IParamId): string {
      console.log('Service Delete id: ', id.id);
      return 'service Delete ' + id.id
    }
}

