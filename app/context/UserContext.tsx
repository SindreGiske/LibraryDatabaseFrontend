import {createContext, type ReactNode, useContext, useState} from "react";
import type {UserInfo} from "~/types/UserInfo";

type UserContextType = {
    user: UserInfo | null;
    setUser: (user: UserInfo | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<UserInfo | null>(null);

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