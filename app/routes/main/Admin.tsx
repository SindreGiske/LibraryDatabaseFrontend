import {RequireAuth} from "~/components/RequireAuth";
import {Box, Heading, HGrid, HStack, Label, Modal, Page, VStack} from "@navikt/ds-react";
import {
    NovariCircularProgressBar,
    NovariSnackbar,
    type NovariSnackbarItem,
    type NovariSnackbarVariant
} from "novari-frontend-components";
import {useEffect, useState} from "react";
import type {AdminOverviewType} from "~/types/AdminOverviewType";
import {adminOverview, getAllUsers, getSpecificUserLoans} from "~/api/AdminAPI";
import {PersonCircleFillIcon} from "@navikt/aksel-icons";
import AdminUserViewComponent from "~/components/AdminUserViewComponent";
import type {Loan} from "~/types/Loan";


export default function Admin() {
    const [alerts, setAlerts] = useState<NovariSnackbarItem[]>([]);
    const [overview, setOverview] = useState<AdminOverviewType | null>(null);
    const [allUsers, setAllUsers] = useState<AdminFullUserInformation[]>([]);
    const [selectedUser, setSelectedUser] = useState<AdminFullUserInformation | null>(null);
    const [selectedUserLoans, setSelectedUserLoans] = useState<Loan[] | null>(null);

    const addAlert = (variant: NovariSnackbarVariant, message: string, header: string) => {
        const newAlert = {
            id: Date.now().toString(),
            variant,
            message,
            header,
        };
        setAlerts(prev => [...prev, newAlert]);
    };

    async function getOverview() {
        const overviewResponse = await adminOverview()
        const allUsersResponse = await getAllUsers()
        console.log(overviewResponse.data)
        console.log(allUsersResponse.data)

        if (overviewResponse.status != 200) {
            addAlert(overviewResponse.variant, overviewResponse.message, overviewResponse.variant);
            return;
        }

        setOverview(overviewResponse.data as AdminOverviewType);
        setAllUsers(allUsersResponse.data as AdminFullUserInformation[]);
    }

    useEffect(() => {
        void getOverview();
    }, []);

    async function fetchSelectedUserLoans() {
        console.log(selectedUser!!.id)
        const response = await getSpecificUserLoans(selectedUser!!.id)
        setSelectedUserLoans(response.data as Loan[])
    }

    useEffect(() => {
        if (selectedUser == null) {
            setSelectedUserLoans(null);
        } else {
            void fetchSelectedUserLoans();
        }


    }, [selectedUser]);

    return (
        <RequireAuth adminOnly>
            <NovariSnackbar items={alerts}/>
            <Heading size={"xlarge"} className={"w-full text-center bg-[#FCF5ED] pb-4"}>Admin Overview</Heading>
            <Page.Block gutters width={"lg"}>
                <HGrid columns={2} gap={"8"}>
                    <VStack className={"w-full py-8"} gap={"8"}>
                        <HStack className={"w-full border-amber-900/30 rounded-3xl p-4 border-2"} gap={"2"}>
                            <VStack gap={"0"} className={"w-3/5"}>
                                <Heading size={"large"} className={"text-end w-2/3"}>Books</Heading>
                                <hr/>
                                <HStack gap={"2"} className={"h-full w-full items-center flex"}>
                                    <Heading size={"medium"}
                                             className={"text-end w-2/3"}> total: </Heading>
                                    <Heading size={"medium"}
                                             className={"text-start"}> {overview?.totalBookCount} </Heading>
                                </HStack>
                                <HStack gap={"2"} className={"h-full items-center flex"}>
                                    <Heading size={"medium"}
                                             className={"text-end w-2/3"}> Available: </Heading>
                                    <Heading size={"medium"}
                                             className={"text-start "}> {overview?.availableBooksCount} </Heading>
                                </HStack>
                            </VStack>
                            <Box className={"flex items-center justify-center pl-4"}>
                                <NovariCircularProgressBar
                                    key={"books"}
                                    maxValue={overview?.totalBookCount ?? 0}
                                    value={overview?.availableBooksCount ?? 0}/>
                            </Box>
                        </HStack>
                        <HStack className={"w-full border-amber-900/30 rounded-3xl p-4 border-2"} gap={"2"}>
                            <VStack gap={"0"} className={"w-3/5"}>
                                <Heading size={"large"} className={"text-end w-2/3"}>Loans</Heading>
                                <hr/>
                                <HStack gap={"2"} className={"h-full w-full items-center flex"}>
                                    <Heading size={"medium"}
                                             className={"text-end w-2/3"}> total: </Heading>
                                    <Heading size={"medium"}
                                             className={"text-start"}> {overview?.totalLoanCount} </Heading>
                                </HStack>
                                <HStack gap={"2"} className={"h-full items-center flex"}>
                                    <Heading size={"medium"}
                                             className={"text-end w-2/3"}> Active: </Heading>
                                    <Heading size={"medium"}
                                             className={"text-start "}> {overview?.activeLoanCount} </Heading>
                                </HStack>
                            </VStack>
                            <Box className={"flex items-center justify-center pl-4"}>
                                <NovariCircularProgressBar
                                    key={"loans"}
                                    maxValue={overview?.totalLoanCount ?? 0}
                                    value={overview?.activeLoanCount ?? 0}/>
                            </Box>
                        </HStack>
                    </VStack>
                    <VStack className={"w-full py-8"} gap={"8"}>
                        <VStack className={"w-full border-amber-900/30 rounded-3xl p-4 border-2 items-center"}>
                            <PersonCircleFillIcon title="a11y-title" fontSize="4rem"/>
                            <Heading size={"medium"}>Currently registered users : {overview?.userCount}</Heading>
                        </VStack>
                        <VStack className={"w-full border-amber-900/30 rounded-3xl p-4 border-2 items-center"}>
                            <Heading size={"large"} spacing>All Users: </Heading>
                            {allUsers.map((user) => {
                                return (
                                    <AdminUserViewComponent user={user} onClick={() => (setSelectedUser(user))}/>
                                )
                            })}
                        </VStack>
                    </VStack>
                </HGrid>
            </Page.Block>
            <Modal
                width={"medium"}
                open={!!selectedUser}
                closeOnBackdropClick={true}
                onClose={() => setSelectedUser(null)}
                aria-label={"HELP ME I'M TRAPPED INSIDE AN ADMIN COMPUTER AAAAAAAAAAAAAAAAAAAAHHH!!!!"}
            >
                <Modal.Header closeButton className={""}>
                    <Heading size={"xlarge"} className={""}>{selectedUser?.name}</Heading>
                    <Heading size={"medium"} spacing={true}>Author: {selectedUser?.email}</Heading>
                    <Label spacing={true}>userID: {selectedUser?.id}</Label>
                </Modal.Header>
                <Modal.Body className={"flex justify-center"}>
                    <></>
                </Modal.Body>
            </Modal>
        </RequireAuth>
    )
}