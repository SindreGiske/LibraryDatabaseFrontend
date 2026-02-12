import {RequireAuth} from "~/components/RequireAuth";
import {Button, Heading, HGrid, HStack, Modal, Page, VStack} from "@navikt/ds-react";
import {useUser} from "~/context/UserContext";
import {NovariSnackbar, type NovariSnackbarItem, type NovariSnackbarVariant} from "novari-frontend-components";
import {useEffect, useMemo, useState} from "react";
import {PersonCircleFillIcon} from "@navikt/aksel-icons";
import {getMyLoans, returnBook} from "~/api/LoanAPI";
import type {Loan} from "~/types/Loan";
import LoanComponent from "~/components/LoanComponent";

export default function Profile() {
    const {user, refreshUser} = useUser()
    const [allLoans, setAllLoans] = useState<Loan[]>([])
    const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null)

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

    async function loadLoans() {
        const response = await getMyLoans();
        if (response.status === 200) {
            setAllLoans(response.data ?? []);
            console.log(response.data);

        } else addAlert(response.variant, response.message, "error");
    }

    const activeLoans = useMemo(
        () =>
            (allLoans ?? []).filter(loan => loan.returnTime == null),
        [allLoans]
    )

    const oldLoans = useMemo(
        () =>
            (allLoans ?? []).filter(loan => loan.returnTime != null),
        [allLoans]
    )

    useEffect(() => {
        void refreshUser()
        void loadLoans()
    }, []);


    async function returnABook(): Promise<void> {
        const response = await returnBook(selectedLoan?.id!!);
        addAlert(response.variant, response.message, selectedLoan?.title!!);
        void loadLoans();
    }

    return (
        <RequireAuth>
            <main className={"dashboardBackground"}>
                <NovariSnackbar items={alerts}/>
                <Page.Block gutters width={"lg"}>
                    <Heading size={"xlarge"} className={"w-full text-center p-8"}>Profile</Heading>
                    <HGrid gap={"space-12"} columns={2}>
                        <VStack>
                            <HStack align="center" gap={"2"} className={"profileCard"}>
                                <PersonCircleFillIcon title="a11y-title" fontSize="4rem"/>
                                <Heading size={"large"}>{user?.name}</Heading>
                            </HStack>
                        </VStack>
                        <VStack className="bookShelf">
                            <Heading size="xlarge" spacing className="w-full text-center">
                                Your loans
                            </Heading>

                            {activeLoans.length === 0 ? (
                                <Heading size="medium" spacing align="center">
                                    You have no active loans.
                                </Heading>
                            ) : (
                                <>
                                    <Heading size="medium" spacing className="w-full text-center">
                                        Current loans:
                                    </Heading>

                                    {activeLoans.map((loan) => (
                                        <LoanComponent
                                            key={loan.id}
                                            loan={loan}
                                            onClick={() => setSelectedLoan(loan)}
                                        />
                                    ))}
                                </>
                            )}
                            <Heading size="medium" spacing className={"w-full text-center"}>Previous loans:</Heading>
                            {oldLoans?.map((loan) => (
                                <LoanComponent
                                    key={loan.id}
                                    loan={loan}
                                    onClick={() => setSelectedLoan(loan)}
                                />
                            ))}
                        </VStack>

                    </HGrid>
                </Page.Block>
                <Modal
                    width={"medium"}
                    open={!!selectedLoan}
                    closeOnBackdropClick={true}
                    onClose={() => setSelectedLoan(null)}
                    aria-label={"HELP ME I'M TRAPPED INSIDE A COMPUTER AAAAAAAAAAAAAAAAAAAAHHH!!!!"}
                >
                    <Modal.Header closeButton className={"text-center"}>
                        <Heading size={"xlarge"} className={"pl-11"}>{selectedLoan?.title}</Heading>
                        <Heading size={"medium"} spacing={true}>{selectedLoan?.author}</Heading>
                    </Modal.Header>
                    <Modal.Body className={"flex justify-center flex-col text-center items-center"}>
                        <Heading size={"small"} spacing={true}>Book loaned at : {selectedLoan?.borrowTime}</Heading>
                        {selectedLoan?.returnTime == null ? (
                            <Button onClick={() => returnABook()} className={"w-fit"}>Return this Book</Button>
                        ) : (
                            <Heading size={"small"}>Book returned at : {selectedLoan.returnTime}</Heading>
                        )
                        }

                    </Modal.Body>
                </Modal>
            </main>
        </RequireAuth>
    )
}