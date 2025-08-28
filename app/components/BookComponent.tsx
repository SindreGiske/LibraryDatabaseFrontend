import {Button, Heading} from "@navikt/ds-react";
import type {Book} from "~/types/Book";

type BookProps = {
    book: Book;
};

export default function BookComponent(
    {book}: BookProps,
) {

    return (
        <Button className={"bookComponent"}>
            <Heading align={"center"} size={"small"}>{book.title}</Heading>
            <Heading align={"center"} size={"xsmall"}>{book.author}</Heading>
        </Button>
    )
}