import Header from '../../../components/header';
import ProtectedRoute from '../../../components/protectedRoute';
import Footer from '../../../components/footer';
import {IconArrowRight, IconBell, IconCalendarWeek, IconClock, IconDroplet, IconHeartbeat, IconMoodKid, IconUser} from '@tabler/icons-react';

const usuario = {
    nome: 'Ana Cecilya da Silva',
    email: 'anacecilya123@gmail.com',
    tipo: 'Paciente',
    consultasAgendadas: 4,
    examesEmAndamento: 3,
};

const consultas = [
    {
        id: 1,
        especialidade: 'Cardiologia',
        modalidade: 'Presencial',
        medico: 'Dr. Lucas Fernando',
        data: '26/06/2026',
        hora: '10:00',
        icone: IconHeartbeat,
        lembrete: true,
    },
    {
        id: 2,
        especialidade: 'Pediatria',
        modalidade: 'Online',
        medico: 'Dr. Lucas Fernando',
        data: '26/06/2026',
        hora: '10:00',
        icone: IconMoodKid,
    },
    {
        id: 3,
        especialidade: 'Pediatria',
        modalidade: 'Online',
        medico: 'Dr. Lucas Fernando',
        data: '26/06/2026',
        hora: '10:00',
        icone: IconMoodKid,
    },
];

const exames = [
    { id: 1, nome: 'Exame de Sangue', data: '26/06/2026', hora: '15:50', status: 'Aguardando' },
    { id: 2, nome: 'Exame de Sangue', data: '26/06/2026', hora: '15:50', status: 'Aguardando' },
    { id: 3, nome: 'Exame de Sangue', data: '26/06/2026', hora: '15:50', status: 'Pronto' },
];

const estiloStatus = {
    Aguardando: 'bg-orange-100 text-orange-600',
    Pronto: 'bg-green-100 text-green-600',
};

const lembretes = [
    {
        id: 1,
        titulo: 'Consulta confirmada',
        texto: 'Consulta com Dr. Lucas Fernando',
        cor: 'bg-[#FFE5EA] text-[#EB536D]',
    },
    {
        id: 2,
        titulo: 'Confirme sua consulta',
        texto: '12/05/2026 · 15:00',
        cor: 'bg-yellow-100 text-yellow-500',
    },
];

