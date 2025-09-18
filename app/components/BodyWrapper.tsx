import {Page} from "@navikt/ds-react";
import {NovariHeader} from "novari-frontend-components";
import {useUser} from "~/context/UserContext";

export function BodyWrapper({children}: { children: React.ReactNode }) {
    const {user} = useUser()

    return (
        <Page className="!bg-white">
            <NovariHeader
                appName={"Library"}
                menu={[["dashboard", "/dashboard"], ["rent a book", ""]]} isLoggedIn={!!user}
                displayName={user?.email}/>
            {children}
        </Page>
    )

}