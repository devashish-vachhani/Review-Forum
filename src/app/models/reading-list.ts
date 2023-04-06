import { Book } from "./book";

export class ReadingList {
    private _books: Book[];

    constructor(books: Book[]) {
        this._books = books;
    }

    public get books(): Book[] {
        return this._books;
    }

    public set books(books: Book[]) {
        this._books = books;
    }

    public hasBook(bookId: string): boolean {
        return this._books.some(readingListBook => readingListBook.id === bookId);
    }
}
