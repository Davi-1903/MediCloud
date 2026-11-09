import { useState } from 'react';
import DataPersonal from './components/dataPersonal';
import Consultas from './components/consultas';
import Prescricoes from './components/prescricoes';
import Atestados from './components/atestados';

export default function Record({ patientId }) {
    const tabs = {
        'Dados pessoais': <DataPersonal patientId={patientId} />,
        Consultas: <Consultas patientId={patientId} />,
        Prescrições: <Prescricoes patientId={patientId} />,
        Atestados: <Atestados patientId={patientId} />,
    };
    const [selected, setSelected] = useState('Dados pessoais');

    return (
        <div className='flex h-full min-h-0 w-2/3 flex-col bg-white shadow-md md:rounded-2xl lg:w-5xl'>
            <ul className='grid grid-cols-2 rounded-t-xl bg-white text-color4 shadow-sm md:flex md:flex-row md:rounded-t-2xl'>
                {Object.keys(tabs).map(t => (
                    <li
                        key={t}
                        onClick={() => setSelected(t)}
                        className={`flex flex-1 cursor-pointer items-center justify-center rounded-tl-md rounded-tr-md py-3 text-center md:rounded-tl-2xl md:rounded-tr-2xl md:px-3 md:py-5 ${
                            selected === t ? 'bg-color4 text-white' : ''
                        }`}
                    >
                        <span>{t}</span>
                    </li>
                ))}
            </ul>

            <div className='min-h-0 min-w-0 flex-1 overflow-y-auto'>{tabs[selected]}</div>
        </div>
    );
}
