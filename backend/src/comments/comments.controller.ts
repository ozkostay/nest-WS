import { Controller } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { IParamId } from './interfaces/IParamID';
import { ICommentId } from './interfaces/ICommentID';
import { CreateCommentsDto } from './dto/create-comments';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  
  // All
  @Get()
  finsAll(): any {
    return this.commentsService.srvFindAll();
    // return 'CCComents'
  }

  // create
  @Post()
  create(@Body() body: CreateCommentsDto) {
    console.log('CONTR COMMENTS', body);
    return this.commentsService.srvCreate(body);
  }

  // view
  @Get(':id')
  findAllBookComment(@Param() id: IParamId): any {
    return this.commentsService.srvView( id );
  }
  // delete
  @Delete(':id')
  delete(@Param() id: ICommentId): any {
    return this.commentsService.srvDelete(id);
  }
}
