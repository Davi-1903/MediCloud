import { useEffect, useState } from 'react';
import { GET } from '../../../../../api/user';

export default function Prescricoes({ patientId }) {
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
                <div
                    key={p.id}
                    className='flex flex-col gap-2 rounded-2xl border border-gray-300 p-5'
                >
                    {p.prescricao_medicamentos.map(m => (
                        <>
                            <span className='flex items-center justify-between'>
                                <h1 className='text-xl font-medium'>{m.medicamento}</h1>
                            </span>
                            <div className='flex justify-between px-3'>
                                <p className='text-center text-gray-400'>
                                    Via: <br />
                                    <span className='text-gray-500'>{m.via}</span>
                                </p>
                                <p className='text-center text-gray-400'>
                                    Posologia: <br />
                                    <span className='text-gray-500'>{m.posologia}</span>
                                </p>
                                <p className='text-center text-gray-400'>
                                    Duração: <br />
                                    <span className='text-gray-500'>{m.duracao}</span>
                                </p>
                            </div>
                        </>
                    ))}
                    <p className='text-md font-medium'>
                        Observações: <span className='font-normal'>{p.observacoes}</span>
                    </p>
                    <p className='text-md font-medium'>
                        Exames solicitados: <span className='font-normal'>{p.exames}</span>
                    </p>
                    <p className='text-right text-sm text-gray-400'>Emissão: {p.consulta.data}</p>
                </div>
            ))}
        </div>
    );
}
