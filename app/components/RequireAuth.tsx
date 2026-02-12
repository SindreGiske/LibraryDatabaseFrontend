import {Navigate, useLocation} from "react-router";
import {useUser} from "~/context/UserContext";
import {verifyAdmin} from "~/api/AdminAPI";
import {type ReactElement, useEffect, useState} from "react";
import {Loader, Page} from "@navikt/ds-react";

type RequireAuthProps = {
    children: React.ReactNode;
    adminOnly?: boolean;
}

export function RequireAuth({children, adminOnly = false}: RequireAuthProps): ReactElement | null {
    const {user, initialized} = useUser();
    const location = useLocation();

    const [loading, setLoading] = useState(true);
    const [adminTrue, setAdminTrue] = useState<boolean>(false);

    useEffect(() => {
        let cancelled = false;

        async function doubleCheckAdminStatus() {
            if (!initialized) return;
            if (!adminOnly) return;
            if (!user) return;

            setLoading(true);
            try {
                const verification = await verifyAdmin();
                if (!cancelled) setAdminTrue(verification.status == 200);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        setAdminTrue(false)
        void doubleCheckAdminStatus();

        return () => {
            cancelled = true
        }
    }, [initialized, adminOnly, user]);

    if (!initialized) return null;

    if (!user) return <Navigate to="/" replace state={{from: location}}/>;

    if (adminOnly) {
        if (loading) return (
            <Page.Block className={"h-96 flex items-center justify-center"}>
                <Loader size="2xlarge" title="Venter..."/>
            </Page.Block>
        )

        if (!adminTrue) return <Navigate to="/Dashboard" replace/>;
    }

    return <>{children}</>;
}