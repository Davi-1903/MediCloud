import ProtectedRoute from '../../../components/protectedRoute';
import Header from '../../../components/header';

export default function DashAdmin() {
    return (
        <ProtectedRoute isPrivate={true}>
            <Header />

            <main className='flex flex-col h-svh w-svw bg-color5 pt-40 p-10 items-center'>
                <div className='flex flex-col shadow-2xl bg-white w-400 h-full rounded-2xl'>
                    <div className='w-full p-5'>
                        <input type="text" name="texto" placeholder='Busca por texto...' />
                    </div>
                </div>
            </main>
        </ProtectedRoute>
    );
}
