import ProtectedRoute from '../../../../../components/ProtectedRoute';
import { useState } from 'react';

export default function Header() {
    const [selected, setSelected] = useState('Dados pessoais');

    return (
        <ProtectedRoute isPrivate={true}>
            <ul className='flex w-full border-b-2 text-color4 bg-white'>
                <li
                    onClick={() => setSelected('Dados pessoais')}
                    className={`flex flex-1 cursor-pointer justify-center rounded-t-2xl py-5 ${
                        selected === 'Dados pessoais' ? 'bg-color4 text-white' : ''
                    }`}
                >
                    Dados pessoais
                </li>

                <li
                    onClick={() => setSelected('Atendimento')}
                    className={`flex flex-1 cursor-pointer justify-center rounded-t-2xl py-5 ${
                        selected === 'Atendimento' ? 'bg-color4 text-white' : ''
                    }`}
                >
                    Atendimento
                </li>

                <li
                    onClick={() => setSelected('Prescrição')}
                    className={`flex flex-1 cursor-pointer justify-center rounded-t-2xl py-5 ${
                        selected === 'Prescrição' ? 'bg-color4 text-white' : ''
                    }`}
                >
                    Prescrição
                </li>

                <li
                    onClick={() => setSelected('Atestados')}
                    className={`flex flex-1 cursor-pointer justify-center rounded-t-2xl py-5 ${
                        selected === 'Atestados' ? 'bg-color4 text-white' : ''
                    }`}
                >
                    Atestados
                </li>
            </ul>
        </ProtectedRoute>
    );
}
