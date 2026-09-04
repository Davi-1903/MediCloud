import Header from '../../../components/header';
import ProtectedRoute from '../../../components/protectedRoute';
import Appointments from './components/appointments';

export default function HomeMedico() {
    return (
        <ProtectedRoute isPrivate={true}>
            <div className='h-full bg-[#FFF5F6] pt-3'>
                <Header />
                <main>
                    <Appointments />
                </main>
            </div>
        </ProtectedRoute>
    );
}
