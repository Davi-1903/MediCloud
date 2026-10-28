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
            <div className='h-svh bg-color5 mt-25 py-3 flex '>
                <Header />
                <main className='flex justify-center w-full'>
                    {isDoctor ? (
                        patient ? (
                            <Record patientId={patient.id} />
                        ) : (
                            <Filter onSelect={setPatient} />
                        )
                    ) : (
                        <Record patientId={patient.id}/>
                    )}
                </main>
            </div>
        </ProtectedRoute>
    );
}
