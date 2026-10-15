export default function Introduction() {
    return (
        <section className='mb-4 flex items-center justify-between rounded-3xl bg-white p-9 shadow-lg shadow-color2/15'>
            <div>
                <h1 className='mb-4 text-4xl font-semibold'>Agende uma consulta</h1>
                <h2 className='text-xl font-medium text-black/50'>
                    Selecione um médico, data e horário para a sua consulta
                </h2>
            </div>
            <button className='rounded-xl bg-color1 px-4 py-3 text-xl text-white'>Agendar consulta</button>
        </section>
    );
}
