import {Page} from "@navikt/ds-react";
import {getAllBooks} from "~/api/BooksAPI";


export default function Dashboard() {
    const allBooks = getAllBooks();
    

    return (
        <Page.Block>

        </Page.Block>
    )

}