export default function Profile() {
    return (
        <ProtectedRoute isPrivate={true}>
            <div className='h-full bg-[#FFF5F6] pt-3'>
                <Header />
                <main className='mx-auto mt-24 flex w-full max-w-6xl flex-col gap-5 px-4 pb-10 lg:flex-row'>
                    {/* dados do usuário (ta com as informações fixas) */}
                    <aside className='h-fit w-full shrink-0 rounded-2xl bg-white p-6 shadow-md lg:w-72'>
                        <div className='flex flex-col items-center'>
                            <div className='flex h-36 w-36 items-center justify-center rounded-full bg-[#FFE5EA] text-[#EB536D]'>
                                <IconUser
                                    size={80}
                                    stroke={1.5}
                                />
                            </div>
                            <h1 className='mt-6 text-center text-base font-semibold'>{usuario.nome}</h1>
                            <span className='text-xs text-gray-500'>{usuario.email}</span>
                            <span className='mt-3 rounded-full bg-[#3B0F5C] px-4 py-0.5 text-xs font-medium text-white'>
                                {usuario.tipo}
                            </span>

                            <div className='mt-6 flex flex-col gap-3'>
                                <button
                                    type='button'
                                    className='w-40 cursor-pointer rounded-full bg-[#C94A5E] py-1.5 text-xs font-medium text-white hover:opacity-90'
                                >
                                    Editar perfil
                                </button>
                                <button
                                    type='button'
                                    className='w-40 cursor-pointer rounded-full bg-[#F7C6CE] py-1.5 text-xs font-medium text-[#C94A5E] hover:opacity-90'
                                >
                                    Excluir perfil
                                </button>
                            </div>
                        </div>

                        <hr className='my-6 border-t-2 border-[#F7C6CE]' />

                        <div className='flex flex-col gap-1 text-xs text-gray-500'>
                            <span>{usuario.consultasAgendadas} consultas agendadas</span>
                            <span>{usuario.examesEmAndamento} exames em andamento</span>
                        </div>
                    </aside>

                    <div className='flex flex-1 flex-col gap-5'>
                        {/* Consultas agendadas (tudo fixo) */}
                        <section className='rounded-2xl bg-white p-6 shadow-md'>
                            <h2 className='mb-4 text-lg font-semibold'>Consultas agendadas</h2>
                            <div className='flex flex-wrap gap-4'>
                                {consultas.map((c) => {
                                    const Icone = c.icone;
                                    return (
                                        <article
                                            key={c.id}
                                            className='relative w-60 rounded-lg border border-gray-300 p-3'
                                        >
                                            {c.lembrete && (
                                                <span className='absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded bg-[#F7A1AE] text-white'>
                                                    <IconBell size={10} />
                                                </span>
                                            )}
                                            <div className='mb-2 flex items-center gap-2'>
                                                <span className='flex h-8 w-8 items-center justify-center rounded-full bg-[#EB536D] text-white'>
                                                    <Icone size={16} />
                                                </span>
                                                <div className='flex flex-col leading-tight'>
                                                    <b className='text-sm font-semibold text-[#EB536D]'>{c.especialidade}</b>
                                                    <small className='text-[11px] text-gray-500'>{c.modalidade}</small>
                                                </div>
                                            </div>
                                            <p className='mb-1 text-xs font-semibold'>{c.medico}</p>
                                            <p className='flex items-center gap-1.5 text-[11px] text-gray-600'>
                                                <IconCalendarWeek size={13} />
                                                {c.data}
                                            </p>
                                            <p className='flex items-center gap-1.5 text-[11px] text-gray-600'>
                                                <IconClock size={13} />
                                                {c.hora}
                                            </p>
                                        </article>
                                    );
                                })}
                            </div>
                        </section>

                        <section className='rounded-2xl bg-white p-6 shadow-md'>
                            <h2 className='mb-4 text-lg font-semibold'>Meus exames</h2>
                            <div className='flex flex-wrap gap-4'>
                                {exames.map((e) => (
                                    <article
                                        key={e.id}
                                        className='w-60 rounded-lg border border-gray-300 p-3'
                                    >
                                        <div className='mb-2 flex items-center gap-2'>
                                            <span className='flex h-5 w-5 items-center justify-center rounded-full bg-[#FFE5EA] text-[#EB536D]'>
                                                <IconDroplet size={12} />
                                            </span>
                                            <b className='text-sm font-semibold text-[#EB536D]'>{e.nome}</b>
                                        </div>
                                        <p className='text-[11px] text-gray-600'>Data da coleta: {e.data}</p>
                                        <p className='mb-3 text-[11px] text-gray-600'>Horário: {e.hora}</p>
                                        <div className='flex items-center justify-between'>
                                            <span
                                                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${estiloStatus[e.status]}`}
                                            >
                                                {e.status}
                                            </span>
                                            <button
                                                type='button'
                                                className='flex cursor-pointer items-center gap-0.5 text-[11px] text-[#EB536D]'
                                            >
                                                Ver
                                                <IconArrowRight size={12} />
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>

                        {/* Lembretes */}
                        <section className='rounded-2xl bg-white p-6 shadow-md'>
                            <h2 className='mb-4 text-lg font-semibold'>Lembretes</h2>
                            <div className='flex flex-wrap gap-4'>
                                {lembretes.map((l) => (
                                    <article
                                        key={l.id}
                                        className='flex w-60 items-center gap-3 rounded-lg border border-gray-300 p-2.5'
                                    >
                                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${l.cor}`}>
                                            <IconBell size={16} />
                                        </span>
                                        <div className='flex flex-col leading-tight'>
                                            <b className='text-xs font-semibold'>{l.titulo}</b>
                                            <small className='text-[11px] text-gray-500'>{l.texto}</small>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    </div>
                </main>
                <Footer />
            </div>
        </ProtectedRoute>
    );
}
