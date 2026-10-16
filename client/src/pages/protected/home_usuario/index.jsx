import { Link } from 'react-router-dom';
import Header from '../../../components/header';
import ProtectedRoute from '../../../components/protectedRoute';
import Footer from '../../../components/footer';
import {IconArrowRight, IconBell, IconCalendar, IconCalendarWeek, IconChevronRight, IconClock, IconFileText, IconHeartbeat, IconHeartPlus, IconStethoscope, IconVideo} from '@tabler/icons-react';

const atalhos = [
    {
        id: 1,
        titulo: 'Agende Consultas',
        descricao: 'Encontre horários disponíveis',
        acao: 'Agendar',
        to: '/scheduling',
        icone: IconCalendar,
    },
    {
        id: 2,
        titulo: 'Atendimento online',
        descricao: 'Converse com médicos por vídeo',
        acao: 'Iniciar',
        to: '#',
        icone: IconVideo,
    },
    {
        id: 3,
        titulo: 'Meus exames',
        descricao: 'Veja exames e resultados',
        acao: 'Ver exames',
        to: '#',
        icone: IconHeartPlus,
    },
    {
        id: 4,
        titulo: 'Minhas receitas',
        descricao: 'Acesse receitas e documentos',
        acao: 'Acessar',
        to: '#',
        icone: IconFileText,
    },
];

const agendamentos = [
    { id: 1, medico: 'Dr. Lucas Ferreira', especialidade: 'Cardiologista', data: '26/06/2026', hora: '10:00' },
    { id: 2, medico: 'Dra. Anna Carla', especialidade: 'Pediatra', data: '26/06/2026', hora: '14:00' },
    { id: 3, medico: 'Dr. Lucas Ferreira', especialidade: 'Cardiologista', data: '12/06/2026', hora: '09:00' },
];

const lembretes = [
    {
        id: 1,
        titulo: 'Não se esqueça',
        texto: 'Consulta com Dr. Lucas Ferreira amanhã às 10:00',
        data: '26/06/2026 - 10:00',
        cor: 'bg-yellow-100 text-yellow-500',
    },
    {
        id: 2,
        titulo: 'Consulta confirmada',
        texto: 'Consulta agendada com Dr. Lucas Ferreira',
        data: '26/06/2026 - 10:00',
        cor: 'bg-[#FFE5EA] text-[#EB536D]',
    },
];

const historico = [
    {
        id: 1,
        titulo: 'Consulta com pediatra',
        medico: 'Dra. Anna Clara',
        data: '24/05/2026',
        icone: IconStethoscope,
        cor: 'bg-purple-100 text-purple-700',
    },
    {
        id: 2,
        titulo: 'Consulta com cardiologista',
        medico: 'Dr. Lucas Ferreira',
        data: '16/05/2026',
        icone: IconHeartbeat,
        cor: 'bg-[#FFE5EA] text-[#EB536D]',
    },
];

const cartao = 'rounded-2xl bg-white shadow-[0_3px_12px_rgba(235,83,109,0.15)]';

function CabecalhoCartao({ titulo }) {
    return (
        <div className='mb-3 flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>{titulo}</h2>
            <button
                type='button'
                className='cursor-pointer text-xs text-[#EB536D]'
            >
                Ver todos
            </button>
        </div>
    );
}

