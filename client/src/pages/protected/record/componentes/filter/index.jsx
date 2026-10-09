import { useState } from 'react';
import { POST } from '../../../../../api/user';

export default function Filter() {
    const [user, setUser] = useState('');
    console.log(user);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const data = await POST('api/prontuario', {user});
            if (data.status !== 200) throw new Error(data.detail);
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <>
            <div className='flex flex-col gap-3'>
                <form onSubmit={handleSubmit}>
                    <p className='text-gray-500'>Selecione um paciente para acessar seu prontuário</p>
                    <div className='flex'>
                        <input
                            type='text'
                            placeholder='Busque o paciente...'
                            className='flex w-full rounded-tl-xl rounded-bl-xl bg-white px-5 py-2 shadow-md outline-0'
                            required
                            onChange={e => setUser(e.target.value)}
                        />
                        <button
                            type='submit'
                            className='text-mediam bg-color5 rounded-tr-xl rounded-br-xl border-2 px-5 py-2 text-color4 shadow-md'
                        >
                            Buscar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
