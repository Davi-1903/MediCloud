import { Navigate } from 'react-router-dom';
import { useAuthenticated } from '../../context/authContext';
import { HOME_BY_ROLE } from '../../utils/roles';

export default function ProtectedRoute({ children, isPrivate, allowedRoles }) {
    const { isAuthenticated, isLoading, role } = useAuthenticated();

    if (isLoading) {
        return <div className='flex min-h-svh items-center justify-center'>Carregando...</div>;
    }

    const home = HOME_BY_ROLE[role] ?? '/';

    if (!isPrivate && isAuthenticated) return <Navigate to={home} replace />;
    if (isPrivate && !isAuthenticated) return <Navigate to='/login' replace />;
    if (isPrivate && allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to={home} replace />;
    }

    return children;
}