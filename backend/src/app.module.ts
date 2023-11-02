import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppGateway } from './app/app.gateway';
import { CommentsModule } from './comments/comments.module';
import { CommentsService } from './comments/comments.service';

@Module({
  imports: [
    BooksModule,
    CommentsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION)],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
