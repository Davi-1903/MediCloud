import { Navigate } from 'react-router-dom';
import { useAuthenticated } from '../../../src/context/authContext.jsx';

export default function ProtectedRoute({ children, isPrivate }) {
    const { isAuthenticated } = useAuthenticated();

    if (isPrivate && !isAuthenticated) return <Navigate to='/login' />;
    if (!isPrivate && isAuthenticated) return <Navigate to='/scheduling' />;
    return children;
}