export default function HomePatient() {
    return (
        <ProtectedRoute isPrivate={true}>
            <div className='h-full bg-[#FFF5F6] pt-3'>
                <Header />
                <main className='mx-auto mt-24 flex w-full max-w-6xl flex-col gap-4 px-4 pb-10'>
                    {/* Banner */}
                    <section className={`${cartao} px-6 py-5`}>
                        <h1 className='text-2xl font-semibold md:text-3xl'>Agende suas consultas</h1>
                        <p className='mt-2 max-w-sm text-sm text-gray-600 md:text-base'>
                            Escolha o melhor horário e consulte o médico de forma prática e rápida
                        </p>
                        <Link
                            to='/scheduling'
                            className='mt-4 inline-flex items-center gap-2 rounded-md bg-[#C94A5E] px-4 py-2 text-sm font-medium text-white hover:opacity-90'
                        >
                            <IconCalendar size={16} />
                            Agende consulta
                        </Link>
                    </section>

                    {/* Atalhos */}
                    <section className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                        {atalhos.map((a) => {
                            const Icone = a.icone;
                            return (
                                <article
                                    key={a.id}
                                    className={`${cartao} flex items-center gap-3 p-4`}
                                >
                                    <span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFE5EA] text-[#EB536D]'>
                                        <Icone size={22} />
                                    </span>
                                    <div className='flex flex-col'>
                                        <h2 className='text-sm font-semibold'>{a.titulo}</h2>
                                        <p className='text-xs leading-snug text-gray-600'>{a.descricao}</p>
                                        <Link
                                            to={a.to}
                                            className='mt-1 flex items-center gap-1 text-xs font-semibold text-[#EB536D]'
                                        >
                                            {a.acao}
                                            <IconArrowRight size={12} />
                                        </Link>
                                    </div>
                                </article>
                            );
                        })}
                    </section>

                    {/* Agendamentos, lembretes e histórico */}
                    <section className='grid gap-4 lg:grid-cols-3'>
                        {/* Agendamentos */}
                        <article className={`${cartao} flex flex-col p-4`}>
                            <CabecalhoCartao titulo='Agendamentos' />
                            <div className='flex flex-1 flex-col justify-between gap-4'>
                                {agendamentos.map((a) => (
                                    <div
                                        key={a.id}
                                        className='flex items-center gap-3'
                                    >
                                        <div className='h-12 w-12 shrink-0 rounded-full bg-gray-200'></div>
                                        <div className='flex flex-1 flex-col'>
                                            <b className='text-sm font-semibold leading-tight'>{a.medico}</b>
                                            <span className='text-xs text-gray-600'>{a.especialidade}</span>
                                            <div className='mt-0.5 flex items-center gap-1 text-[11px] text-gray-600'>
                                                <IconCalendarWeek size={14} />
                                                {a.data}
                                                <IconClock
                                                    size={14}
                                                    className='ml-1.5'
                                                />
                                                {a.hora}
                                            </div>
                                        </div>
                                        <span className='rounded-full bg-green-500 px-2.5 py-0.5 text-[11px] font-medium text-white'>
                                            Confirmado
                                        </span>
                                        <IconChevronRight
                                            size={18}
                                            className='stroke-[#666666]'
                                        />
                                    </div>
                                ))}
                            </div>
                        </article>

                        {/* Lembretes */}
                        <article className={`${cartao} p-4`}>
                            <CabecalhoCartao titulo='Lembretes' />
                            <div className='grid gap-3'>
                                {lembretes.map((l) => (
                                    <div
                                        key={l.id}
                                        className='flex items-center gap-3 rounded-xl border border-gray-300 p-2.5'
                                    >
                                        <span
                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${l.cor}`}
                                        >
                                            <IconBell size={18} />
                                        </span>
                                        <div className='flex flex-col leading-snug'>
                                            <b className='text-xs font-semibold'>{l.titulo}</b>
                                            <small className='text-[11px] text-gray-600'>{l.texto}</small>
                                            <small className='text-[11px] text-gray-700'>{l.data}</small>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </article>

                        {/* Histórico */}
                        <article className={`${cartao} p-4`}>
                            <CabecalhoCartao titulo='Histórico' />
                            <div className='grid gap-3'>
                                {historico.map((h) => {
                                    const Icone = h.icone;
                                    return (
                                        <div
                                            key={h.id}
                                            className='flex items-center gap-3 rounded-xl border border-gray-300 p-2.5'
                                        >
                                            <span
                                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${h.cor}`}
                                            >
                                                <Icone size={18} />
                                            </span>
                                            <div className='flex flex-1 flex-col leading-snug'>
                                                <b className='text-xs font-semibold'>{h.titulo}</b>
                                                <small className='text-[11px] text-gray-600'>{h.medico}</small>
                                            </div>
                                            <small className='text-[10px] text-gray-500'>{h.data}</small>
                                            <IconChevronRight
                                                size={16}
                                                className='stroke-[#666666]'
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </article>
                    </section>
                </main>
                <Footer />
            </div>
        </ProtectedRoute>
    );
}
