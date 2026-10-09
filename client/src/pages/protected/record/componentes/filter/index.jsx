import { useState } from "react";

export default function Filter({ onSearch}) {
    const [user, setUser] = useState('');
    function handleSubmit(e) {
        e.preventDefault();
        onSearch(user);
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-3'>
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
            </div>
        </form>
    );
}
