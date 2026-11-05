import { useEffect, useState } from 'react';
import { GET } from '../../../../../api/schedule';
import AppoitmentCard from '../appoitmentCard';

export default function AppointmentsList() {
    const [appoitments, setAppoitments] = useState(null);

    useEffect(() => {
        GET('/api/doctor/appoitments')
            .then(data => {
                if (data.status !== 200) throw new Error(data.detail);
                setAppoitments(data);
            })
            .catch(err => alert(err.message));
    }, []);

    return (
        <section className='rounded-3xl bg-white p-9 shadow-lg shadow-color2/15'>
            <h2 className='text-2xl font-semibold'>Consultas agendadas</h2>
            {appoitments?.length > 0 ? (
                <div className='mt-4 flex flex-col gap-4'>
                    {appoitments.map((item, idx) => (
                        <AppoitmentCard
                            key={idx}
                            {...item}
                        />
                    ))}
                </div>
            ) : (
                <p className='mt-4 text-center text-lg font-semibold text-black/50'>
                    Nenhuma consulta agendada atualmente
                </p>
            )}
        </section>
    );
}
