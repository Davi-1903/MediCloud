import { useState } from 'react';
import { GET } from '../../../../../api/user';

export default function Filter({ onSelect }) {
    const [user, setUser] = useState('');
    const [results, setResults] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const params = new URLSearchParams({ user: user.trim() });
            const res = await GET(`/api/user/filter?${params}`);

            if (res.status === 404) {
                setResults([]);
                return;
            }
            if (res.status !== 200) throw new Error('Não foi possível carregar os usuários');

            setResults(res); // o próprio array
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-3 w-2/3 px-3 py-5'
        >
            <h1 className='text-3xl font-medium'>Prontuários</h1>

            <p className='text-gray-500'>Selecione um paciente para acessar seu prontuário</p>
            <div className='flex'>
                <input
                    type='text'
                    placeholder='Busque o paciente...'
                    className='flex w-full rounded-tl-xl rounded-bl-xl bg-white px-5 py-2 shadow-md outline-0'
                    required
                    value={user}
                    onChange={e => setUser(e.target.value)}
                />
                <button
                    type='submit'
                    className='text-mediam bg-color5 rounded-tr-xl rounded-br-xl border-2 px-5 py-2 text-color4 shadow-md'
                >
                    Buscar
                </button>
            </div>
            {results.length > 0 ? (
                <>
                    <ul className='flex gap-2'>
                        {results.map(user => (
                            <li
                                key={user.id}
                                className='flex w-full items-center gap-4 rounded-xl bg-white px-3 py-6 shadow-md'
                                onClick={() => onSelect(user)}
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
                </>
            ) : (
                <h1 className='text-2xl text-center text-gray-500 font-semibold'>Busque por um usuário...</h1>
            )}
        </form>
    );
}
