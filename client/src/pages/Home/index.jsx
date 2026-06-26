import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import ProtectedRoute from '../../components/protectedRoute';

export default function Home() {
    return (
        <ProtectedRoute isPrivate={false}>
            <Header />
        </ProtectedRoute>
    );
}
