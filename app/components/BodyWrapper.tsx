import { Page } from "@navikt/ds-react";
import { NovariHeader } from "novari-frontend-components";




export function BodyWrapper({children}: {children: React.ReactNode}) {




return (
    <Page>
        <NovariHeader
            appName={"Library"}
            menu={[["dashboard", "/dashboard"], ["rent a book", ""] ]} isLoggedIn={false}/>
        {children}
    </Page>
)

}