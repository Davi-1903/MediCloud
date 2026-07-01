import { Link } from 'react-router-dom';
import Header from '../../../components/Header';
import ProtectedRoute from '../../../components/protectedRoute';
import { useState } from "react";
import seta from '../../../../public/assets/icons/seta.png';

export default function Scheduling() {
    const [medicoSelecionado, setMedicoSelecionado] = useState("lucas");
    const [diaSelecionado, setDiaSelecionado] = useState("segunda");
    return (
        <>
            <div className='min-h-screen bg-[#FFF5F6]'>
                <ProtectedRoute isPrivate={false}>
                    <Header />
                </ProtectedRoute>
                <main className='w-full h-full absolute top-1/6 bg-[#FFF5F6] flex flex-col items-center gap-5'>
                    <section>
                        <h1 className='text-center text-xl md:text-2xl lg:text-4xl" font-semibold'>Encontre o horário ideal para você</h1>
                        <p className='text-center text-sm md:text-md text-gray-600'>Veja os horários disponíveis e agende sua consulta de forma rápida e fácil</p>
                    </section>
                    <section className='flex items-center justify-center w-full'>
                        <div className='flex gap-2 justify-center items-center'>
                            <span className='block w-8 h-8 bg-[#EB536D] text-white flex justify-center items-center rounded-full text-sm font-medium'>1</span>
                            <span className='text-[#EB536D] text-md font-medium'>Escolha o médico</span>
                        </div>
                        <div className='w-20 h-[1px] bg-gray-400 mx-4'></div>
                        <div className='flex gap-2 justify-center items-center'>
                            <span className='block w-8 h-8 bg-gray-300 text-gray-600 flex justify-center items-center rounded-full text-sm font-medium'>2</span>
                            <span className='text-gray-500 text-md font-medium'>Escolha o horário</span>
                        </div>
                        <div className='w-20 h-[1px] bg-gray-400 mx-4'></div>
                        <div className='flex gap-2 justify-center items-center'>
                            <span className='block w-8 h-8 bg-gray-300 text-gray-600 flex justify-center items-center rounded-full text-sm font-medium'>3</span>
                            <span className='text-gray-500 text-md font-medium'>Confirmação</span>
                        </div>
                    </section>
                    <section className="doutores">
                        <h2 className='text-lg font-semibold mb-3'>Escolha um médico</h2>
                        <div className='flex gap-5 items-center'>
                            <div
                                onClick={() => setMedicoSelecionado("lucas")}
                                className={`flex items-center gap-3 rounded-lg p-2 w-80 bg-white cursor-pointer border ${
                                    medicoSelecionado === "lucas"
                                        ? "border-[#EB536D]"
                                        : "border-gray-400"
                                }`}
                            >
                                <div className="w-16 h-24 rounded-4xl object-cover bg-gray-400"></div>

                                <div className="flex flex-col">
                                    <h3 className="text-sm font-semibold text-gray-800">Dr. Lucas Ferreira</h3>
                                    <span className="text-xs text-[#EB536D] mb-1">Cardiologista</span>

                                    <span
                                        className={`text-xs rounded-full px-2 py-1 mt-1 w-fit font-medium ${
                                            medicoSelecionado === "lucas"
                                                ? "bg-[#FFE5EA] text-[#EB536D]"
                                                : "bg-gray-300 text-gray-600"
                                        }`}
                                    >
                                        Próximos horários amanhã
                                    </span>
                                </div>
                            </div>
                
                            <div
                                onClick={() => setMedicoSelecionado("anna carla")}
                                className={`flex items-center gap-3 rounded-lg p-2 w-80 bg-white cursor-pointer border ${
                                    medicoSelecionado === "anna carla"
                                        ? "border-[#EB536D]"
                                        : "border-gray-400"
                                }`}
                            >
                                <div className="w-16 h-24 rounded-4xl object-cover bg-gray-400"></div>

                                <div className="flex flex-col">
                                    <h3 className="text-sm font-semibold text-gray-800">Dra. Anna Carla</h3>
                                    <span className="text-xs text-[#EB536D] mb-1">Pediatra</span>

                                    <span
                                        className={`text-xs rounded-full px-2 py-1 mt-1 w-fit font-medium ${
                                            medicoSelecionado === "anna carla"
                                                ? "bg-[#FFE5EA] text-[#EB536D]"
                                                : "bg-gray-300 text-gray-600"
                                        }`}
                                    >
                                        Próximos horários amanhã
                                    </span>
                                </div>
                            </div>

                            <div
                                onClick={() => setMedicoSelecionado("izabel")}
                                className={`flex items-center gap-3 rounded-lg p-2 w-80 bg-white cursor-pointer border ${
                                    medicoSelecionado === "izabel"
                                        ? "border-[#EB536D]"
                                        : "border-gray-400"
                                }`}
                            >
                                <div className="w-16 h-24 rounded-4xl object-cover bg-gray-400"></div>

                                <div className="flex flex-col">
                                    <h3 className="text-sm font-semibold text-gray-800">Dra. Izabel da Luz</h3>
                                    <span className="text-xs text-[#EB536D] mb-1">Ginecologista</span>

                                    <span
                                        className={`text-xs rounded-full px-2 py-1 mt-1 w-fit font-medium ${
                                            medicoSelecionado === "izabel"
                                                ? "bg-[#FFE5EA] text-[#EB536D]"
                                                : "bg-gray-300 text-gray-600"
                                        }`}
                                    >
                                        Próximos horários na próxima semana
                                    </span>
                                </div>
                            </div>
                            <img src={seta} alt="seta" className='h-12 w-12' />
                
                        </div>
                    </section>
                    <section className='flex gap-20'>
                        <aside className='flex gap-4 h-46 items-center justify-center'>
                            <div className='w-24 h-42 rounded-full bg-gray-400'></div>

                            <div className='flex flex-col w-60'>
                                <h2 className='text-lg font-semibold'>
                                    Dr. Lucas Ferreira
                                </h2>

                                <span className='text-sm text-[#EB536D]'>
                                    Clínico geral
                                </span>

                                <p className='text-sm text-gray-600 '>
                                    Atendimento humanizado e focado na saúde e bem-estar.
                                </p>
                            </div>
                        </aside>
                        <div className="available-times">
                            <h2 className='text-lg font-semibold mb-6'>Horários disponíveis</h2>
                            <div className='flex gap-10'>
                                <div className='flex flex-col gap-5 items-center'>
                                    <div
                                        onClick={() => setDiaSelecionado("segunda")}
                                        className={`flex flex-col w-30 h-15 justify-center items-center rounded-lg cursor-pointer ${
                                            diaSelecionado === "segunda"
                                                ? "bg-[#EB536D] text-white"
                                                : "border border-[#f7c6ce] text-gray-600"
                                        }`}
                                    >
                                        <span className="text-md font-medium">Segunda</span>
                                        <small>20 maio</small>
                                    </div>
                                        <button className='horario'>08:00</button>
                                        <button className="horario">08:00</button>
                                        <button className="horario">08:00</button>
                                        <button className="horario">08:00</button>
                                </div>

                                <div className='flex flex-col gap-5 items-center'>
                                    <div
                                        onClick={() => setDiaSelecionado("terca")}
                                        className={`flex flex-col w-30 h-15 justify-center items-center rounded-lg cursor-pointer ${
                                            diaSelecionado === "terca"
                                                ? "bg-[#EB536D] text-white"
                                                : "border border-[#f7c6ce] text-gray-600"
                                        }`}
                                    >
                                        <span className="text-md font-medium">Terça</span>
                                        <small>21 maio</small>
                                    </div>
                                    <button className='horario'>08:00</button>
                                    <button className="horario">09:00</button>
                                    <button className="horario">10:00</button>
                                    <button className="horario">16:00</button>
                                </div>

                                <div className='flex flex-col gap-5 items-center'>
                                    <div
                                        onClick={() => setDiaSelecionado("quarta")}
                                        className={`flex flex-col w-30 h-15 justify-center items-center rounded-lg cursor-pointer ${
                                            diaSelecionado === "quarta"
                                                ? "bg-[#EB536D] text-white"
                                                : "border border-[#f7c6ce] text-gray-600"
                                        }`}
                                    >
                                        <span className="text-md font-medium">Quarta</span>
                                        <small>22 maio</small>
                                    </div>
                                    <button className='horario'>13:00</button>
                                    <button className="horario">17:00</button>
                                    <button className="horario">18:00</button>
                                </div>

                                <div className='flex flex-col gap-5 items-center'>
                                    <div
                                        onClick={() => setDiaSelecionado("quinta")}
                                        className={`flex flex-col w-30 h-15 justify-center items-center rounded-lg cursor-pointer ${
                                            diaSelecionado === "quinta"
                                                ? "bg-[#EB536D] text-white"
                                                : "border border-[#f7c6ce] text-gray-600"
                                        }`}
                                    >
                                        <span className="text-md font-medium">Quinta</span>
                                        <small>23 maio</small>
                                    </div>
                                    <button className='horario'>07:00</button>
                                    <button className="horario">12:00</button>
                                </div>

                                <div className='flex flex-col gap-5 items-center'>
                                    <div
                                        onClick={() => setDiaSelecionado("sexta")}
                                        className={`flex flex-col w-30 h-15 justify-center items-center rounded-lg cursor-pointer ${
                                            diaSelecionado === "sexta"
                                                ? "bg-[#EB536D] text-white"
                                                : "border border-[#f7c6ce] text-gray-600"
                                        }`}
                                    >
                                        <span className="text-md font-medium">Sexta</span>
                                        <small>24 maio</small>
                                    </div>
                                    <button className='horario'>13:00</button>
                                    <button className="horario">16:00</button>
                                    <button className="horario">17:00</button>
                                </div>
                
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}