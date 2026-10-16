import { createContext, useContext, useEffect, useState } from 'react';
import { setAccessToken, tryRefresh } from '../api/user';

const AuthenticatedContext = createContext({
    isAuthenticated: false,
    isLoading: true,
    role: null,
    login: () => {},
    logout: () => {},
});

export function AuthenticatedProvider({ children }) {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [role, setRole] = useState(null);
    const [isLoading, setLoading] = useState(true);

    // recebe o objeto da resposta do backend: { token, role }
    const login = ({ token, role }) => {
        setAccessToken(token);
        setRole(role);
        setAuthenticated(true);
    };

    const clearSession = () => {
        setAccessToken(null);
        setRole(null);
        setAuthenticated(false);
    };

    const logout = async () => {
        await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
        clearSession();
    };

    useEffect(() => {
        tryRefresh()
            .then(data => {
                if (data?.token) login(data);
                else clearSession();
            })
            .catch(clearSession)
            .finally(() => setLoading(false));
    }, []);

    return (
        <AuthenticatedContext.Provider value={{ isAuthenticated, isLoading, role, login, logout }}>
            {children}
        </AuthenticatedContext.Provider>
    );
}

export function useAuthenticated() {
    return useContext(AuthenticatedContext);
}