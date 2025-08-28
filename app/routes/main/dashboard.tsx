import {useEffect, useState} from "react";
import {Page, VStack} from "@navikt/ds-react";
import type {Book} from "~/types/Book";
import {getAllBooks} from "~/api/BooksAPI";
import BookComponent from "~/components/BookComponent";

export default function Dashboard() {
    const [allBooks, setAllBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const response = await getAllBooks();


                console.log("GetAllBooks Body: ", response.data);
                setAllBooks(response.data);
            } catch (err) {
                console.error("Dashboard: Failed to load books: ", err);
            } finally {
                setLoading(false);
            }
        }

        loadBooks();
    }, [])

    return loading ? (<></>) : (
        <Page.Block>
            <VStack>
                {allBooks.map((book) => (
                    <BookComponent key={book.id} book={book}/>
                ))}
            </VStack>
        </Page.Block>
    )

}