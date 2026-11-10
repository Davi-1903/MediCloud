import { useEffect, useState } from 'react';
import { GET } from '../../../../../api/user';

export default function Consultas({ patientId }) {
    const [consultas, setConsulta] = useState(null);

    useEffect(() => {
        let ignore = false;

        async function load() {
            try {
                const url = patientId ? `/api/consultas/${patientId}` : `/api/consultas/`;
                const res = await GET(url);
                if (ignore) return;
                if (res.status !== 200) throw new Error(res.detail ?? `Erro: ${res.status}`);
                setConsulta(res);
            } catch (err) {
                console.log(`Erro: ${err}`);
                return;
            }
        }

        load();
        return () => {
            ignore = true;
        };
    }, [patientId]);
    return (
        <div className='flex h-full w-full flex-col gap-5 px-5 py-10 md:gap-5 md:px-15'>
            {consultas === null ? (
                <h1 className='text-center font-medium text-gray-400'>Não existem consultas cadastradas</h1>
            ) : (
                consultas.map(c => (
                    <div className='flex flex-col gap-1 rounded-xl border border-gray-300 px-3 py-5'>
                        <div className='align-items flex flex-1 justify-between'>
                            <p className='rounded-lg bg-gray-200 p-2 text-sm'>{c.data}</p>
                            <p className='font-medium text-gray-500'>Dr(a).{c.doctor.name}</p>
                        </div>
                        <h1 className='text-lg font-medium'>Sintomas: {c.sintomas}</h1>
                        <p>
                            <span className='text-gray-500'>Diagnóstico:</span>{' '}
                            <span className='text-gray-600'>{c.diagnostico}</span>
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}
