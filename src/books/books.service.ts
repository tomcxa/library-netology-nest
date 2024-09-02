import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './intefaces/book.interface';

@Injectable()
export class BooksService {
  private readonly books: Book[] = [];

  create(createBookDto: CreateBookDto) {
    const newId = `${this.books.length + 1}`;
    const createdBook = { id: newId, ...createBookDto };
    this.books.push(createdBook);
    return createdBook;
  }

  findAll() {
    return this.books;
  }

  findOne(id: string) {
    const findedBook = this.books.find((book) => book.id === id);
    if (findedBook) {
      return findedBook;
    }
    return `Book a #${id} not found`;
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    const updatingIndex = this.books.findIndex((book) => book.id === id);
    if (updatingIndex >= 0) {
      this.books[updatingIndex] = {
        ...this.books[updatingIndex],
        ...updateBookDto,
      };
      return this.books[updatingIndex];
    }
    return `Book a #${id} not found`;
  }

  remove(id: string) {
    const deletingIndex = this.books.findIndex((book) => book.id === id);
    if (deletingIndex >= 0) {
      this.books.splice(deletingIndex, 1);
      return this.books;
    }
    return `Book a #${id} not found`;
  }
}
