import ProtectedRoute from '../../../components/protectedRoute';
import Header from '../../../components/header';
import Filter from './componentes/filter';
import { useState } from 'react';
import { GET } from '../../../api/user';

export default function MedicalRecord() {
    const [results, setResults] = useState([]);

    async function handleSearch(search) {
        try {
            const params = new URLSearchParams({ user: search });
            const data = await GET(`/api/user/filter?${params.toString()}`);

            if (data.status === 401) {
                setResults([]);
                return;
            }
            if (data.status !== 200) throw new Error('Não foi possível carregar os usuários');

            setResults(data);
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <ProtectedRoute isPrivate={true}>
            <div className='flex h-full w-full justify-center bg-[#FFF5F6] pt-3'>
                <Header />
                <main className='mt-28 flex h-svh w-full max-w-6xl flex-col gap-10 px-4 py-10'>
                    <Filter onSearch={handleSearch} />
                    <ul className='flex h-full w-full justify-center gap-5'>
                        {results.length > 0 ? (
                            <>
                                {results.map(user => (
                                    <li
                                        key={user.id}
                                        className='flex h-1/4 flex-1 items-center gap-4 rounded-xl bg-white px-3 py-6 shadow-md'
                                    >
                                        <div className='flex h-32 w-32 items-center justify-center rounded-full bg-red-100 p-3'>
                                            <span className='text-5xl font-bold text-white'>
                                                {user.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className='flex flex-1 flex-col gap-1'>
                                            <h1 className='text-xl font-medium'>{user.name}</h1>
                                            <p className=''>{user.email}</p>
                                        </div>
                                    </li>
                                ))}
                            </>
                        ) : (
                            <h1 className='text-2xl font-semibold text-gray-400'>Buscar usuários...</h1>
                        )}
                    </ul>
                </main>
            </div>
        </ProtectedRoute>
    );
}
