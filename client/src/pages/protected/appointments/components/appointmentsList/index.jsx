import AppoitmentCard from '../appoitmentCard';

export default function AppointmentsList() {
    const appoitments = [
        {
            id: 1,
            day: 'Segunda-feira',
            date: '26/06/2025',
            start_time: '08:00',
            end_time: '09:00',
            type: 'presencial',
            status: 'Confirmado',
        },
        {
            id: 2,
            day: 'Terça-feira',
            date: '26/06/2025',
            start_time: '08:00',
            end_time: '09:00',
            type: 'presencial',
            status: 'Pendente',
        },
        {
            id: 3,
            day: 'Quarta-feira',
            date: '26/06/2025',
            start_time: '08:00',
            end_time: '09:00',
            type: 'presencial',
            status: 'Negado',
        },
    ];

    return (
        <section className='rounded-3xl bg-white p-9 shadow-lg shadow-color2/15'>
            <h2 className='text-2xl font-semibold'>Consultas agendadas</h2>
            <div className='mt-4 flex flex-col gap-4'>
                {appoitments.map((item, idx) => (
                    <AppoitmentCard
                        key={idx}
                        {...item}
                    />
                ))}
            </div>
        </section>
    );
}
