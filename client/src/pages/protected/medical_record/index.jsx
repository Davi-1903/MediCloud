import ProtectedRoute from '../../../components/ProtectedRoute';
import Filter from './componentes/filter';
import { useAuthenticated } from '../../../context/authContext';
import Record from './componentes/record';
import Header from '../../../components/header';
import { useState } from 'react';

export default function MedicalRecord() {
    const { role, isLoading } = useAuthenticated();
    const [patient, setPatient] = useState(null);
    const isDoctor = role === 'doctor';

    if (isLoading) return null;

    return (
        <ProtectedRoute isPrivate={true}>
            <div className='bg-color5 py-37 flex min-h-svh'>
                <Header />
                <main className='flex h-full w-full justify-center'>
                    {isDoctor ? (
                        patient ? (
                            <Record patientId={patient.id} />
                        ) : (
                            <Filter onSelect={setPatient} />
                        )
                    ) : (
                        <Record />
                    )}
                </main>
            </div>
        </ProtectedRoute>
    );
}
