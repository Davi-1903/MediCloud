import ProtectedRoute from '../../../components/protectedRoute';
import Header from '../../../components/header';

export default function DashAdmin() {
    return (
        <ProtectedRoute isPrivate={true}>
            <Header />

            <main className='bg-color5 flex h-svh w-svw flex-col items-center p-10 pt-40'>
                <div className='flex h-full w-400 flex-col rounded-2xl bg-white shadow-2xl'>
                    <div className='w-full p-5'>
                        <input
                            type='text'
                            name='texto'
                            placeholder='Busca por texto...'
                        />
                    </div>
                </div>
            </main>
        </ProtectedRoute>
    );
}
