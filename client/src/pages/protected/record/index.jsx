import ProtectedRoute from '../../../components/protectedRoute';
import Header from '../../../components/header';
import Filter from './componentes/filter';

export default function MedicalRecord() {
    return (
        <ProtectedRoute isPrivate={true}>
            <div className='h-full bg-[#FFF5F6] pt-3 flex justify-center w-full'>
                <Header />
                <main className='mt-28 flex w-full max-w-6xl px-4 h-svh flex-col py-10'>
                    <h1 className='text-3xl font-medium'>Prontuários</h1>
                    <Filter />
                </main>
            </div>
        </ProtectedRoute>
    );
}
