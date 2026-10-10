import Schedule from './schedule';

export default function ScheduleView({ horarios, loading, handleRemove, handleEdit }) {
    return (
        <section className='rounded-2xl bg-white p-4 pb-8 shadow-md'>
            <div className='mb-3 flex items-center justify-between'>
                <h2 className='text-base font-semibold'>Horários Cadastrados</h2>
                <a
                    href='/doctor/horarios'
                    className='text-md font-semibold text-[#EB536D]'
                >
                    Ver tudo
                </a>
            </div>
            {loading ? (
                <p className='text-md py-6 text-center text-gray-600'>Carregando horários…</p>
            ) : !horarios.length ? (
                <p className='text-md py-6 text-center text-gray-600'>
                    Nenhum horário cadastrado. Preencha o formulário acima para adicionar o primeiro.
                </p>
            ) : (
                <div className='grid gap-2'>
                    {horarios.map(h => (
                        <Schedule
                            key={h.id}
                            {...h}
                            handleRemove={handleRemove}
                            handleEdit={handleEdit}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
