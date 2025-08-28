import type {Book} from "~/types/Book";

export type Loan = {
    id: string;
    book: Book;
    userId: string;
    borrowTime: string;
    returnTime?: string;
}