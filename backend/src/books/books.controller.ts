import { Controller } from '@nestjs/common';
import { BooksService } from './books.service';
import { Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { IParamId } from './interfaces/IParamID';
import { CreateBooksDto } from './dto/create-book';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  
  // All
  @Get()
  finsAll(): any {
    return this.booksService.srvFindAll();
  }

  // create
  @Post()
  create(@Body() body: CreateBooksDto) {
    return this.booksService.srvCreate(body);
  }

  // view
  @Get(':id')
  view(@Param() id: IParamId): any {
    
    return this.booksService.srvView( id );
  }
  // delete
  @Delete(':id')
  delete(@Param() id: IParamId): any {
    return this.booksService.srvDelete(id);
  }
}
