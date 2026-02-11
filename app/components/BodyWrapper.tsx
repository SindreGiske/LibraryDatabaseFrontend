import {Page} from "@navikt/ds-react";
import {NovariHeader} from "novari-frontend-components";
import {useNavigate} from "react-router";
import {useUser} from "~/context/UserContext";

export function BodyWrapper({children}: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const {user, clearUser} = useUser();

    return (
        <Page>
            <NovariHeader
                appName={"Library"}
                menu={[{label: "Home", action: "/Dashboard"}, {label: "Profile", action: "/Profile"},
                    ...(user?.admin ? [{label: "Admin", action: "/Admin"}] : []),
                ]}
                onMenuClick={navigate}
                isLoggedIn={!!user}
                onLogout={clearUser}
                displayName={user?.name}/>

            {children}
        </Page>
    )
}