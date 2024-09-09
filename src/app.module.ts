import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import dbConfig from './configs/db.config';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    BooksModule,
    ConfigModule.forRoot({
      load: [dbConfig],
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
      auth: {
        username: 'root',
        password: 'example',
      },
    }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => {
    //     return {
    //       uri: configService.get('database.uri'),
    //     };
    //   },
    //   inject: [ConfigService],
    // }),
  ],
})
export class AppModule {}
