import { Book } from "./book";

export class ReadingList {
    constructor(public books: Book[]) {}

    hasBook(bookId: string): boolean {
        return this.books.some(readingListBook => readingListBook.id === bookId)
    }
}