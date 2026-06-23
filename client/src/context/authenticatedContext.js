import { useContext } from "react";
import { createContext } from "react";

export const AuthenticatedContext = createContext({
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
});

export function useAuthenticated() {
    return useContext(AuthenticatedContext);
}