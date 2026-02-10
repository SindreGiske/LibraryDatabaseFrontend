import {createContext, type ReactNode, useContext, useEffect, useMemo, useState} from "react";
import type {UserInfo} from "~/types/UserInfo";
import {useNavigate} from "react-router";
import {getMe, logOut} from "~/api/LoginAPI";

type UserContextType = {
    user: UserInfo | null;
    persist: boolean;
    initialized: boolean;
    setPersist: (persist: boolean) => void;
    refreshUser: () => Promise<UserInfo | null>;
    clearUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const PERSIST_KEY = "user.persist";

export const UserProvider = ({children}: { children: ReactNode }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState<UserInfo | null>(null);
    const [persist, setPersistState] = useState(false);
    const [initialized, setInitialized] = useState(false);

    const setPersist = (p: boolean) => {
        setPersistState(p);
        if (typeof window !== "undefined") {
            localStorage.setItem(PERSIST_KEY, p ? "true" : "false");
        }
    };

    const refreshUser = async (): Promise<UserInfo | null> => {
        const res = await getMe();
        if (res.status === 200 && res.data) {
            setUser(res.data);
            return res.data;
        }
        setUser(null);
        return null;
    };

    const clearUser = async () => {
        try {
            await logOut();
        } finally {
            setUser(null);
            navigate("/", {replace: true});
        }
    };

    useEffect(() => {
        if (typeof window === "undefined") return;

        const p = localStorage.getItem(PERSIST_KEY) === "true";
        setPersistState(p);

        (async () => {
            await refreshUser();
            setInitialized(true);
        })();
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handler = () => {
            if (!persist) {
                navigator.sendBeacon?.("/api/login/logout");
            }
        };

        window.addEventListener("beforeunload", handler);
        return () => window.removeEventListener("beforeunload", handler);
    }, [persist]);

    const value = useMemo(
        () => ({user, persist, initialized, setPersist, refreshUser, clearUser}),
        [user, persist, initialized]
    );

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUser must be used within UserProvider");
    return ctx;
};