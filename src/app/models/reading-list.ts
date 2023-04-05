import { Book } from "./book";

export class ReadingList {
    books: Book[];

    constructor(books) {
        this.books = books;
    }

    isBookInReadingList(bookId: string): boolean {
        return this.books.some(readingListBook => readingListBook.id === bookId)
    }
}