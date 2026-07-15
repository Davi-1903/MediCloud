import { createContext, useContext, useEffect, useState } from 'react';
import { GET } from '../api/user';

const AuthenticatedContext = createContext({
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
});

export function AuthenticatedProvider({ children }) {
    const [isAuthenticated, setAuthenticated] = useState(false);

    const login = (token, refreshToken) => {
        localStorage.setItem('access_token', token);
        localStorage.setItem('refresh_token', refreshToken);
        setAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setAuthenticated(false);
    };

    useEffect(() => {
        const checkAuth = () => {
            GET('/api/user/')
                .then(res => setAuthenticated(res.status === 200))
                .catch(() => setAuthenticated(false));
        };

        checkAuth();
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
