import { useEffect, useState } from 'react';
import { GET } from '../../../../../api/user';

export default function Atestados({ patientId }) {
    const [prescricoes, setPrescricoes] = useState([]);

    useEffect(() => {
        let ignore = false;

        async function load() {
            try {
                const url = patientId ? `/api/prescricoes/${patientId}` : `/api/prescricoes/`;
                const res = await GET(url);
                if (ignore) return;
                if (res.status !== 200) throw new Error(res.detail ?? `Erro: ${res.status}`);
                setPrescricoes(res);
            } catch (err) {
                alert(err.message);
                return;
            }
        }

        load();
        return () => {
            ignore = true;
        };
    }, [patientId]);

    if (!prescricoes) return;

    return (
        <div className='flex h-full w-full flex-col gap-5 px-5 py-10 md:gap-5 md:px-15'>
            {prescricoes.map(p => (
                <>
                    <div className='flex h-fit w-full flex-col items-center rounded-xl border border-gray-200 shadow-sm md:flex-row'>
                        <span className='flex w-full items-center justify-center bg-color3 py-3 md:h-23 md:w-23 md:rounded-tl-xl md:rounded-bl-xl'>
                            <p className='text-medium text-center text-xl'>
                                {p.atestado}
                                <span className='text-center md:block'> dias</span>
                            </p>
                        </span>
                        <span className='px-3 py-2'>
                            <h1 className='text-lg'>Repouso por: {p.consulta.diagnostico}</h1>
                            <p className='text-md text-gray-400'>Emitido por Dr(a) {p.consulta.doctor.name}</p>
                            <p className='text-md text-gray-400'>Data da emissão: {p.consulta.data}</p>
                        </span>
                    </div>
                </>
            ))}
        </div>
    );
}
