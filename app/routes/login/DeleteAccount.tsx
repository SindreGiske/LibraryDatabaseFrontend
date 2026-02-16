import {Button, Heading, Page, VStack} from "@navikt/ds-react";
import {RequireAuth} from "~/components/RequireAuth";
import {useUser} from "~/context/UserContext";
import {useEffect, useState} from "react";
import {deleteSelf} from "~/api/LoginAPI";
import {NovariSnackbar, type NovariSnackbarItem, type NovariSnackbarVariant} from "novari-frontend-components";
import {useNavigate} from "react-router";


export default function DeleteAccount() {
    const {user, refreshUser} = useUser()
    const navigate = useNavigate();

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

    useEffect(() => {
        void refreshUser()
    }, []);

    async function deleteAccount() {
        const response = await deleteSelf()
        if (response.status === 410) {
            void refreshUser()
            navigate(("/"), {replace: true});

        } else addAlert(response.variant, response.message, response.variant);
    }


    return (
        <RequireAuth>
            <Page.Block gutters className="flex justify-center h-screen w-screen items-center text-center">
                <NovariSnackbar items={alerts}/>
                <VStack gap={"2"}>
                    <Heading size={"large"}>ARE YOU SURE YOU WANT</Heading>
                    <Heading size={"large"}>TO DELETE THIS ACCOUNT?</Heading>
                    <Button variant={"danger"}
                            onClick={() => {
                                void deleteAccount()
                            }}
                    >YES, delete my account.</Button>
                    <Button
                        onClick={() => navigate(("/dashboard"), {replace: true})}
                    >NO, I want to go back.</Button>
                </VStack>
            </Page.Block>
        </RequireAuth>
    )
}