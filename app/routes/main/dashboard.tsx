import {Page} from "@navikt/ds-react";
import {getAllBooks} from "~/api/BooksAPI";

export default async function Dashboard() {
    const request = await getAllBooks();
    const allBooks = request.body

    return (
        <Page.Block>
            {allBooks}
        </Page.Block>
    )

}