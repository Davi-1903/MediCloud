import { useState } from 'react';
import DataPersonal from '../data';

export default function Record() {
    const tabs = ['Dados pessoais', 'Atendimentos', 'Prescrição', 'Atestados'];
    const [selected, setSelected] = useState('Dados pessoais');
    return (
        <div className='flex h-full w-2/3 flex-col items-center rounded-2xl bg-white shadow-md lg:w-5xl'>
            <ul className='flex w-full rounded-t-2xl border-b-2 bg-white text-color4'>
                {tabs.map(t => (
                    <li
                        onClick={() => setSelected(t)}
                        className={`flex flex-1 cursor-pointer justify-center rounded-t-2xl py-5 ${
                            selected === t ? 'bg-color4 text-white' : ''
                        }`}
                    >
                        <span>{t}</span>
                    </li>
                ))}
            </ul>
            {selected === 'Dados pessoais' ? <DataPersonal /> : <h1>Nada</h1>}
        </div>
    );
}
