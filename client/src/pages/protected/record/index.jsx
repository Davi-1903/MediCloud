import { useState } from 'react';
import { GET } from '../../../api/user';
import ProtectedRoute from '../../../components/ProtectedRoute';
import Filter from './componentes/filter';
import Header from '../../../components/header';

export default function MedicalRecord() {
    const [results, setResults] = useState([]);

    async function handleSearch(term) {
        try {
            const params = new URLSearchParams({ user: term });
            const data = await GET(`/api/user/filter?${params.toString()}`);

            if (data.status === 404) {
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
                <main className='mt-28 flex h-svh w-full max-w-6xl flex-col gap-5 px-4 py-10'>
                    <Filter onSearch={handleSearch} />

                    <ul className='flex gap-2'>
                        {results.map(user => (
                            <li
                                key={user.id}
                                className='flex w-full items-center gap-4 rounded-xl bg-white px-3 py-6 shadow-md'
                            >
                                <div className='flex h-32 w-32 items-center justify-center rounded-full bg-red-100 p-3'>
                                    <span className='text-5xl font-bold text-white'>
                                        {user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>

                                <div className='flex flex-1 flex-col gap-1'>
                                    <h1 className='text-xl font-medium'>{user.name}</h1>
                                    <p>{user.email}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </main>
            </div>
        </ProtectedRoute>
    );
}
