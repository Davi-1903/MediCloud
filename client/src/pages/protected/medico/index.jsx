import { IconCalendarWeek, IconCamera, IconHeartPlus } from '@tabler/icons-react';
import Header from '../../../components/header';
import ProtectedRoute from '../../../components/protectedRoute';
import Appointments from './components/appointments';
import Cards from './components/cards';

export default function HomeMedico() {
    return (
        <ProtectedRoute isPrivate={true}>
            <div className='min-h-full bg-[#FFF5F6] pt-3'>
                <Header />
                <main className='mt-28 p-5'>
                    <Appointments />
                    <Cards />
                </main>
            </div>
        </ProtectedRoute>
    );
}
