import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [BooksModule],
})
export class AppModule {}
