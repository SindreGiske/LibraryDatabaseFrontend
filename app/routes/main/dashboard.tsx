import {useEffect, useState} from "react";
import {Button, Heading, Label, Loader, Modal, Page, VStack} from "@navikt/ds-react";
import type {Book} from "~/types/Book";
import {getAllBooks} from "~/api/BooksAPI";
import BookComponent from "~/components/BookComponent";
import {createLoan} from "~/api/LoanAPI";
import {useUser} from "~/context/UserContext";
import type {NovariSnackbarItem, NovariSnackbarVariant} from "novari-frontend-components";
import {NovariSnackbar} from "novari-frontend-components";

export default function Dashboard() {
    const user = useUser().user;
    const [allBooks, setAllBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [alerts, setAlerts] = useState<NovariSnackbarItem[]>([]);

    // Alert Handler
    const addAlert = (variant: NovariSnackbarVariant, message: string, header: string) => {
        const newAlert = {
            id: Date.now().toString(),
            variant,
            message,
            header,
        };
        setAlerts(prev => [...prev, newAlert]);
    };

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const response = await getAllBooks();
                console.log(response);
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

    async function loanBook() {

        if (!selectedBook || !user) {
            console.error("Missing book or user");
            return;
        }
        try {
            const loan = await createLoan(selectedBook.id, user.id);
            addAlert(loan.variant, "", "header");
            console.log("Loan book User: ", user);
            console.log("Loaning Book: ", loan);
        } catch (err) {
            console.error("Failed to create loan:", err);
        }
    }

    return loading ? (
        <div className={"h-full w-full flex items-center justify-center "}>
            <Loader size="3xlarge" title="Loading..."/>
        </div>
    ) : (
        <main className={"dashboardBackground"}>
            <Page.Block gutters width={"lg"}>
                <NovariSnackbar items={[alerts]}/>
                <VStack className={"bookShelf"}>
                    <Heading size="large" className={"w-full text-center"}>All books</Heading>
                    {allBooks?.map((book) => (
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
                    aria-label={"HELP ME I'M TRAPPED INSIDE A COMPUTER AAAAAAAAAAAAAAAAAAAAHHH!!!!"}
                >
                    <Modal.Header closeButton className={"text-center"}>
                        <Heading size={"xlarge"}>{selectedBook?.title}</Heading>
                        <Heading size={"medium"}>Author: {selectedBook?.author}</Heading>
                    </Modal.Header>
                    <Modal.Body className={"flex justify-center"}>
                        {selectedBook?.loaned ?
                            <Label size={"medium"}>
                                Book is currently unavailable.
                            </Label>
                            :
                            <div>
                                <Button onClick={() => loanBook()}>Loan this Book</Button>
                            </div>}
                    </Modal.Body>
                </Modal>
            </Page.Block>
        </main>
    )

}