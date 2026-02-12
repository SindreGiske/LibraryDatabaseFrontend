import {useEffect, useState} from "react";
import {BodyLong, Button, Heading, HGrid, Label, Loader, Modal, Page, VStack} from "@navikt/ds-react";
import type {Book} from "~/types/Book";
import {getAllBooks} from "~/api/BooksAPI";
import BookComponent from "~/components/BookComponent";
import {createLoan} from "~/api/LoanAPI";
import {useUser} from "~/context/UserContext";
import {useNavigate} from "react-router";
import {NovariSnackbar, type NovariSnackbarItem, type NovariSnackbarVariant} from "novari-frontend-components";
import {RequireAuth} from "~/components/RequireAuth";

export default function Dashboard() {
    const {user} = useUser();
    const navigate = useNavigate();
    const [allBooks, setAllBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    const [alerts, setAlerts] = useState<NovariSnackbarItem[]>([]);

    const addAlert = (variant: NovariSnackbarVariant, message: string, header: string) => {
        const newAlert = {
            id: Date.now().toString(),
            variant,
            message,
            header,
        };
        setAlerts(prev => [...prev, newAlert]);
    };

    const loadBooks = async () => {
        try {
            const response = await getAllBooks();
            setAllBooks(response.data);
        } catch (err) {
            console.error("Dashboard: Failed to load books: ", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        void loadBooks();
    }, [])

    async function loanBook() {

        if (!selectedBook || !user) {
            console.error("Missing book or user");
            return;
        }
        try {
            const loan = await createLoan(selectedBook.id);
            if (loan.status == 200) {
                addAlert(loan.variant, selectedBook.title + " by " + selectedBook.author, loan.message);
            } else {
                addAlert(loan.variant, selectedBook.title + " by " + selectedBook.author, loan.message);
            }

        } catch (err) {
            console.error("Failed to create loan:", err);
        }
        void loadBooks()
    }

    return loading ? (
        <div className={"h-full w-full flex items-center justify-center "}>
            <Loader size="3xlarge" title="Loading..."/>
        </div>
    ) : (
        <RequireAuth>
            <main className={"dashboardBackground"}>
                <NovariSnackbar items={alerts}/>
                <Page.Block gutters width={"lg"}>
                    <HGrid margin={"0"} gap={"space-12"} columns={2}>
                        <VStack className={"bookShelf min-h-screen"}>
                            <Heading size="large" className={"w-full text-center"}>All books</Heading>
                            {allBooks?.map((book) => (
                                <BookComponent
                                    key={book.id}
                                    book={book}
                                    onClick={() => setSelectedBook(book)}
                                />
                            ))}
                        </VStack>
                        <VStack className={"dashboardHeading"}>
                            <Heading size="xlarge"> Welcome to the Library</Heading>
                            <BodyLong size={"large"}>Here you can loan any book you want as long as it's
                                available! Provided you are logged in you can loan and return books at any
                                time. </BodyLong>
                            <Heading size={"medium"}>TODO: Search for Books Here?</Heading>
                        </VStack>
                    </HGrid>
                    <Modal
                        width={"small"}
                        open={!!selectedBook}
                        closeOnBackdropClick={true}
                        onClose={() => setSelectedBook(null)}
                        aria-label={"HELP ME I'M TRAPPED INSIDE A COMPUTER AAAAAAAAAAAAAAAAAAAAHHH!!!!"}
                    >
                        <Modal.Header closeButton className={"text-center"}>
                            <Heading size={"xlarge"}>{selectedBook?.title}</Heading>
                            <Heading size={"medium"} spacing={true}>Author: {selectedBook?.author}</Heading>
                            <Label spacing={true}>description:</Label>
                            <BodyLong>{selectedBook?.description}</BodyLong>
                        </Modal.Header>
                        <Modal.Body className={"flex justify-center"}>
                            {selectedBook?.loaned ?
                                <Label size={"medium"}>
                                    Book is currently loaned out.
                                </Label>
                                :
                                <div>
                                    <Button onClick={() => loanBook()}>Loan this Book</Button>
                                </div>}
                        </Modal.Body>
                    </Modal>
                </Page.Block>
            </main>
        </RequireAuth>
    )

}