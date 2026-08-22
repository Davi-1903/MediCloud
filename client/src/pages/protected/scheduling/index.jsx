import { useState } from 'react';
import Header from '../../../components/Header';
import ProtectedRoute from '../../../components/protectedRoute';
import { IconChevronRight } from '@tabler/icons-react';

export default function Scheduling() {
    const [medicoSelecionado, setMedicoSelecionado] = useState('lucas');
    const [diaSelecionado, setDiaSelecionado] = useState('segunda');

    return (
        <ProtectedRoute isPrivate={true}>
            <div className='h-full bg-[#FFF5F6] py-3'>
                <Header />
                <main className='mt-28 flex w-full flex-col items-center gap-5 pb-10'>
                    <section>
                        <h1 className='lg:text-4xl" text-center text-xl font-semibold md:text-2xl'>
                            Encontre o horário ideal para você
                        </h1>
                        <p className='md:text-md text-center text-sm text-gray-600'>
                            Veja os horários disponíveis e agende sua consulta de forma rápida e fácil
                        </p>
                    </section>
                    <section className='flex w-full items-center justify-center'>
                        <div className='flex items-center justify-center gap-2'>
                            <span className='block flex h-8 w-8 items-center justify-center rounded-full bg-[#EB536D] text-sm font-medium text-white'>
                                1
                            </span>
                            <span className='text-md font-medium text-[#EB536D]'>Escolha o médico</span>
                        </div>
                        <div className='mx-4 h-[1px] w-20 bg-gray-400'></div>
                        <div className='flex items-center justify-center gap-2'>
                            <span className='block flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-sm font-medium text-gray-600'>
                                2
                            </span>
                            <span className='text-md font-medium text-gray-500'>Escolha o horário</span>
                        </div>
                        <div className='mx-4 h-[1px] w-20 bg-gray-400'></div>
                        <div className='flex items-center justify-center gap-2'>
                            <span className='block flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-sm font-medium text-gray-600'>
                                3
                            </span>
                            <span className='text-md font-medium text-gray-500'>Confirmação</span>
                        </div>
                    </section>
                    <section className='doutores'>
                        <h2 className='mb-3 text-lg font-semibold'>Escolha um médico</h2>
                        <div className='flex items-center gap-5'>
                            <div
                                onClick={() => setMedicoSelecionado('lucas')}
                                className={`flex w-80 cursor-pointer items-center gap-3 rounded-lg border bg-white p-2 ${
                                    medicoSelecionado === 'lucas' ? 'border-[#EB536D]' : 'border-gray-400'
                                }`}
                            >
                                <div className='h-24 w-16 rounded-4xl bg-[#ffd1da] object-cover'></div>

                                <div className='flex flex-col'>
                                    <h3 className='text-sm font-semibold text-gray-800'>Dr. Lucas Ferreira</h3>
                                    <span className='mb-1 text-xs text-[#EB536D]'>Cardiologista</span>

                                    <span
                                        className={`mt-1 w-fit rounded-full px-2 py-1 text-xs font-medium ${
                                            medicoSelecionado === 'lucas'
                                                ? 'bg-[#FFE5EA] text-[#EB536D]'
                                                : 'bg-gray-300 text-gray-600'
                                        }`}
                                    >
                                        Próximos horários amanhã
                                    </span>
                                </div>
                            </div>

                            <div
                                onClick={() => setMedicoSelecionado('anna carla')}
                                className={`flex w-80 cursor-pointer items-center gap-3 rounded-lg border bg-white p-2 ${
                                    medicoSelecionado === 'anna carla' ? 'border-[#EB536D]' : 'border-gray-400'
                                }`}
                            >
                                <div className='h-24 w-16 rounded-4xl bg-[#ffd1da] object-cover'></div>

                                <div className='flex flex-col'>
                                    <h3 className='text-sm font-semibold text-gray-800'>Dra. Anna Carla</h3>
                                    <span className='mb-1 text-xs text-[#EB536D]'>Pediatra</span>

                                    <span
                                        className={`mt-1 w-fit rounded-full px-2 py-1 text-xs font-medium ${
                                            medicoSelecionado === 'anna carla'
                                                ? 'bg-[#FFE5EA] text-[#EB536D]'
                                                : 'bg-gray-300 text-gray-600'
                                        }`}
                                    >
                                        Próximos horários amanhã
                                    </span>
                                </div>
                            </div>

                            <div
                                onClick={() => setMedicoSelecionado('izabel')}
                                className={`flex w-80 cursor-pointer items-center gap-3 rounded-lg border bg-white p-2 ${
                                    medicoSelecionado === 'izabel' ? 'border-[#EB536D]' : 'border-gray-400'
                                }`}
                            >
                                <div className='h-24 w-16 rounded-4xl bg-[#ffd1da] object-cover'></div>

                                <div className='flex flex-col'>
                                    <h3 className='text-sm font-semibold text-gray-800'>Dra. Izabel da Luz</h3>
                                    <span className='mb-1 text-xs text-[#EB536D]'>Ginecologista</span>

                                    <span
                                        className={`mt-1 w-fit rounded-full px-2 py-1 text-xs font-medium ${
                                            medicoSelecionado === 'izabel'
                                                ? 'bg-[#FFE5EA] text-[#EB536D]'
                                                : 'bg-gray-300 text-gray-600'
                                        }`}
                                    >
                                        Próximos horários na próxima semana
                                    </span>
                                </div>
                            </div>
                            <button className='cursor-pointer rounded-full bg-color2 p-2'>
                                <IconChevronRight
                                    size={24}
                                    className='stroke-white'
                                />
                            </button>
                        </div>
                    </section>
                    <section className='flex gap-20'>
                        <aside className='flex h-46 items-center justify-center gap-4'>
                            <div className='h-42 w-24 rounded-full bg-[#ffd1da]'></div>

                            <div className='flex w-60 flex-col'>
                                <h2 className='text-lg font-semibold'>Dr. Lucas Ferreira</h2>

                                <span className='text-sm text-[#EB536D]'>Clínico geral</span>

                                <p className='text-sm text-gray-600'>
                                    Atendimento humanizado e focado na saúde e bem-estar.
                                </p>
                            </div>
                        </aside>
                        <div className='available-times'>
                            <h2 className='mb-6 text-lg font-semibold'>Horários disponíveis</h2>
                            <div className='flex gap-10'>
                                <div className='flex flex-col items-center gap-5'>
                                    <div
                                        onClick={() => setDiaSelecionado('segunda')}
                                        className={`flex h-15 w-30 cursor-pointer flex-col items-center justify-center rounded-lg ${
                                            diaSelecionado === 'segunda'
                                                ? 'bg-[#EB536D] text-white'
                                                : 'border border-[#f7c6ce] text-gray-600'
                                        }`}
                                    >
                                        <span className='text-md font-medium'>Segunda</span>
                                        <small>20 maio</small>
                                    </div>
                                    <button className='horario'>08:00</button>
                                    <button className='horario'>08:00</button>
                                    <button className='horario'>08:00</button>
                                    <button className='horario'>08:00</button>
                                </div>

                                <div className='flex flex-col items-center gap-5'>
                                    <div
                                        onClick={() => setDiaSelecionado('terca')}
                                        className={`flex h-15 w-30 cursor-pointer flex-col items-center justify-center rounded-lg ${
                                            diaSelecionado === 'terca'
                                                ? 'bg-[#EB536D] text-white'
                                                : 'border border-[#f7c6ce] text-gray-600'
                                        }`}
                                    >
                                        <span className='text-md font-medium'>Terça</span>
                                        <small>21 maio</small>
                                    </div>
                                    <button className='horario'>08:00</button>
                                    <button className='horario'>09:00</button>
                                    <button className='horario'>10:00</button>
                                    <button className='horario'>16:00</button>
                                </div>

                                <div className='flex flex-col items-center gap-5'>
                                    <div
                                        onClick={() => setDiaSelecionado('quarta')}
                                        className={`flex h-15 w-30 cursor-pointer flex-col items-center justify-center rounded-lg ${
                                            diaSelecionado === 'quarta'
                                                ? 'bg-[#EB536D] text-white'
                                                : 'border border-[#f7c6ce] text-gray-600'
                                        }`}
                                    >
                                        <span className='text-md font-medium'>Quarta</span>
                                        <small>22 maio</small>
                                    </div>
                                    <button className='horario'>13:00</button>
                                    <button className='horario'>17:00</button>
                                    <button className='horario'>18:00</button>
                                </div>

                                <div className='flex flex-col items-center gap-5'>
                                    <div
                                        onClick={() => setDiaSelecionado('quinta')}
                                        className={`flex h-15 w-30 cursor-pointer flex-col items-center justify-center rounded-lg ${
                                            diaSelecionado === 'quinta'
                                                ? 'bg-[#EB536D] text-white'
                                                : 'border border-[#f7c6ce] text-gray-600'
                                        }`}
                                    >
                                        <span className='text-md font-medium'>Quinta</span>
                                        <small>23 maio</small>
                                    </div>
                                    <button className='horario'>07:00</button>
                                    <button className='horario'>12:00</button>
                                </div>

                                <div className='flex flex-col items-center gap-5'>
                                    <div
                                        onClick={() => setDiaSelecionado('sexta')}
                                        className={`flex h-15 w-30 cursor-pointer flex-col items-center justify-center rounded-lg ${
                                            diaSelecionado === 'sexta'
                                                ? 'bg-[#EB536D] text-white'
                                                : 'border border-[#f7c6ce] text-gray-600'
                                        }`}
                                    >
                                        <span className='text-md font-medium'>Sexta</span>
                                        <small>24 maio</small>
                                    </div>
                                    <button className='horario'>13:00</button>
                                    <button className='horario'>16:00</button>
                                    <button className='horario'>17:00</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </ProtectedRoute>
    );
}
