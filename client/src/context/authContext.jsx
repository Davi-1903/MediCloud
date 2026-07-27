import { createContext, useContext, useEffect, useState } from 'react';
import { setAccessToken, tryRefresh } from '../api/user';

const AuthenticatedContext = createContext({
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
});

export function AuthenticatedProvider({ children }) {
    const [isAuthenticated, setAuthenticated] = useState(false);

    const login = token => {
        setAccessToken(token);
        setAuthenticated(true);
    };

    const logout = async () => {
        await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
        setAccessToken(null);
        setAuthenticated(false);
    };

    useEffect(() => {
        tryRefresh().then(token => setAuthenticated(Boolean(token)));
    }, []);

    return (
        <AuthenticatedContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthenticatedContext.Provider>
    );
}

export function useAuthenticated() {
    return useContext(AuthenticatedContext);
}
