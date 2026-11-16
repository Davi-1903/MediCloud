import { useEffect, useState } from 'react';
import { GET } from '../../../../../api/user';

function Field({ label, value }) {
    return (
        <div className='w-full border-b border-gray-300 py-2'>
            <h3 className='text-gray-400'>{label}</h3>
            <p className='text-lg'>{value ?? <span className='text-sm text-gray-400'>NÃO INFORMADO</span>}</p>
        </div>
    );
}

export default function DataPersonal({ patientId }) {
    const [prontuario, setProntuario] = useState(null);

    useEffect(() => {
        let ignore = false;

        async function load() {
            try {
                const url = patientId ? `/api/prontuario/${patientId}` : `/api/prontuario`;
                const res = await GET(url);
                if (ignore) return;
                if (res.status !== 200) throw new Error(res.detail ?? `Erro ${res.status}`);
                setProntuario(res);
            } catch (err) {
                console.log(`Erro: ${err.message}`);
                return;
            }
        }

        load();
        return () => {
            ignore = true;
        };
    }, [patientId]);

    return (
        <div className='flex h-full w-full flex-col items-center justify-around gap-5 px-10 py-5 md:grid md:grid-cols-2'>
            {prontuario === null ? (
                <h1 className='-ml-1/2 absolute left-1/2 text-center font-medium text-gray-400'>
                    Não existe um prontuário cadastrado
                </h1>
            ) : (
                <>
                    <Field
                        label='NOME'
                        value={prontuario.patient.name}
                    />
                    <Field
                        label='PESO'
                        value={prontuario.peso != null ? `${prontuario.peso} Kg` : null}
                    />
                    <Field
                        label='ENDEREÇO'
                        value={prontuario.patient.city}
                    />
                    <Field
                        label='CPF'
                        value={prontuario.patient.cpf}
                    />
                    <Field
                        label='ALERGIAS'
                        value={prontuario.alergias}
                    />
                    <Field
                        label='DATA DE NASCIMENTO'
                        value={prontuario.patient.birth_date}
                    />
                    <Field
                        label='ALTURA'
                        value={prontuario.altura}
                    />
                    <Field
                        label='TELEFONE'
                        value={prontuario.patient.tel}
                    />
                    <Field
                        label='SEXO'
                        value={prontuario.sexo}
                    />
                    <Field
                        label='TIPO SANGUÍNEO'
                        value={prontuario.tipo_sanguineo}
                    />
                </>
            )}
        </div>
    );
}
