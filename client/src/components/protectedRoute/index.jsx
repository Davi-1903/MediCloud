import { Navigate } from 'react-router-dom';
import { useAuthenticated } from '../../../src/context/authContext.jsx';

export default function ProtectedRoute({ children, isPrivate }) {
    const { isAuthenticated, isLoading } = useAuthenticated();

    if (isLoading) return <div className='flex min-h-svh items-center justify-center'>Carregando...</div>;
    if (isPrivate && !isAuthenticated) return <Navigate to='/login' />;
    if (!isPrivate && isAuthenticated) return <Navigate to='/scheduling' />;
    return children;
}
