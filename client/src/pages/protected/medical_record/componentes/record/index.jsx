import { useState } from 'react';
import DataPersonal from '../data';
import Consultas from '../consultas';
import Prescricoes from '../prescricoes';

export default function Record({ patientId }) {
    const tabs = {
        'Dados pessoais': <DataPersonal patientId={patientId} />,
        Consultas: <Consultas patientId={patientId} />,
        Prescrições: <Prescricoes patient_id={patientId} />,
    };
    const [selected, setSelected] = useState('Dados pessoais');

    return (
        <div className='flex h-full w-2/3 flex-col items-center rounded-2xl bg-white shadow-md lg:w-5xl'>
            <ul className='flex w-full rounded-t-2xl border-b-2 bg-white text-color4'>
                {Object.keys(tabs).map(t => (
                    <li
                        key={t}
                        onClick={() => setSelected(t)}
                        className={`flex flex-1 cursor-pointer justify-center rounded-t-2xl py-5 ${
                            selected === t ? 'bg-color4 text-white' : ''
                        }`}
                    >
                        <span>{t}</span>
                    </li>
                ))}
            </ul>

            {tabs[selected]}
        </div>
    );
}
