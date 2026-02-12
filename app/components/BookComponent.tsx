import {Button, Heading} from "@navikt/ds-react";
import type {Book} from "~/types/Book";
import {CircleSlashIcon, InboxDownIcon} from "@navikt/aksel-icons";

type BookProps = {
    book: Book;
    onClick?: () => void;
};

export default function BookComponent(
    {book, onClick}: BookProps,
) {

    return (
        <Button className={"bookComponent"} onClick={onClick}>
            <Heading align={"center"} size={"medium"}>{book.title}</Heading>
            <Heading align={"center"} size={"small"}>{book.author}</Heading>

            {book.loaned ?
                <div className={"text-center justify-end flex align-middle"}>
                    <label className={"bookAvailabilityLabel"}>not available</label>
                    <CircleSlashIcon title="a11y-title" fontSize="1.5rem"/>
                </div>
                :
                <div className={"text-center justify-end flex"}>
                    <label className={"bookAvailabilityLabel"}>available</label>
                    <InboxDownIcon title="a11y-title" fontSize="1.5rem"/>
                </div>
            }
        </Button>
    )
}