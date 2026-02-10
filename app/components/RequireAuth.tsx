import {Navigate, useLocation} from "react-router";
import {useUser} from "~/context/UserContext";

export function RequireAuth({children}: { children: React.ReactNode }) {
    const {user, initialized} = useUser();
    const location = useLocation();

    if (!initialized) return null;
    if (!user) return <Navigate to="/" replace state={{from: location}}/>;

    return <>{children}</>;
}