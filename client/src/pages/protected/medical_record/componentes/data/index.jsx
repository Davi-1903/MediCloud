import { useEffect, useState } from 'react';
import { GET } from '../../../../../api/user';

function Field({ label, value }) {
    return (
        <div className='h-fit border-b border-gray-300 py-2'>
            <h3 className='text-gray-400'>{label}</h3>
            <p className='text-lg'>{value ?? '—'}</p>
        </div>
    );
}

export default function DataPersonal() {
    const [prontuario, setProntuario] = useState(null);

    useEffect(() => {
        let ignore = false;

        
        async function load() {
            try {
                const res = await GET('/api/prontuario');
                console.log(`Resposta: ${res}`)
                if (ignore) return;
                if (res.status !== 200) throw new Error(res.detail ?? `Erro ${res.status}`);
                setProntuario(res);
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

    if (!prontuario) return;

    return (
        <div className='flex h-full w-full flex-col justify-center gap-5 px-5 py-10 md:grid md:grid-cols-2 md:gap-10 md:px-15'>
            <Field
                label='NOME'
                value={prontuario.name}
            />
            <Field
                label='PESO'
                value={prontuario.peso != null ? `${prontuario.peso} Kg` : null}
            />
            <Field
                label='ENDEREÇO'
                value={prontuario.city}
            />
            <Field
                label='CPF'
                value={prontuario.cpf}
            />
            <Field
                label='ALERGIAS'
                value={prontuario.alergias}
            />
            <Field
                label='DATA DE NASCIMENTO'
                value={prontuario.birth_date}
            />
            <Field
                label='ALTURA'
                value={prontuario.altura}
            />
            <Field
                label='TELEFONE'
                value={prontuario.tel}
            />
            <Field
                label='SEXO'
                value={prontuario.sexo}
            />
            <Field
                label='TIPO SANGUÍNEO'
                value={prontuario.tipo_sanguineo}
            />
        </div>
    );
}
