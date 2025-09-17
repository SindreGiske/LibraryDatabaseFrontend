import {Box, Button, Heading, Label} from "@navikt/ds-react";
import type {Book} from "~/types/Book";

type BookProps = {
    book: Book;
    onClick?: () => void;
};

export default function BookComponent(
    {book, onClick}: BookProps,
) {

    return (
        <Box className={"bookCase"}>
            <Button className={"bookComponent"} onClick={onClick}>
                <Heading align={"center"} size={"small"}>{book.title}</Heading>
                <Heading align={"center"} size={"xsmall"}>{book.author}</Heading>
            </Button>
            <div className={"w-full text-center"}>
                {book.loaned ?
                    <Label>this book currently unavailable.</Label>
                    :
                    null
                }
            </div>
        </Box>
    )
}