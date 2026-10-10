import { IconCalendar, IconUser } from '@tabler/icons-react';

export default function CardDoctor() {
    const medico = { nome: 'Dr. Uchoa', email: 'uchoa@gmail.com', especialidade: 'Endocrinologista', crm: '56789234' };

    return (
        <section className='rounded-2xl bg-white p-3 shadow-md'>
            <div className='flex w-full flex-wrap justify-between gap-6 rounded-xl border border-gray-400 px-7 py-3.5'>
                <div className='flex flex-wrap items-center gap-3'>
                    <div className='flex h-18 w-18 items-center justify-center rounded-full border border-gray-800 bg-[#FFE5EA]'>
                        <IconUser size={38} />
                    </div>
                    <div className='leading-relaxed text-gray-800'>
                        <p className='text-lg font-semibold'>Nome: {medico.nome}</p>
                        <div className='text-md flex gap-1'>
                            <p className='text-md font-bold'>Email: </p>
                            <p>{medico.email}</p>
                        </div>
                        <div className='text-md flex gap-10'>
                            <p className='text-md font-bold'>{medico.especialidade}</p>
                            <p>
                                <strong>CRM: </strong>
                                {medico.crm}
                            </p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-wrap items-center gap-3'>
                    <div className='flex h-16 w-16 items-center justify-center rounded-full bg-[#FFE5EA] text-[#EB536D]'>
                        <IconCalendar size={25} />
                    </div>
                    <div>
                        <h1 className='text-lg font-semibold'>Cadastro de Horários</h1>
                        <p className='text-md text-gray-600'>
                            Defina os dias e horários disponíveis para seus atendimentos
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
