import { GET } from '../../../api/user';
import ProtectedRoute from '../../../components/ProtectedRoute';
import Filter from './componentes/filter';
import Header from '../../../components/header';

export default function MedicalRecord() {
    
    return (
        <ProtectedRoute isPrivate={true}>
            <Filter />
        </ProtectedRoute>
    );
}
