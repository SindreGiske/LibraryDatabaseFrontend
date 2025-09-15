import {useEffect, useState} from "react";
import {Heading, Label, Loader, Modal, Page, VStack} from "@navikt/ds-react";
import type {Book} from "~/types/Book";
import {getAllBooks} from "~/api/BooksAPI";
import BookComponent from "~/components/BookComponent";

export default function Dashboard() {
    const [allBooks, setAllBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

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

    return loading ? (
        <div className={"h-full w-full flex items-center justify-center "}>
            <Loader size="3xlarge" title="Loading..."/>
        </div>
    ) : (
        <Page.Block gutters width={"lg"} className={"dashboardBackground"}>
            <VStack className={"bookShelf"}>
                <Heading size="large" className={"w-full text-center"}>All books</Heading>
                {allBooks.map((book) => (
                    <BookComponent
                        key={book.id}
                        book={book}
                        onClick={() => setSelectedBook(book)}
                    />
                ))}
            </VStack>
            <Modal
                width={"small"}
                open={!!selectedBook}
                closeOnBackdropClick={true}
                onClose={() => setSelectedBook(null)}
                aria-label={selectedBook ? selectedBook.title + " Modal" : "Modal"}
            >
                <Modal.Header closeButton className={"text-center"}>
                    <Heading size={"xlarge"}>{selectedBook?.title}</Heading>
                    <Heading size={"medium"}>Author: {selectedBook?.author}</Heading>
                </Modal.Header>
                <Modal.Body>
                    {selectedBook?.loaned ?
                        <Label size={"medium"}>
                            Book is currently unavailable.
                        </Label>
                        :
                        <div>
                            
                        </div>}
                </Modal.Body>
            </Modal>
        </Page.Block>
    )

}