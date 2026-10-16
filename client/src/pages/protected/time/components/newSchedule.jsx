import { IconCalendar, IconChevronDown, IconClock, IconUser } from '@tabler/icons-react';

export default function NewSchedule({ form, setForm, editandoId, erro, loading, clearForm, handleSave }) {
    const DIAS = [
        { value: 'domingo', label: 'Domingo' },
        { value: 'segunda', label: 'Segunda-Feira' },
        { value: 'terça', label: 'Terça-Feira' },
        { value: 'quarta', label: 'Quarta-Feira' },
        { value: 'quinta', label: 'Quinta-Feira' },
        { value: 'sexta', label: 'Sexta-Feira' },
        { value: 'sábado', label: 'Sábado' },
    ];
    const TIPOS = [
        { value: 'presencial', label: 'Consulta Presencial' },
        { value: 'online', label: 'Consulta Online' },
    ];
    const HORAS = Array.from({ length: 25 }, (_, i) => {
        const h = 7 + Math.floor(i / 2);
        return `${String(h).padStart(2, '0')}:${i % 2 ? '30' : '00'}`;
    });

    return (
        <section className='bg-white/60 px-4 pb-5'>
            <h2 className='text-md mb-4 inline-block rounded-b-lg bg-white px-5 py-1 font-semibold shadow'>
                {editandoId ? 'Editar Horário de Atendimento' : 'Novo Horário de Atendimento'}
            </h2>
            <form
                id='form-horario'
                onSubmit={handleSave}
                noValidate
                className='grid grid-cols-1 items-end gap-3 min-[560px]:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_auto]'
            >
                <div>
                    <label
                        htmlFor='day'
                        className='text-md mb-1 block font-medium'
                    >
                        Dia da semana
                    </label>
                    <div className='relative max-w-56'>
                        <IconCalendar
                            size={16}
                            className='pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#EB536D]'
                        />
                        <select
                            id='day'
                            className='text-md w-full cursor-pointer appearance-none rounded-lg border border-gray-400 bg-white py-1.5 pr-8 pl-9 text-gray-700 focus:border-[#EB536D] focus:outline-none'
                            onChange={e => setForm(form => ({ ...form, date: e.target.value }))}
                        >
                            <option value=''>Selecione o dia</option>
                            {DIAS.map((day, idx) => (
                                <option
                                    key={idx}
                                    value={day.value}
                                >
                                    {day.label}
                                </option>
                            ))}
                        </select>
                        <IconChevronDown
                            size={14}
                            className='pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-gray-600'
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor='inicio'
                        className='text-md mb-1 block font-medium'
                    >
                        Horário de início
                    </label>
                    <div className='text-md relative max-w-56'>
                        <IconClock
                            size={16}
                            className='pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#EB536D]'
                        />
                        <select
                            id='inicio'
                            value={form.start_time}
                            onChange={e => setForm(form => ({ ...form, start_time: e.target.value }))}
                            className='text-md w-full cursor-pointer appearance-none rounded-lg border border-gray-400 bg-white py-1.5 pr-8 pl-9 text-gray-700 focus:border-[#EB536D] focus:outline-none'
                        >
                            <option
                                value=''
                                className='text-md'
                            >
                                Selecione o horário
                            </option>
                            {HORAS.map(h => (
                                <option key={h}>{h}</option>
                            ))}
                        </select>
                        <IconChevronDown
                            size={14}
                            className='pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-gray-600'
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor='fim'
                        className='text-md mb-1 block font-medium'
                    >
                        Horário de fim
                    </label>
                    <div className='relative max-w-56'>
                        <IconClock
                            size={16}
                            className='pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#EB536D]'
                        />
                        <select
                            id='fim'
                            value={form.end_time}
                            onChange={e => setForm(form => ({ ...form, end_time: e.target.value }))}
                            className='text-md w-full cursor-pointer appearance-none rounded-lg border border-gray-400 bg-white py-1.5 pr-8 pl-9 text-gray-700 focus:border-[#EB536D] focus:outline-none'
                        >
                            <option value=''>Selecione o horário</option>
                            {HORAS.map(h => (
                                <option key={h}>{h}</option>
                            ))}
                        </select>
                        <IconChevronDown
                            size={14}
                            className='pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-gray-600'
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor='tipo'
                        className='text-md mb-1 block font-medium'
                    >
                        Tipo de consulta
                    </label>
                    <div className='relative max-w-56'>
                        <IconUser
                            size={16}
                            className='pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#EB536D]'
                        />
                        <select
                            id='tipo'
                            value={form.type}
                            onChange={e => setForm(form => ({ ...form, type: e.target.value }))}
                            className='text-md w-full cursor-pointer appearance-none rounded-lg border border-gray-400 bg-white py-1.5 pr-8 pl-9 text-gray-700 focus:border-[#EB536D] focus:outline-none'
                        >
                            <option value=''>Tipo de consulta</option>
                            {TIPOS.map((t, idx) => (
                                <option
                                    key={idx}
                                    value={t.value}
                                >
                                    {t.label}
                                </option>
                            ))}
                        </select>
                        <IconChevronDown
                            size={14}
                            className='pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-gray-600'
                        />
                    </div>
                </div>
                <div className='flex gap-2'>
                    {editandoId && (
                        <button
                            type='button'
                            onClick={clearForm}
                            className='text-md cursor-pointer rounded-lg border border-[#EB536D] bg-white px-4 py-1.5 font-medium text-[#EB536D]'
                        >
                            Cancelar
                        </button>
                    )}
                    <button
                        type='submit'
                        className='cursor-pointer rounded-lg bg-[#EB536D] px-4 py-1.5 font-medium whitespace-nowrap text-white not-disabled:hover:opacity-90 disabled:opacity-25'
                        disabled={loading}
                    >
                        {editandoId ? 'Salvar alterações' : 'Adicionar horário'}
                    </button>
                </div>
                {erro && (
                    <span
                        role='alert'
                        className='text-md col-span-full text-red-600'
                    >
                        {erro}
                    </span>
                )}
            </form>
        </section>
    );
}
