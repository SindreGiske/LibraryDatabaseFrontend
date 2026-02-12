import {Button, Heading} from "@navikt/ds-react";
import type {Loan} from "~/types/Loan";

type LoanProps = {
    loan: Loan;
    onClick?: () => void;
};

export default function LoanComponent(
    {loan, onClick}: LoanProps,
) {

    return (
        <Button className={"bookComponent"} onClick={onClick}>
            <Heading align={"center"} size={"medium"}>{loan.title}</Heading>
            <Heading align={"center"} size={"small"}>{loan.author}</Heading>
        </Button>
    )
}