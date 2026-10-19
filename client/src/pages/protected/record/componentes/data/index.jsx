import ProtectedRoute from '../../../../../components/ProtectedRoute';
import { useState } from 'react';

export default function Data() {
    const [selected, setSelected] = useState('Dados pessoais');

    return (
        <ProtectedRoute isPrivate={true}>
            <div className='flex h-svh w-svw items-center justify-center bg-red-100'>
                <div className='flex w-2/3 max-w-full flex-col items-center justify-center rounded-2xl bg-white shadow-md lg:w-5xl'>
                    <ul className='flex w-full border-b-2 text-color4'>
                        <li
                            onClick={() => setSelected('Dados pessoais')}
                            className={`flex flex-1 cursor-pointer justify-center py-5 ${
                                selected === 'Dados pessoais' ? 'bg-color4 text-white' : ''
                            }`}
                        >
                            Dados pessoais
                        </li>

                        <li
                            onClick={() => setSelected('Atendimento')}
                            className={`flex flex-1 cursor-pointer justify-center py-5 ${
                                selected === 'Atendimento' ? 'bg-color4 text-white' : ''
                            }`}
                        >
                            Atendimento
                        </li>

                        <li
                            onClick={() => setSelected('Prescrição')}
                            className={`flex flex-1 cursor-pointer justify-center py-5 ${
                                selected === 'Prescrição' ? 'bg-color4 text-white' : ''
                            }`}
                        >
                            Prescrição
                        </li>

                        <li
                            onClick={() => setSelected('Atestados')}
                            className={`flex flex-1 cursor-pointer justify-center py-5 ${
                                selected === 'Atestados' ? 'bg-color4 text-white' : ''
                            }`}
                        >
                            Atestados
                        </li>
                    </ul>

                    <div className='p-5'>
                        <h1>dados</h1>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
