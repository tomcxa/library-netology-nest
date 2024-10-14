import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    BooksModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
      auth: {
        username: 'root',
        password: 'example',
      },
    }),
  ],
})
export class AppModule {}
