import { createContext, useState, useEffect } from 'react';

const AuthenticatedContext = createContext(null);

export function AuthenticatedProvider({ children }) {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('/api/');
    }, []);

    return (
        <AuthenticatedProvider.Provider
            value={{
                isAuthenticated,
                setAuthenticated,
                user,
                setUser,
            }}
        >
            {children}
        </AuthenticatedProvider.Provider>
    );
}
