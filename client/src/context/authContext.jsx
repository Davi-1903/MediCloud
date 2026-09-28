import { createContext, useContext, useEffect, useState } from 'react';
import { setAccessToken, tryRefresh } from '../api/user';

const AuthenticatedContext = createContext({
    isAuthenticated: false,
    isLoading: true,
    login: () => {},
    logout: () => {},
});

export function AuthenticatedProvider({ children }) {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [isLoading, setLoading] = useState(true);

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
        tryRefresh()
            .then(token => setAuthenticated(Boolean(token)))
            .catch(() => setAuthenticated(false))
            .finally(() => setLoading(false));
    }, []);

    return (
        <AuthenticatedContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthenticatedContext.Provider>
    );
}

export function useAuthenticated() {
    return useContext(AuthenticatedContext);
}
