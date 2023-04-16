import { of } from "rxjs";
import { Book } from "src/app/models/book";
import { ReadingList } from "src/app/models/reading-list";
import { ReadingListService } from "src/app/services/reading-list.service";

const books: Book[] = [
    new Book('book1', 'author1', 'description1', 'image1', [], 'approved', 'admin', '1'),
    new Book('book2', 'author2', 'description2', 'image2', [], 'approved', 'admin', '2'),
    new Book('book3', 'author3', 'description3', 'image3', [], 'approved', 'admin', '3'),
  ]
const readingList = new ReadingList(books);

export const ReadingListServiceStub = jasmine.createSpyObj<ReadingListService>(
    'ReadingListService',
    {
        getReadingList: of(readingList),
        addToReadingList: Promise.resolve(),
        deleteFromReadingList: Promise.resolve(),
    }
  );