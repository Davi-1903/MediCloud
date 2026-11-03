import { useEffect, useState } from 'react';
import { GET } from '../../../../../api/user';

export default function Consultas() {
    const [consultas, setConsulta] = useState([]);

    useEffect(() => {
        let ignore = false;

        async function load() {
            try {
                const res = await GET('/api/consultas/');
                if (ignore) return;
                if (res.status !== 200) throw new Error(res.detail ?? `Erro: ${res.status}`);
                setConsulta(res);
            } catch (err) {
                alert(err.message);
                return;
            }
        }

        load();
        return () => {
            ignore = true;
        };
    }, []);
    return (
        <div className='flex h-full w-full flex-col px-5 py-10'>
            {consultas.map(c => (
                <div className='flex flex-1 flex-col gap-4 rounded-xl border border-gray-300 px-3 py-5'>
                    <div className='flex flex-1 align-items justify-between'>
                        <p className='rounded-lg bg-gray-200 p-2 text-sm'>{c.data}</p>
                        <p className='font-medium text-gray-500'>{c.doctor.name}</p>
                    </div>
                        <p>Sintomas: {c.sintomas}</p>
                </div>
            ))}
        </div>
    );
}
