import {Box, Button, Heading} from "@navikt/ds-react";
import type {Book} from "~/types/Book";
import {BagdeIcon} from "@navikt/aksel-icons";

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
            <div className={"relative"}>
                {book.loaned ?
                    <div>{book.loaned}</div>
                    :
                    <BagdeIcon title="a11y-title" fontSize="1.5rem"/>
                }
            </div>
        </Box>
    )
}