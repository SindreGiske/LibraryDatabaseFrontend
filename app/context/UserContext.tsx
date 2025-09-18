import {createContext, type ReactNode, useContext, useEffect, useState} from "react";
import type {UserInfo} from "~/types/UserInfo";
import {useNavigate} from "react-router";

type UserContextType = {
    user: UserInfo | null;
    setUser: (user: UserInfo | null, persist?: boolean) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: { children: ReactNode }) => {
    const navigate = useNavigate();

    // Initialize state from localStorage
    const [user, setUserState] = useState<UserInfo | null>(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("user");
            return stored ? JSON.parse(stored) : null;
        }
        return null;
    });

    const setUser = (user: UserInfo | null, persist = false) => {
        setUserState(user);
        console.log("UserContext setUser:   ", user);
        if (persist && user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    };

    useEffect(() => {
        if (user === null) {
            navigate("/", {replace: true}); // go to login page
        }
    }, [user, navigate]);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within UserProvider");
    return context;
};