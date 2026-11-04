import ProtectedRoute from '../../../components/ProtectedRoute';
import Filter from './componentes/filter';
import { useAuthenticated } from '../../../context/authContext';
import Record from './componentes/record';
import Header from '../../../components/header';
import { useState } from 'react';
import { IconArrowLeft } from '@tabler/icons-react';

export default function MedicalRecord() {
    const { role, isLoading } = useAuthenticated();
    const [patient, setPatient] = useState(null);
    const isDoctor = role === 'doctor';

    if (isLoading) return null;

    return (
        <ProtectedRoute isPrivate={true}>
            <div className='bg-color5 flex min-h-svh py-37'>
                <Header />
                <main className='flex h-full w-full flex-col items-center'>
                    {isDoctor ? (
                        patient ? (
                            <>
                                <button
                                    className='flex gap-2 text-gray-500'
                                    onClick={() => setPatient(null)}
                                >
                                    <IconArrowLeft /> Voltar para prontuários
                                </button>
                                <Record patientId={patient.id} />
                            </>
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
